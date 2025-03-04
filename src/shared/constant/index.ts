/* eslint-disable quotes */

/* constants pool */
import { AddressType, AtomNetworkType, Chain, NetworkType, RestoreWalletType } from '../types';
export enum CHAINS_ENUM {
  BTC = 'BTC'
}

export const CHAINS: Record<string, Chain> = {
  [CHAINS_ENUM.BTC]: {
    name: 'BTC',
    enum: CHAINS_ENUM.BTC,
    logo: '',
    network: 'mainnet'
  }
};

export const KEYRING_TYPE = {
  HdKeyring: 'HD Key Tree',
  SimpleKeyring: 'Simple Key Pair',
  WatchAddressKeyring: 'Watch Address',
  WalletConnectKeyring: 'WalletConnect',
  Empty: 'Empty'
};

export const KEYRING_CLASS = {
  PRIVATE_KEY: 'Simple Key Pair',
  MNEMONIC: 'HD Key Tree'
};

export const KEYRING_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Created by Mnemonic',
  [KEYRING_TYPE.SimpleKeyring]: 'Imported by Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch Mode'
};
export const BRAND_ALIAN_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Account',
  [KEYRING_TYPE.SimpleKeyring]: 'Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch'
};

export const KEYRING_TYPES: {
  [key: string]: {
    name: string;
    tag: string;
    alianName: string;
  };
} = {
  'HD Key Tree': {
    name: 'HD Key Tree',
    tag: 'HD',
    alianName: 'HD Wallet'
  },
  'Simple Key Pair': {
    name: 'Simple Key Pair',
    tag: 'IMPORT',
    alianName: 'Single Wallet'
  }
};

export const MEMPOOL_URL = 'https://mempool.space';
export const MEMPOOL_URL_TEST = 'https://mempool.space/testnet';

export const IS_CHROME = /Chrome\//i.test(navigator.userAgent);

export const IS_FIREFOX = /Firefox\//i.test(navigator.userAgent);

export const IS_LINUX = /linux/i.test(navigator.userAgent);

let chromeVersion: number | null = null;

if (IS_CHROME) {
  const matches = navigator.userAgent.match(/Chrome\/(\d+[^.\s])/);
  if (matches && matches.length >= 2) {
    chromeVersion = Number(matches[1]);
  }
}

export const IS_AFTER_CHROME91 = IS_CHROME ? chromeVersion && chromeVersion >= 91 : false;

export const GAS_LEVEL_TEXT = {
  slow: 'Standard',
  normal: 'Fast',
  fast: 'Instant',
  custom: 'Custom'
};

export const IS_WINDOWS = /windows/i.test(navigator.userAgent);

export const LANGS = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'zh_CN',
    label: 'Chinese'
  },
  {
    value: 'ja',
    label: 'Japanese'
  },
  {
    value: 'es',
    label: 'Spanish'
  }
];

export const ADDRESS_TYPES: {
  value: AddressType;
  label: string;
  name: string;
  hdPath: string;
  displayIndex: number;
  isUnisatLegacy?: boolean;
}[] = [
  {
    value: AddressType.P2PKH,
    label: 'P2PKH',
    name: 'Legacy (P2PKH)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 4,
    isUnisatLegacy: true
  },
  {
    value: AddressType.P2WPKH,
    label: 'P2WPKH',
    name: 'Native Segwit (P2WPKH)',
    hdPath: "m/84'/0'/0'/0",
    displayIndex: 2,
    isUnisatLegacy: true
  },
  {
    value: AddressType.P2TR,
    label: 'P2TR',
    name: 'Taproot (P2TR)',
    hdPath: "m/86'/0'/0'/0",
    displayIndex: 1,
    isUnisatLegacy: false
  },
  {
    value: AddressType.P2SH_P2WPKH,
    label: 'P2SH-P2WPKH',
    name: 'Nested Segwit (P2SH-P2WPKH)',
    hdPath: "m/49'/0'/0'/0",
    displayIndex: 1,
    isUnisatLegacy: true
  },
  {
    value: AddressType.M44_P2WPKH,
    label: 'P2WPKH',
    name: 'Native SegWit (P2WPKH)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 5,
    isUnisatLegacy: true
  },
  {
    value: AddressType.M44_P2TR,
    label: 'P2TR',
    name: 'Legacy && Taproot (M44_P2TR)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 0,
    isUnisatLegacy: false
  }
];

export const RESTORE_WALLETS: { value: RestoreWalletType; name: string; addressTypes: AddressType[] }[] = [
  {
    value: RestoreWalletType.WIZZ,
    name: 'Atomicals',
    addressTypes: [
      // AddressType.P2WPKH,
      // AddressType.P2SH_P2WPKH,

      // AddressType.P2PKH,
      // AddressType.M44_P2WPKH,
      AddressType.M44_P2TR,
      AddressType.P2TR
    ]
  }
  // {
  //   value: RestoreWalletType.ATOMICALS,
  //   name: 'Wizz & Atomicals',
  //   addressTypes: [
  //     AddressType.M44_P2TR
  //   ]
  // },
  // {
  //   value: RestoreWalletType.UNISAT,
  //   name: 'UniSat Wallet',
  //   addressTypes: [
  //     AddressType.P2WPKH,
  //     AddressType.P2SH_P2WPKH,
  //     AddressType.P2TR,
  //     AddressType.P2PKH,
  //     AddressType.M44_P2WPKH,
  //     AddressType.M44_P2TR
  //   ]
  // },

  // {
  //   value: RestoreWalletType.SPARROW,
  //   name: 'Sparrow Wallet',
  //   addressTypes: [AddressType.P2PKH, AddressType.P2WPKH, AddressType.P2SH_P2WPKH, AddressType.P2TR]
  // },
  // {
  //   value: RestoreWalletType.XVERSE,
  //   name: 'Xverse Wallet',
  //   addressTypes: [AddressType.P2SH_P2WPKH, AddressType.P2TR]
  // },
  // {
  //   value: RestoreWalletType.OTHERS,
  //   name: 'Other Wallet',
  //   addressTypes: [
  //     AddressType.P2PKH,
  //     AddressType.P2WPKH,
  //     AddressType.P2SH_P2WPKH,
  //     AddressType.P2TR,
  //     AddressType.M44_P2WPKH,
  //     AddressType.M44_P2TR
  //   ]
  // }
];

export const NETWORK_TYPES = [
  { value: NetworkType.MAINNET, label: 'LIVENET', name: 'livenet', validNames: [0, 'livenet', 'mainnet'] },
  { value: NetworkType.TESTNET, label: 'TESTNET', name: 'testnet', validNames: ['testnet'] }
];

export const ATOM_NETWORK_TYPES = [
  { value: AtomNetworkType.ATOMICALS, label: 'Endpoint 1', name: 'livenet', validNames: [0, 'livenet', 'mainnet'] },
  { value: AtomNetworkType.WIZZ, label: 'Endpoint 2', name: 'livenet',  validNames: [0, 'livenet', 'mainnet'] },
  { value: AtomNetworkType.ATOMICALS_MARKET, label: 'Endpoint 3', name: 'livenet', validNames: [0,'livenet', 'mainnet'] },
  { value: AtomNetworkType.NEXT_DAO, label: 'Endpoint 4', name: 'livenet', validNames: [0,'livenet', 'mainnet'] },
  { value: AtomNetworkType.CONSYNC, label: 'Endpoint 5', name: 'livenet', validNames: [0,'livenet', 'mainnet'] },
  { value: AtomNetworkType.ATOMICALS_TEST, label: 'Endpoint 1', name: 'testnet', validNames: [1,'testnet'] },
  { value: AtomNetworkType.WIZZ_TEST, label: 'Endpoint 2', name: 'testnet', validNames: [1,'testnet'] },
];

export const MINIMUM_GAS_LIMIT = 21000;

export enum WATCH_ADDRESS_CONNECT_TYPE {
  WalletConnect = 'WalletConnect'
}

export const WALLETCONNECT_STATUS_MAP = {
  PENDING: 1,
  CONNECTED: 2,
  WAITING: 3,
  SIBMITTED: 4,
  REJECTED: 5,
  FAILD: 6
};

export const INTERNAL_REQUEST_ORIGIN = 'https://unisat.io';

export const INTERNAL_REQUEST_SESSION = {
  name: 'ATOM Wallet',
  origin: INTERNAL_REQUEST_ORIGIN,
  icon: './images/logo/logo@128x.png'
};

export const OPENAPI_URL_MAINNET = 'https://api.unisat.io/wallet-v4';
export const OPENAPI_URL_TESTNET = 'https://api-testnet.unisat.io/wallet-v4';

export const EVENTS = {
  broadcastToUI: 'broadcastToUI',
  broadcastToBackground: 'broadcastToBackground',
  SIGN_FINISHED: 'SIGN_FINISHED',
  WALLETCONNECT: {
    STATUS_CHANGED: 'WALLETCONNECT_STATUS_CHANGED',
    INIT: 'WALLETCONNECT_INIT',
    INITED: 'WALLETCONNECT_INITED'
  }
};

export const SORT_WEIGHT = {
  [KEYRING_TYPE.HdKeyring]: 1,
  [KEYRING_TYPE.SimpleKeyring]: 2,
  [KEYRING_TYPE.WalletConnectKeyring]: 4,
  [KEYRING_TYPE.WatchAddressKeyring]: 5
};

export const GASPRICE_RANGE = {
  [CHAINS_ENUM.BTC]: [0, 10000]
};

export const COIN_NAME = 'BTC';
export const COIN_SYMBOL = 'BTC';

export const COIN_DUST = 1000;

export const TO_LOCALE_STRING_CONFIG = {
  minimumFractionDigits: 8
};

export const SATS_DOMAIN = '.sats';
export const UNISAT_DOMAIN = '.unisat';

export const GITHUB_URL = 'https://github.com/atomicalswallet/atomicals-wallet-extension';
export const DISCORD_URL = 'https://discord.com/invite/atomicalsxyz';
export const TWITTER_URL = 'https://twitter.com/atomicalswallet';
export const ELECTRUMX_WSS = 'wss://electrumx.atomicals.xyz:50012'; //'ws://18.139.208.6:50001'// 'wss://electrumx.atomicals.xyz:50012';
// export const ELECTRUMX_HTTP_PROXY = 'https://electrumx.atomicalmarket.com';
export const ELECTRUMX_HTTP_PROXY = 'https://ep.atomicals.xyz/proxy';
// export const ELECTRUMX_HTTP_PROXY = 'https://ep.atomicals.xyz/proxy';

export const CHANNEL = process.env.channel!;
export const VERSION = process.env.release!;
export const MANIFEST_VERSION = process.env.manifest!;

export const DUST_AMOUNT = 546;
