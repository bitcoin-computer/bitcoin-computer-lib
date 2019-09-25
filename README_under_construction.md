# Bitcoin|Computer

Bitcoin|Computer is a platform for running smart contracts on Bitcoin. It is based on the following principles

* **Simplicity.** Smart contracts are vanilla Javascript programs. If you know how to use Javascript you know how to use the Bitcoin|Computer
* **Scalability.** The cost of running a smart contract is independent of the computational work required. This allows you to run smart contracts that would cost millions on other platform at the cost of sending a payment.
* **Freedom**. Bitcoin|Computer works on Bitcoin<sup>\*</sup>, Bitcoin Cash, Bitcoin SV<sup>\*</sup>, LiteCoin<sup>\*</sup>, and Dogecoin<sup>\*</sup>. We don't tell you what to do, we let you decide.

<sup>\*</sup>coming soon

## Get Started


## How it Works

When a Javascript program is executed, memory is allocated that stores the objects created by the program. When you deploy a smart contract to the Bitcoin|Computer, that object is additionally stored in one or more unspent transaction outputs (UTXOs).

The Bitcoin|Computer software guarantees that the UTXOs that store a smart object on the blockchain are synchronized to the locations on your hard drive that store the same object. This means that of either representations changes, the other one is updated as well.

In addition to deploying smart objects, the Bitcoin|Computer allows users to synchronize to smart objects that are already deployed on the blockchain. This provides a simple mechanism for building multi user applications: The shared state is stored on the blockchain and replicated on multiple users computers. Every user can call a function on an object on their local machine. As the object is synced to the blockchain the object on the blockchain updates as well which in turn updates all instances on other users machines.
