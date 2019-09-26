## How it Works

When a Javascript program is executed on your local machine, memory is allocated that stores the objects created by the program. When you deploy a smart contract to the Bitcoin|Computer, that object is additionally stored in unspent transactions outputs on the blockchain.

The Bitcoin|Computer software guarantees that the UTXOs that store a smart object on the blockchain are synchronized to the locations on your hard drive that store the same object. This means that of either representations changes, the other one is updated as well.

In addition to deploying smart objects, the Bitcoin|Computer allows users to synchronize to smart objects that are already deployed on the blockchain. This provides a simple mechanism for building multi user applications: The shared state is stored on the blockchain and replicated on multiple users computers. Every user can call a function on an object on their local machine. As the object is synced to the blockchain the object on the blockchain updates as well which in turn updates all instances on other users machines.
