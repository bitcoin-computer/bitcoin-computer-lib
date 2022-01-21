<p align="center">
  <img src="https://i.ibb.co/rMnRhvQ/logo-black-white-transparent-small.png" alt="bitcoin-computer-logo" border="0"/>
</p>

# Bitcoin Computer

*A Turing complete smart contract system for Bitcoin.*

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bitcoin-computer/bitcoin-computer-lib.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bitcoin-computer/bitcoin-computer-lib/context:javascript) [![Total alerts](https://img.shields.io/lgtm/alerts/g/bitcoin-computer/bitcoin-computer-lib.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bitcoin-computer/bitcoin-computer-lib/alerts/)

You can build fungible and non-fungible tokens (NFTs), games, social networks, stable coins, exchanges, casinos, auctions, voting, office applications, artificial intelligence, ... anything really. The main distinguishing features are

* **Easy to Use.** A smart contract is a Javascript class.
* **Free computation.** On other blockchains almost all algorithms are prohibitively expensive. On Bitcoin all algorithms have the same low cost: the cost of a payment. This makes it possible, for the first time, to run compute intense algorithms as smart contracts.
* **Pure Bitcoin.** The Bitcoin Computer does not depend on a side-chain and will soon only depend on Bitcoin. Smart contracts will work as long as Bitcoin is available.
* **Off-Chain storage.** Which data needs to be stored on-chain vs securely hashed and off-chain is application dependent. We make it easy for the programmer to store data off-chain on their own node.
* **Encryption.** Built to balance privacy with compliance: all smart contract data can be encrypted but flows of money are un-encrypted.
* **Cross-Chain**. We want the Bitcoin Computer to work on all Bitcoin-like currencies. We are launching on Litecoin and will add support for other currencies over time.
* **Trustless.** You can run your own [Bitcoin Computer Node](https://github.com/bitcoin-computer/bitcoin-computer-node) to gain trustless access to the blockchain. You can deploy a node anywhere with one line of code through Docker and we have instructions for how to deploy to AWS.

You can find more information in the [Bitcoin Computer Docs](https://docs.bitcoincomputer.io/).

## Quick start

The easiest way to get started is to run the tests. If you get an error "Insufficient funds" have a look [here](#fund-your-computer-object).

````
git clone git@github.com:bitcoin-computer/bitcoin-computer-lib.git
cd bitcoin-computer-lib
yarn install
yarn test
````

## Run in Node.js

Create file ``index.mjs``

```
import { Computer } from 'bitcoin-computer-lib'

// a smart contract
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
  // create Bitcoin Computer wallet
  const computer = new Computer({ seed: 'replace this seed' })

  // deploy a smart object
  const counter = await computer.new(Counter)

  // update a smart object
  await counter.inc()
  console.log(counter)
})()
```

Then, execute the following in the same directory
````
yarn init -y
yarn add bitcoin-computer-lib
node index.mjs
````


If you get an error "Insufficient funds" have a look [here](#fund-your-computer-object). Once the wallet is funded you will see:

```
Counter {
  n: 1,
  _id: '83553f27c9e4651323f1ebb...',
  _rev: '290923708ca56ea448dd67...'
}
```

## Run in the Browser

Create file ``index.js``.

```
import { Computer } from 'bitcoin-computer-lib'

class Counter {
  constructor() {
    this.n = 0
  }

  inc() {
    this.n += 1
  }
}


;(async () => {
  const computer = new Computer({ seed: 'replace this seed' })

  const counter = await computer.new(Counter)
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`

  await counter.inc()
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`
})()
```

Create file ``index.html``

```
<html>
  <body>
    <div id='el'></div>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

Run the following in an empty directory and open your browser at `http://localhost:1234`.

```
npm init -y
npm i -s bitcoin-computer-lib
npm i -g parcel
parcel index.html
```

## Fund Your Computer Object

If you get an error message "Insufficient balance in address \<address\>" you need to fund the wallet inside the computer object.

By default the Bitcoin Computer runs on Litecoin testnet. You can get free testnet coins from a [here](https://kuttler.eu/en/bitcoin/ltc/faucet/), [here](https://testnet-faucet.com/ltc-testnet/), or
[here](https://testnet.help/en/ltcfaucet/testnet). Have a look at the [Bitcoin Computer Docs](https://bitcoin-computer.gitbook.io/docs/) for information
on how to run Bitcoin Computer on mainnet


We recommend generating a new seed phrase through a [BIP39 generator](https://iancoleman.io/bip39/).


## Documentation and Help

Have a look at the [Bitcoin Computer Docs](https://bitcoin-computer.gitbook.io/docs/), ask in our [Telegram Group](https://t.me/joinchat/FMrjOUWRuUkNuIt7zJL8tg),  or [create an issue](https://github.com/bitcoin-computer/computer/issues).

## Road Map

Our prospectus road map is:

* Fix all known security issues
* Get security audit
* Fix all issues discovered in audit
* Launch secure version with long term support

The interface to the Bitcoin Computer will not change so you can start developing an application now. When the stable version launches all you need to do is update the dependency.

## License

[Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/)

You are free to: Share, copy, and redistribute the material in any medium or format
for any purpose, even commercially under the following terms:

* Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* NoDerivatives — If you remix, transform, or build upon the material, you may not distribute the modified material.

This is a human-readable summary of (and not a substitute for) the [license](https://creativecommons.org/licenses/by-nd/3.0/legalcode).
