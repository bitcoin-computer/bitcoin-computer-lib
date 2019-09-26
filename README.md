# Bitcoin|Computer

<code>UNDER CONSTRUCTION</code>

Bitcoin|Computer is a platform for running smart contracts on Bitcoin, based on the following principles

**Simplicity.** Smart contracts are vanilla Javascript programs. If you know how to use Javascript you know how to use the Bitcoin|Computer.

**Scalability.** The cost of running a smart contract is independent of the computational work required. This allows you to run smart contracts that would cost millions on other platform at the cost of sending a payment.

**Freedom**. Bitcoin|Computer works on Bitcoin<sup>\*</sup>, Bitcoin Cash, Bitcoin SV<sup>\*</sup>, Litecoin<sup>\*</sup>, and Dogecoin<sup>\*</sup>. We don't tell you what to do, we let you decide.

<sup>\*</sup>coming soon

## Getting Started

### Node

In an empty directory run ``npm init -yes`` and ``npm i -s @bitcoin-computer/bitcoin-computer``. Create ``index.mjs`` as shown below. Replace the string "replace this seed" by your own seed phrase (eg from your wallet or from [here](https://iancoleman.io/bip39/)).

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

Run the contract using ``node --experimental-modules index.mjs``. You will get an error "<code>Insufficient balance in address ...</code>". Send a small amount of Bitcoin Cash to the address, eg from a [Bitcoin Cash Faucet](https://free.bitcoin.com/). Run the contract again and if it worked you will see:

````
Counter {
  n: 1,
  _owners: [ '028b43c3e12159179c...' ],
  _amount: 2000
}
````

Congrats, you are now one of the first people to ever to run a smart contract on Bitcoin! Now go ahead and change the program above to create your own smart contrat.

### Browser

Instructions coming soon.

## Supported features

Eventually we want to support a large fragment Javascript. However, we are just getting started and currently the fragment is quite small. However already today it is large enought to support popular smart contracts like fungible tokens.

## Alpha Warning

We are just getting started. Expect bugs and issues. Don't put more Bitcion Cash into the system than you are willing to loose. If you have any problems, create and issue on the [Github repo](https://github.com/bitcoin-computer/computer).
