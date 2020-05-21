<img src="https://i.ibb.co/5WqkvWr/logo-orange-background.png" alt="logo" border="0" />


# Bitcoin Computer

BitcoinComputer is a Javascript library for running smart contracts on Bitcoin. [bitcoincomputer.io](http://bitcoincomputer.io/)

## Run in Node

``npm init -y && npm i -s bitcoin-computer``

Create file ``index.mjs`` as shown below. Replace the string *"replace this seed"* with your own seed phrase (eg from your wallet or from [here](https://iancoleman.io/bip39/)).

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
  computer.shutdown()
})()
```


### Send testnet coins to the computer

To run the code you need to fund the Bitcoin wallet inside the computer object. Run the code using `node --experimental-modules index.mjs`. You will get an error message "Insufficient balance in address \<your_address\>".

Send free testnet coins from a [Bitcoin SV faucet](https://faucet.bitcoincloud.net/) or a [Bitcoin Cash Faucet](https://developer.bitcoin.com/faucets/bch/) to \<your_address\>. Run the contract again and you will see:

```
Counter {
  n: 1,
  _owners: [ '028b43c3e12159179c...' ],
  _amount: 2000
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
    <script src="./index.js"></script>
    <div id='el'></div>
  </body>
</html>
```

Create file ``index.js``

```
import Computer from 'bitcoin-computer';

class Counter {
  constructor() { this.n = 0 }
  inc() { this.n += 1 }
}

; (async () => {
  const computer = new Computer({
    seed: 'replace this seed',
    chain: 'BCH', // BSV or BCH
    network: 'testnet' // testnet or livenet
  })
  const counter = await computer.new(Counter, [])
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`;
  await counter.inc()
  document.getElementById("el").innerHTML = `Counter is ${counter.n}`;

  computer.shutdown()
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

Open your browser at `http://localhost:1234`. See the instructions for how to pick your own seed phrase and how to fund the computer in the section [above](#-Run-in-Node)

## Documentation

You can find more information in the [Bitcoin|Computer Docs](https://bitcoin-computer.gitbook.io/docs/)

## Getting Help

Bitcoin|Computer is in alpha stage, so there will be bugs. If you have any issues, please

* ask a question in the [Telegram Group](https://t.me/joinchat/FMrjOUWRuUkNuIt7zJL8tg)
* create an issue on [Github](https://github.com/bitcoin-computer/computer/issues)
