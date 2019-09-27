# Bitcoin|Computer

<code>UNDER CONSTRUCTION</code>

Bitcoin|Computer is a platform for running smart contracts on Bitcoin, based on the following principles

**Simplicity.** Smart contracts are vanilla Javascript programs. If you know how to use Javascript you know how to use the Bitcoin|Computer.

**Scalability.** The cost of running a smart contract is independent of the computational work required. This allows you to run smart contracts that would cost millions on other platform at the cost of sending a payment.

**Freedom**. Bitcoin|Computer currently works on Bitcoin Cash, but we'll add support for Bitcoin, Litecoin, Bitcoin SV, and others soon. We don't tell you what to do, we let you decide.

## Run in Node

In an empty directory run ``npm init -y && npm i -s bitcoin-computer``

Create ``index.mjs`` as shown below. Replace the string *"replace this seed"* with your own seed phrase (eg from your wallet or from [here](https://iancoleman.io/bip39/)).

```js
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
  counter._close()
  computer.close()
})()
```

Run the contract using `node --experimental-modules index.mjs`. You will get an error message *"Insufficient balance in address \<your_address\>"*

Send a small amount of Bitcoin Cash to *\<your_address\>*, eg from a [Bitcoin Cash Faucet](https://free.bitcoin.com/). Run the contract again and if it worked you will see:

```json
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

```html
<html>
  <body>
    <script src="./index.js"></script>
    <div id='el'></div>
  </body>
</html>
```

Create file ``index.js``

```js
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

  counter._close()
  computer.close()
})()
```

Run the following in an empty directory

```ShellSession
npm init -y
npm i -s bitcoin-computer
npm i -g parcel-bundler
npm i -s @babel/runtime
npm i -d @babel/plugin-transform-runtime
parcel index.html
```

Open your browser at `http://localhost:1234`. See the instructions for how to pick your own seed phrase and how to deal with the error message *"Insufficient balance in address \<your_address\>"*

## Supported Features

Eventually we want to make it possible to deploy any smart contract on the Bitcoin|Computer. We are just getting started and we not quite there yet. However, already today the Bitcoin|Computer powerful enough to support popular smart contracts like non-fungible tokens.

## Disclaimer

Expect bugs and issues. Don't put more Bitcion Cash into the Bitcoin|Computer than you are willing to loose. If you have any problems, please create an issue on [Github](https://github.com/bitcoin-computer/computer).
