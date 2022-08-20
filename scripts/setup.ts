import rpcClient from '../src/rpc-client'
import { MWEB_HEIGHT } from '../config/constants'

const setup = async () => {
  const { result: info } = await rpcClient.getBlockchainInfo()
  const currentBlockHeight = info.blocks
  if (currentBlockHeight < MWEB_HEIGHT - 1) {
    const { result: newAddress } = await rpcClient.getNewAddress('', 'legacy')
    const blocksToGenerate = MWEB_HEIGHT - currentBlockHeight - 1
    await rpcClient.generateToAddress(blocksToGenerate, newAddress)
    const { result: mwebAddress } = await rpcClient.getNewAddress('mweb', 'mweb')
    await rpcClient.sendToAddress(mwebAddress, 1)
    await rpcClient.generateToAddress(1, newAddress)
  }
}

setup()
