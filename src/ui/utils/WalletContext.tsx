import * as bitcoin from 'bitcoinjs-lib';
import { createContext, ReactNode, useContext } from 'react';

import { AccountAsset } from '@/background/controller/wallet';
import { ContactBookItem, ContactBookStore } from '@/background/service/contactBook';
import { ToSignInput } from '@/background/service/keyring';
import { ConnectedSite } from '@/background/service/permission';
import {
  BitcoinBalance,
  TxHistoryItem,
  Inscription,
  InscriptionSummary,
  AppSummary,
  UTXO,
  NetworkType,
  AddressType,
  WalletKeyring,
  Account,
  FeeSummary,
  AddressAssets,
  InscribeOrder,
  TokenBalance,
  TokenTransfer,
  AddressTokenSummary,
  DecodedPsbt,
  WalletConfig,
  UTXO_Detail,
  SignPsbtOptions
} from '@/shared/types';
import {
  IAtomicalBalances,
  ISelectedUtxo,
  UTXO as AtomUtxos,
  AtomicalsInfo
} from '@/background/service/interfaces/api';

export interface WalletController {
  openapi: {
    [key: string]: (...params: any) => Promise<any>;
  };

  boot(password: string): Promise<void>;
  isBooted(): Promise<boolean>;

  getApproval(): Promise<any>;
  resolveApproval(data?: any, data2?: any): Promise<void>;
  rejectApproval(data?: any, data2?: any, data3?: any): Promise<void>;

  hasVault(): Promise<boolean>;

  verifyPassword(password: string): Promise<void>;
  changePassword: (password: string, newPassword: string) => Promise<void>;

  unlock(password: string): Promise<void>;
  isUnlocked(): Promise<boolean>;

  lockWallet(): Promise<void>;
  setPopupOpen(isOpen: boolean): void;
  isReady(): Promise<boolean>;

  getAddressBalance(address: string): Promise<BitcoinBalance>;
  getAddressCacheBalance(address: string): Promise<BitcoinBalance>;
  getMultiAddressAssets(addresses: string): Promise<AddressAssets[]>;
  findGroupAssets(
    groups: { type: number; address_arr: string[] }[]
  ): Promise<{ type: number; address_arr: string[]; satoshis_arr: number[] }[]>;

  getAddressInscriptions(
    address: string,
    cursor: number,
    size: number
  ): Promise<{ list: Inscription[]; total: number }>;

  getAddressHistory: (address: string) => Promise<TxHistoryItem[]>;
  getAddressCacheHistory: (address: string) => Promise<TxHistoryItem[]>;

  listChainAssets: (address: string) => Promise<AccountAsset[]>;
  getTransactionHistory: (address: string) => Promise<TxHistoryItem[]>;

  getLocale(): Promise<string>;
  setLocale(locale: string): Promise<void>;

  getCurrency(): Promise<string>;
  setCurrency(currency: string): Promise<void>;

  clearKeyrings(): Promise<void>;
  getPrivateKey(password: string, account: { address: string; type: string }): Promise<{ hex: string; wif: string }>;
  getMnemonics(
    password: string,
    keyring: WalletKeyring
  ): Promise<{
    hdPath: string;
    mnemonic: string;
    passphrase: string;
  }>;
  createKeyringWithPrivateKey(data: string, addressType: AddressType, alianName?: string): Promise<Account[]>;
  getPreMnemonics(): Promise<any>;
  generatePreMnemonic(): Promise<string>;
  removePreMnemonics(): void;
  createKeyringWithMnemonics(
    mnemonic: string,
    hdPath: string,
    passphrase: string,
    addressType: AddressType,
    accountCount: number
  ): Promise<{ address: string; type: string }[]>;

  createTmpKeyringWithPrivateKey(privateKey: string, addressType: AddressType): Promise<WalletKeyring>;

  createTmpKeyringWithMnemonics(
    mnemonic: string,
    hdPath: string,
    passphrase: string,
    addressType: AddressType,
    accountCount?: number
  ): Promise<WalletKeyring>;
  removeKeyring(keyring: WalletKeyring): Promise<WalletKeyring>;
  deriveNewAccountFromMnemonic(keyring: WalletKeyring, alianName?: string): Promise<string[]>;
  getAccountsCount(): Promise<number>;
  getAllAlianName: () => (ContactBookItem | undefined)[];
  getContactsByMap: () => ContactBookStore;
  updateAlianName: (pubkey: string, name: string) => Promise<void>;

  getCurrentAccount(): Promise<Account>;
  getAccounts(): Promise<Account[]>;
  getNextAlianName: (keyring: WalletKeyring) => Promise<string>;

  getCurrentKeyringAccounts(): Promise<Account[]>;

  signTransaction(psbt: bitcoin.Psbt, inputs: ToSignInput[]): Promise<bitcoin.Psbt>;

  sendBTC(data: {
    to: string;
    amount: number;
    utxos: UTXO[];
    receiverToPayFee: boolean;
    feeRate: number;
  }): Promise<string>;

  sendInscription(data: { to: string; inscriptionId: string; feeRate: number; outputValue: number }): Promise<string>;

  sendInscriptions(data: { to: string; inscriptionIds: string[]; feeRate: number }): Promise<string>;

  splitInscription(data: {
    inscriptionId: string;
    feeRate: number;
    outputValue: number;
  }): Promise<{ psbtHex: string; splitedCount: number }>;

  pushTx(rawtx: string): Promise<string>;

  queryDomainInfo(domain: string): Promise<Inscription>;

  getInscriptionSummary(): Promise<InscriptionSummary>;
  getAppSummary(): Promise<AppSummary>;
  getAddressUtxo(address: string): Promise<UTXO[]>;

  getNetworkType(): Promise<NetworkType>;
  setNetworkType(type: NetworkType): Promise<void>;

  getConnectedSites(): Promise<ConnectedSite[]>;
  removeConnectedSite(origin: string): Promise<void>;
  getCurrentConnectedSite(id: string): Promise<ConnectedSite>;

  getCurrentKeyring(): Promise<WalletKeyring>;
  getKeyrings(): Promise<WalletKeyring[]>;
  changeKeyring(keyring: WalletKeyring, accountIndex?: number): Promise<void>;
  getAllAddresses(keyring: WalletKeyring, index: number): Promise<string[]>;

  setKeyringAlianName(keyring: WalletKeyring, name: string): Promise<WalletKeyring>;
  changeAddressType(addressType: AddressType): Promise<void>;

  setAccountAlianName(account: Account, name: string): Promise<Account>;
  getFeeSummary(): Promise<FeeSummary>;

  setEditingKeyring(keyringIndex: number): Promise<void>;
  getEditingKeyring(): Promise<WalletKeyring>;

  setEditingAccount(account: Account): Promise<void>;
  getEditingAccount(): Promise<Account>;

  inscribeBRC20Transfer(address: string, tick: string, amount: string, feeRate: number): Promise<InscribeOrder>;
  getInscribeResult(orderId: string): Promise<TokenTransfer>;

  decodePsbt(psbtHex: string): Promise<DecodedPsbt>;

  getAllInscriptionList(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: Inscription[] }>;

  getBRC20List(
    address: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: TokenBalance[] }>;

  getBRC20TransferableList(
    address: string,
    ticker: string,
    currentPage: number,
    pageSize: number
  ): Promise<{ currentPage: number; pageSize: number; total: number; list: TokenTransfer[] }>;

  getBRC20Summary(address: string, ticker: string): Promise<AddressTokenSummary>;

  getAtomicals(address: string): Promise<AtomicalsInfo>;

  expireUICachedData(address: string): Promise<void>;

  createMoonpayUrl(address: string): Promise<string>;

  getWalletConfig(): Promise<WalletConfig>;

  getSkippedVersion(): Promise<string>;
  setSkippedVersion(version: string): Promise<void>;

  getInscriptionUtxoDetail(inscriptionId: string): Promise<UTXO_Detail>;

  checkWebsite(website: string): Promise<{ isScammer: boolean }>;

  readTab(tabName: string): Promise<void>;
  readApp(appid: number): Promise<void>;

  formatOptionsToSignInputs(psbtHex: string, options: SignPsbtOptions): Promise<ToSignInput[]>;
  signPsbt(psbt: bitcoin.Psbt, toSignInputs: ToSignInput[], autoFinalized: boolean): Promise<bitcoin.Psbt>;
  signPsbtReturnHex(psbtHex: string, options?: SignPsbtOptions): Promise<string>;
  getPrice(): Promise<any>;
  getFee(): Promise<any>;
  getUtxo(address: string): Promise<any>;
}

const WalletContext = createContext<{
  wallet: WalletController;
} | null>(null);

const WalletProvider = ({ children, wallet }: { children?: ReactNode; wallet: WalletController }) => (
  <WalletContext.Provider value={{ wallet }}>{children}</WalletContext.Provider>
);

const useWallet = () => {
  const { wallet } = useContext(WalletContext) as {
    wallet: WalletController;
  };

  return wallet;
};

export { WalletProvider, useWallet };
