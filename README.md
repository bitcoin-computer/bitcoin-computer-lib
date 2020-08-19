<img src="https://i.ibb.co/5WqkvWr/logo-orange-background.png" alt="logo" border="0" />


# Bitcoin Computer

BitcoinComputer is a Javascript library for running smart contracts on Bitcoin. See [bitcoincomputer.io](http://bitcoincomputer.io/) for more documentation.

## Run the Tests

The easiest way to get started is to run the tests. In an empty directory run

````
git clone git@github.com:bitcoin-computer/computer.git
cd computer
npm install
npm test
````


If you get an error "Insuffienct balance in \<your address\>" send free testnet coins to \<your address\> as explained in
<a href="#fund-your-computer">Fund Your Computer</a> below.

## Run in Node

In an empty directory run

``npm init -y && npm i -s bitcoin-computer``

Create file ``index.mjs`` as shown below.

```
import Computer from 'bitcoin-computer'

// the smart contract
class Counter {
  constructor() { this.n = 0 }
  inc() { this.n += 1 }
}


// run the smart contract
;(async () => {
  const computer = new Computer({
    seed: 'replace this seed',
    chain: 'BSV', // BSV or BCH
    network: 'testnet' // testnet or livenet
  })
  const counter = await computer.new(Counter, [])
  await counter.inc()
  console.log(counter)
})()
```

Run the code using

````
node --experimental-modules index.mjs
````

If you get an error "Insuffienct funds in \<your address\>" have a look at the secion <a href="#fund-your-computer">Fund Your Computer</a> below. Run the code again after funding the wallet and you will see:

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

Create file ``index.js``

```
import Computer from 'bitcoin-computer'

class Counter {
  constructor() { this.n = 0 }
  inc() { this.n += 1 }
}


;(async () => {
  const computer = new Computer({
    seed: 'replace this seed',
    chain: 'BSV', // BSV or BCH
    network: 'testnet', // testnet or livenet
    path: "m/44'/0'/0'/0" // defaults to "m/44'/0'/0'/0"
  })
  const counter = await computer.new(Counter, [])
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`

  await counter.inc()
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`
})()
```

Run the following in an empty directory

```
npm init -y
npm i -s bitcoin-computer
npm i -g parcel-bundler
npm i -s @babel/runtime
npm i -d @babel/plugin-transform-runtime
parcel index.html
```

Open your browser at `http://localhost:1234`. See the instructions for how to configure your own seed phrase and how to fund the computer in the sections below.

## Configure Your Seed Phrase

By default the bitcoin computer object uses the pass phrase "replace this seed" to initialize the wallet. If you want to use your own seed phrase, replace the string "replace this seed" with any bip39 compatible seed phrase or generate a new one [here](https://iancoleman.io/bip39/).

## Fund Your Computer

If you get an error message "Insufficient balance in address \<your_address\>" you need to fund the wallet inside the computer object. You can get free testnet coins from a [Bitcoin SV faucet](https://faucet.bitcoincloud.net/) or a [Bitcoin Cash Faucet](https://faucet.fullstack.cash/) and send them to \<your_address\>.


## Documentation

You can find more information in the [Bitcoin Computer Docs](https://bitcoin-computer.gitbook.io/docs/)

## Getting Help

If you have any issues ask a question in the [Telegram Group](https://t.me/joinchat/FMrjOUWRuUkNuIt7zJL8tg) or create an issue on [Github](https://github.com/bitcoin-computer/computer/issues).

## Licence

Code it licenced under [Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/). You are free to: Share, copy, and redistribute the material in any medium or format
for any purpose, even commercially under the following terms:

* Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
* NoDerivatives — If you remix, transform, or build upon the material, you may not distribute the modified material.

This is a human-readable summary of (and not a substitute for) the [license](https://creativecommons.org/licenses/by-nd/3.0/legalcode).

## Beta Warning

We are in beta to indicate that there are known security vulnerabilities. Our main priority right now is to fix all security related issues. Once done will then remove the beta tag and start a bug bounty program to find all remaining bugs.

## Breaking Changes
* x.x.x-alpha.x -> 0.3.0-beta: Smart contracts deployed in an alpha version do not work in the beta version.
* 0.3.0-alpha.10 -> 0.3.0-alpha.11: We changed the default wallet derivation path from the empty string to "m/44'/0'/0'/0". To use funds from a wallet created in version 0.3.0-alpha.10 or before, set the ```path``` option to the empty string when creating a computer object.
