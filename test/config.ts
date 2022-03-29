const { CHAIN = 'LTC', NETWORK = 'regtest', RPC_USER, RPC_PASSWORD, RPC_HOST } = process.env
const BCN_URL = 'http://127.0.0.1:3000'
const RPC_PROTOCOL = 'http'
const RPC_PORT = process.env.CHAIN === 'LTC' ? 19332 : 8332
const TEST_ADDRESSES =
  'moMoH1vTgCc2dkDfGSKYPnafxy22wSqgrr;mmQEk8VwtSehRryLF8jhVapYg553hJGhNa;miKQVhZbFKSsJcQZ8eXwBQ89xNyetpN34q;mzoGRNh55y9j57TPdwRGi3nt9X4CFwpqUS;n1X6JFDyxibtdhYrc7mrkuft6o168ELFNW;mjLcig6eTZVJkgRgJFMkwrYHpfMnZ1t4kk;mfYkMQAe7afeRSkgLxAtwnMVryjLTfr95Q'

const MIN_NON_DUST_AMOUNT = parseInt(process.env.BC_DUST_LIMIT || '', 10) || 1546
const DEFAULT_FEE = parseInt(process.env.BC_DEFAULT_FEE || '', 10) || 2500
const SCRIPT_CHUNK_SIZE = parseInt(process.env.BC_SCRIPT_CHUNK_SIZE || '', 10) || 479
const FEE_PER_KB = 20000
const PUBLIC_KEY_SIZE = 65
const ANYONE_CAN_SPEND_SEED = 'replace this seed'
const DEFAULT_PATH = "m/44'/0'/0'/0"
const PASSPHRASE = ''
const ENCODING_LENGTH = 3
const ENCODING_NUMBER_LENGTH = 3
const MAX_PUBKEYS_PER_SCRIPT = 3
const OP_RETURN_SIZE = 80

// TODO: import from bitcoin-computer-bitcore.Signatures
const SIGHASH_ALL = 0x01

export default {
  CHAIN,
  NETWORK,
  BCN_URL,
  RPC_PROTOCOL,
  RPC_USER,
  RPC_PASSWORD,
  RPC_HOST,
  RPC_PORT,
  TEST_ADDRESSES,
  MIN_NON_DUST_AMOUNT,
  SCRIPT_CHUNK_SIZE,
  DEFAULT_FEE,
  SIGHASH_ALL,
  FEE_PER_KB,
  PUBLIC_KEY_SIZE,
  ANYONE_CAN_SPEND_SEED,
  DEFAULT_PATH,
  PASSPHRASE,
  ENCODING_LENGTH,
  ENCODING_NUMBER_LENGTH,
  MAX_PUBKEYS_PER_SCRIPT,
  OP_RETURN_SIZE
}
