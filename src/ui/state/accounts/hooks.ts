import { useCallback } from 'react';

import { Account, AddressType } from '@/shared/types';
import { useWallet } from '@/ui/utils';

import { AppState } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCurrentKeyring } from '../keyrings/hooks';
import { accountActions } from './reducer';
import { useNetworkType } from '../settings/hooks';
import { IWalletBalance } from '@/background/service/interfaces/api';

export function useAccountsState(): AppState['accounts'] {
  return useAppSelector((state) => state.accounts);
}

export function useCurrentAccount() {
  const accountsState = useAccountsState();
  return accountsState.current;
}

export function useAccounts() {
  const accountsState = useAccountsState();
  return accountsState.accounts;
}

export function useAccountBalance() {
  const accountsState = useAccountsState();
  const currentAccount = useCurrentAccount();
  return accountsState.balanceMap[currentAccount.address] || { amount: '0', expired: true };
}

export function useAccountInscriptions() {
  const accountsState = useAccountsState();
  const currentAccount = useCurrentAccount();
  return accountsState.inscriptionsMap[currentAccount.address] || { list: [], expired: true };
}

export function useInscriptionSummary() {
  const accountsState = useAccountsState();
  return accountsState.inscriptionSummary;
}

export function useAppSummary() {
  const accountsState = useAccountsState();
  return accountsState.appSummary;
}

export function useAtomicals():IWalletBalance {
  const accountsState = useAccountsState();
  return accountsState.atomicals[accountsState.current.address];
}

export function useUnreadAppSummary() {
  const accountsState = useAccountsState();
  const summary = accountsState.appSummary;
  return summary.apps.find((w) => w.time && summary.readTabTime && w.time > summary.readTabTime);
}

export function useReadTab() {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const appSummary = useAppSummary();
  return useCallback(
    async (name: 'app' | 'home' | 'settings') => {
      await wallet.readTab(name);
      if (name == 'app') {
        const appSummary = await wallet.getAppSummary();
        dispatch(accountActions.setAppSummary(appSummary));
      }
    },
    [dispatch, wallet, appSummary]
  );
}

export function useReadApp() {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const appSummary = useAppSummary();
  return useCallback(
    async (id: number) => {
      await wallet.readApp(id);
      const appSummary = await wallet.getAppSummary();
      dispatch(accountActions.setAppSummary(appSummary));
    },
    [dispatch, wallet, appSummary]
  );
}

export function useHistory() {
  const accountsState = useAccountsState();
  const address = useAccountAddress();
  return accountsState.historyMap[address] || { list: [], expired: true };
}

export function useAccountAddress() {
  const currentAccount = useCurrentAccount();
  return currentAccount.address;
}

export function useSetCurrentAccountCallback() {
  const dispatch = useAppDispatch();
  return useCallback(
    (account: Account) => {
      dispatch(accountActions.setCurrent(account));
    },
    [dispatch]
  );
}

export function useImportAccountCallback() {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const currentKeyring = useCurrentKeyring();
  return useCallback(
    async (privateKey: string, addressType: AddressType) => {
      let success = false;
      let error;
      try {
        const alianName = await wallet.getNextAlianName(currentKeyring);
        await wallet.createKeyringWithPrivateKey(privateKey, addressType, alianName);
        const currentAccount = await wallet.getCurrentAccount();
        dispatch(accountActions.setCurrent(currentAccount));

        success = true;
      } catch (e) {
        console.log(e);
        error = (e as any).message;
      }
      return { success, error };
    },
    [dispatch, wallet, currentKeyring]
  );
}

export function useChangeAccountNameCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  return useCallback(
    async (name: string) => {
      await wallet.updateAlianName(currentAccount.pubkey, name);
      dispatch(accountActions.setCurrentAccountName(name));
    },
    [dispatch, wallet, currentAccount]
  );
}

export function useFetchHistoryCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const address = useAccountAddress();
  return useCallback(async () => {
    const _accountHistory = await wallet.getAddressHistory(address);
    dispatch(
      accountActions.setHistory({
        address: address,
        list: _accountHistory
      })
    );
  }, [dispatch, wallet, address]);
}

export function useFetchBalanceCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  const balance = useAccountBalance();
  return useCallback(async () => {
    if (!currentAccount.address) return;
    const cachedBalance = await wallet.getAddressCacheBalance(currentAccount.address);
    const _accountBalance = await wallet.getAddressBalance(currentAccount.address);

    dispatch(
      accountActions.setBalance({
        address: currentAccount.address,
        amount: _accountBalance.amount,
        btc_amount: _accountBalance.btc_amount,
        inscription_amount: _accountBalance.inscription_amount,
        atomical_amount: '',
      })
    );
    if (cachedBalance.amount !== _accountBalance.amount) {
      wallet.expireUICachedData(currentAccount.address);
      dispatch(accountActions.expireHistory());
    }
  }, [dispatch, wallet, currentAccount, balance]);
}

export function useAtomicalsCallback() {
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  const balance = useAccountBalance();
  const networkType = useNetworkType();

  return useCallback(async () => {
    if (!currentAccount.address) return;
    // const _utxo = await wallet.getUtxo(currentAccount.address);
    // console.log({ _utxo });
    const res = await wallet.getAtomicals(
      currentAccount.address,
      // 'bc1pmetyl0yhqh0yy8ddkyeluzpm4t2dzwg4698zjsqdpye0kmu2k9vqwype3v',
      networkType,
    );
    // console.log({ _utxo });
    const btc_amount = (res.regularsValue / (10000 * 10000)).toString();
    const amount = ((res.confirmedValue + res.unconfirmedValue) / (10000 * 10000)).toString();
    const atomical_amount = (res.atomicalsValue! / (10000 * 10000)).toString();
    const inscription_amount = (res.ordinalsValue! / (10000 * 10000)).toString();
    dispatch(
      accountActions.setBalance({
        address: currentAccount.address,
        amount: amount,
        btc_amount,
        inscription_amount,
        atomical_amount,
      })
    );
    dispatch(accountActions.setAtomicals(res));
    // if (cachedBalance.amount !== _accountBalance.amount) {
    //   wallet.expireUICachedData(currentAccount.address);
    //   dispatch(accountActions.expireHistory());
    // }
  }, [dispatch, wallet, currentAccount, balance, networkType]);
}
