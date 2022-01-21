<p align="center">
  <img src="https://i.ibb.co/rMnRhvQ/logo-black-white-transparent-small.png" alt="bitcoin-computer-logo" border="0"/>
</p>

# Bitcoin Computer

*A Turing complete smart contract system for Bitcoin.*

You can build fungible and non-fungible tokens (NFTs), games, social networks, stable coins, exchanges, casinos, auctions, voting, office applications, artificial intelligence, ... anything really. The main distinguishing features are

* **Easy to Use.** Smart contracts are written in Javascript. Integrates seamlessly into web and mobile apps. Plus if you know Javascript you can now write smart contracts.
* **Free computation.** On other blockchains almost all algorithms are prohibitively expensive. On Bitcoin *all algorithms have the same low cost*: the cost of a payment. This makes it possible, for the first time, to run compute intense algorithms as smart contracts.
* **Pure Bitcoin.** The Bitcoin Computer does not depend on a side-chain and will soon depend only on Bitcoin. This drastically reduces the attack surface. Smart contracts will work as long as Bitcoin works.
* **Off-Chain storage.** Which data needs to be stored on-chain vs securely hashed and off-chain is application dependent. We make it easy for the programmer to store data off-chain.
* **Encryption.** Built to balance privacy with compliance: all smart contract data can be encrypted but flows of money are un-encrypted to enable AML.
* **Cross-Chain**. We want the Bitcoin Computer to work on all Bitcoin-like currencies. *We are launching on Litecoin* and will add support for other currencies over time.
* **Trustless.** You can run your own Bitcoin Computer Node to gain trustless access to the blockchain. You can deploy a node locally with one line of code thanks to Docker and we have a setup to deploy to AWS with ease (coming soon).

You can find more information in the [Bitcoin Computer Docs](https://docs.bitcoincomputer.io/)

## Quick start

The easiest way to get started is to run and adapt the tests.

````
yarn init
yarn add bitcoin-computer-lib
cd bitcoin-computer-lib
yarn test
````

## Run in Node.js

In an empty directory run
````
yarn init
yarn add bitcoin-computer-lib
cd bitcoin-computer-lib
````
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

Run the code using

````
node --experimental-modules index.mjs
````

If you get an error "Insuffienct funds in \<address\>" have a look at Section <a href="#fund-your-computer">Fund Your Computer</a>. Once the wallet is funded you will see:

```
Counter {
  n: 1,
  _id: '83553f27c9e4651323f1ebb...',
  _rev: '290923708ca56ea448dd67...'
}
```

## Run in the Browser

Create file `.babelrc`

````
{
  "presets": [ "@babel/preset-env" ],
  "plugins": [ [ "@babel/transform-runtime" ] ]
}
````

Create file ``index.html``

```
<html>
  <body>
    <div id='el'></div>
    <script src="./index.js"></script>
  </body>
</html>
```

Create file ``index.js``.

```
import { Computer } from 'bitcoin-computer-lib'

class Counter {
  constructor() { this.n = 0 }
  inc() { this.n += 1 }
}


;(async () => {
  const computer = new Computer({ seed: 'replace this seed' })

  const counter = await computer.new(Counter)
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`

  await counter.inc()
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`
})()
```

Run the following in an empty directory and open your browser at `http://localhost:1234`.

```
npm init -y
npm i -s bitcoin-computer
npm i -g parcel-bundler
npm i -s @babel/runtime
npm i -d @babel/plugin-transform-runtime
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
* Launch long term support version

We plan to maintain backwards compatibility at the smart contract level from now on. This means you can start developing an application today and it will work on the long term support version without modifications.

We will not maintain backward compatibility at the smart object level until the long term support version is launched. Until then smart objects (eg tokens) that are created under a specific version will only be guaranteed to work with the same version of the software.
## License

[Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/)

You are free to: Share, copy, and redistribute the material in any medium or format
for any purpose, even commercially under the following terms:

* Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* NoDerivatives — If you remix, transform, or build upon the material, you may not distribute the modified material.

This is a human-readable summary of (and not a substitute for) the [license](https://creativecommons.org/licenses/by-nd/3.0/legalcode).
