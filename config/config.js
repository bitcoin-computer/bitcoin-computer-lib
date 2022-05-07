const CHAIN = process.env.CHAIN || 'LTC'
const NETWORK = process.env.NETWORK || 'testnet' // testnet or regtest
const BCN_URL = process.env.BCN_URL || 'https://node.bitcoincomputer.io'

export default {
  CHAIN,
  NETWORK,
  BCN_URL,
}
