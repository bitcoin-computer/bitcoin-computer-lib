# Bitcoin|Computer

<code>UNDER CONSTRUCTION</code>

Bitcoin|Computer is a platform for running smart contracts on Bitcoin, based on the following principles

**Simplicity.** Smart contracts are vanilla Javascript programs. If you know how to use Javascript you know how to use the Bitcoin|Computer.

**Scalability.** The cost of running a smart contract is independent of the computational work required. This allows you to run smart contracts that would cost millions on other platform at the cost of sending a payment.

**Freedom**. Bitcoin|Computer currently works on Bitcoin Cash, but we'll add support for Bitcoin, Litecoin, Bitcoin SV, and others soon. We don't tell you what to do, we let you decide.

## Getting Started

### Node

In an empty directory run ``npm init -y && npm i -s bitcoin-computer``

Create ``index.mjs`` as shown below. Replace the string *"replace this seed"* with your own seed phrase (eg from your wallet or from [here](https://iancoleman.io/bip39/)).

````
import Computer from 'bitcoin-computer'

// the smart contract
class Counter {
  constructor() {
    this.n = 0
  }
  inc() {
    this.n += 1
  }
}

// run the smart contract
;(async () => {
  const computer = new Computer({ seed: 'replace this seed' })
  const counter = await computer.new(Counter, [])
  await counter.inc()
  console.log(counter)
  counter._close()
  computer.close()
})()
````

Run the contract using ``node --experimental-modules index.mjs``. You will get an error message *"Insufficient balance in address \<your_address\>"*

Send a small amount of Bitcoin Cash to *\<your_address\>*, eg from a [Bitcoin Cash Faucet](https://free.bitcoin.com/). Run the contract again and if it worked you will see:

````
Counter {
  n: 1,
  _owners: [ '028b43c3e12159179c...' ],
  _amount: 2000
}
````

Congrats, you are now one of the first people to ever to run a smart contract on Bitcoin! Now go ahead and change the program above to create your own smart contract.

### Browser

Installation instructions for browsers coming soon.

## Supported features

Eventually we want to make it possible to deploy any smart contract on the Bitcoin|Computer. We are just getting started and we not quite there yet. However, already today the Bitcoin|Computer powerful enough to support popular smart contracts like non-fungible tokens.

## Disclaimer

Expect bugs and issues. Don't put more Bitcion Cash into the Bitcoin|Computer than you are willing to loose. If you have any problems, please create an issue on [Github](https://github.com/bitcoin-computer/computer).
