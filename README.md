# Bitcoin|Computer

<code>UNDER CONSTRUCTION</code>

Bitcoin|Computer is a Javascript library for running smart contracts on Bitcoin. It is

* **easy to learn** because smart contracts are vanilla Javascript programs
* **cheap to use** because you can deploy and use a smart contract for under a penny
* **flexible** because it will work on BTC, BCH, LTC, BSV. We currently support BCH but will add more coins soon
* **fun** because it is a new way programming paradigm waiting to be explored

For details check out the [Bitcoin|Computer docs](https://bitcoin-computer.gitbook.io/docs).

## Run in Node

In an empty directory run ``npm init -y && npm i -s bitcoin-computer``

Create ``index.mjs`` as shown below. Replace the string *"replace this seed"* with your own seed phrase (eg from your wallet or from [here](https://iancoleman.io/bip39/)).

```
import Computer from 'bitcoin-computer'

// the smart contract
class Counter {
  constructor() { this.n = 0 }
  inc() { this.n += 1 }
}


// run the smart contract
;(async () => {
  const computer = new Computer({ seed: 'replace this seed' })
  const counter = await computer.new(Counter, [])
  await counter.inc()
  console.log(counter)
  computer.shutdown()
})()
```

Run the contract using `node --experimental-modules index.mjs`. You will get an error message *"Insufficient balance in address \<your_address\>"*

Send a small amount of Bitcoin Cash to *\<your_address\>*, eg from a [Bitcoin Cash Faucet](https://free.bitcoin.com/). Run the contract again and if it worked you will see:

```
Counter {
  n: 1,
  _owners: [ '028b43c3e12159179c...' ],
  _amount: 2000
}
```

Congrats, you are now one of the first people to ever to run a smart contract on Bitcoin! Now go ahead and change the program above to create your own smart contract.

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
    seed: 'replace this seed'
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

Open your browser at `http://localhost:1234`. See the instructions for how to pick your own seed phrase and how to deal with the error message *"Insufficient balance in address \<your_address\>"*

## Documentation

You can find more information in the [Bitcoin|Computer Docs](https://bitcoin-computer.gitbook.io/docs/)

## Getting Help

Bitcoin|Computer is in alpha stage, so there will be bugs. If you have any issues, please

* ask a question in the [Telegram Group](https://t.me/joinchat/FMrjOUWRuUkNuIt7zJL8tg)
* create and issue on [Github](https://github.com/bitcoin-computer/computer/issues)
