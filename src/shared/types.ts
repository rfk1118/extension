import { CHAINS_ENUM } from './constant';
import { IAtomicalItem, UTXO as UTXOAtom } from '../background/service/interfaces/api';


export enum LOCAL_KEY {
  ELECTRUMX_HTTP_PROXY = 'ELECTRUMX_HTTP_PROXY'
}

export enum AddressType {
  P2PKH,
  P2WPKH,
  P2TR,
  P2SH_P2WPKH,
  M44_P2WPKH,
  M44_P2TR,
  UNKNOWN,
}

export enum NetworkType {
  MAINNET,
  TESTNET
}

export enum AtomNetworkType {
  WIZZ = 'https://ep.atomicalswallet.com/proxy',
  ATOMICALS = 'https://ep.atomicals.xyz/proxy',
  NEXT_DAO = 'https://ep.nextdao.xyz/proxy',
  CONSYNC = 'https://ep.consync.xyz/proxy',
  ATOMICALS_MARKET = 'https://ep.atomicalmarket.com/proxy',
  ATOMICALS_TEST = 'https://eptestnet.atomicals.xyz/proxy',
  WIZZ_TEST = 'https://eptest.atomicalswallet.com/proxy',
 }

export enum RestoreWalletType {
  WIZZ,
  ATOMICALS,
  UNISAT,
  SPARROW,
  XVERSE,
  OTHERS
}

export interface Chain {
  name: string;
  logo: string;
  enum: CHAINS_ENUM;
  network: string;
}

export interface BitcoinBalance {
  confirm_amount: string;
  pending_amount: string;
  amount: string;
  confirm_btc_amount: string;
  pending_btc_amount: string;
  btc_amount: string;
  confirm_inscription_amount: string;
  pending_inscription_amount: string;
  inscription_amount: string;
  usd_value: string;
}

export interface AddressAssets {
  total_btc: string;
  satoshis?: number;
  total_inscription: number;
}

export interface TxHistoryItem {
  txid: string;
  time: number;
  date: string;
  amount: string;
  symbol: string;
  address: string;
}

export interface Inscription {
  id?: string;
  num?: number;
  inscriptionId: string;
  inscriptionNumber: number;
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentType: string;
  contentLength: number;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
  contentBody: string;
}

export interface InscriptionMintedItem {
  title: string;
  desc: string;
  inscriptions: Inscription[];
}

export interface InscriptionSummary {
  mintedList: InscriptionMintedItem[];
}

export interface AppInfo {
  logo: string;
  title: string;
  desc: string;
  url: string;
  time: number;
  id: number;
  tag?: string;
  readtime?: number;
  new?: boolean;
  tagColor?: string;
}

export interface AppSummary {
  apps: AppInfo[];
  readTabTime?: number;
}

export interface FeeSummary {
  list: {
    title: string;
    desc: string;
    feeRate: number;
  }[];
}

export interface UTXO {
  txId: string;
  outputIndex: number;
  satoshis: number;
  scriptPk: string;
  script?: string;
  addressType: AddressType;
  inscriptions: {
    id: string;
    num: number;
    offset: number;
  }[];
}


export interface AmountToSend {
  address: string;
  value: number;
}

export interface TransferFtConfigInterface {
  selectedUtxos: UTXOAtom[];
  type: 'FT' | 'NFT';
  outputs: Array<AmountToSend>;
}

export interface GasCalculateInterface {
  selectedUtxos: UTXOAtom[];
  regularsUTXOs?: UTXOAtom[];
  outputs: { value: number; address?: string }[];
}

export interface UTXO_Detail {
  txId: string;
  outputIndex: number;
  satoshis: number;
  scriptPk: string;
  addressType: AddressType;
  inscriptions: Inscription[];
}

export enum TxType {
  SIGN_TX,
  SEND_BITCOIN,
  SEND_INSCRIPTION
}

interface BaseUserToSignInput {
  index: number;
  sighashTypes: number[] | undefined;
  disableTweakSigner?: boolean;
}

export interface AddressUserToSignInput extends BaseUserToSignInput {
  address: string;
}

export interface PublicKeyUserToSignInput extends BaseUserToSignInput {
  publicKey: string;
}

export type UserToSignInput = AddressUserToSignInput | PublicKeyUserToSignInput;

export interface SignPsbtOptions {
  autoFinalized: boolean;
  toSignInputs?: UserToSignInput[];
}

export interface ToSignInput {
  index: number;
  publicKey: string;
  sighashTypes?: number[];
}
export type WalletKeyring = {
  key: string;
  index: number;
  type: string;
  addressType: AddressType;
  accounts: Account[];
  alianName: string;
  hdPath: string;
};

export interface Account {
  type: string;
  pubkey: string;
  address: string;
  brandName?: string;
  alianName?: string;
  displayBrandName?: string;
  index?: number;
  balance?: number;
  key: string;
}

export interface InscribeOrder {
  orderId: string;
  payAddress: string;
  totalFee: number;
  minerFee: number;
  originServiceFee: number;
  serviceFee: number;
  outputValue: number;
}

export interface TokenBalance {
  availableBalance: string;
  overallBalance: string;
  ticker: string;
  transferableBalance: string;
  availableBalanceSafe: string;
  availableBalanceUnSafe: string;
}

export interface TokenInfo {
  totalSupply: string;
  totalMinted: string;
}

export enum TokenInscriptionType {
  INSCRIBE_TRANSFER,
  INSCRIBE_MINT
}
export interface TokenTransfer {
  ticker: string;
  amount: string;
  inscriptionId: string;
  inscriptionNumber: number;
  timestamp: number;
}

export interface AddressTokenSummary {
  tokenInfo: TokenInfo;
  tokenBalance: TokenBalance;
  historyList: TokenTransfer[];
  transferableList: TokenTransfer[];
}

export interface DecodedPsbt {
  inputInfos: {
    txid: string;
    vout: number;
    address: string;
    value: number;
    inscriptions: Inscription[];
    atomicals: string[]
    atomicalItems: IAtomicalItem[]
    sighashType: number;
  }[];
  outputInfos: {
    address: string;
    value: number;
    inscriptions: Inscription[];
  }[];
  feeRate: number;
  fee: number;
  hasScammerAddress: boolean;
  warning: string;
}

export interface ToAddressInfo {
  address: string;
  domain?: string;
  inscription?: Inscription;
}

export interface RawTxInfo {
  psbtHex: string;
  rawtx: string;
  toAddressInfo?: ToAddressInfo;
  fee?: number;
  err?: string
}

export interface WalletConfig {
  version: string;
  moonPayEnabled: boolean;
  statusMessage: string;
}

export enum WebsiteState {
  CHECKING,
  SCAMMER,
  SAFE
}
