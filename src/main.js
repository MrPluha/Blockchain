
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('a924558fe33f08e731a61877fc640287bcf392756c5dde13ae53e06b1e8823be');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new Blockchain();

const tx1 = new Transaction (myWalletAddress, 'address1', 15);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction (tx1);



// +10 transactions
for (let i = 0; i < 10; i++) {
  let transaction = new Transaction(myWalletAddress, 'address' + i, 22);
  transaction.signTransaction(myKey);
  savjeeCoin.addTransaction(transaction);
  savjeeCoin.minePendingTransactions(myWalletAddress);
}

console.log('\nStarting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);
console.log('Is chain valid?', savjeeCoin.isChainValid()); 


// Unauthorised change
// Middle block
let middleBlockIndex = Math.floor(savjeeCoin.chain.length / 2);
savjeeCoin.chain[middleBlockIndex].transactions[0].amount = 10000;

// Pārbaude 
console.log("Is the blockchain valid after unauthorized changes?", savjeeCoin.isChainValid());


//savejeeCoin.chain1[1].transaction[0].amount = 1;

console.log('All blockchain:\n', JSON.stringify(savjeeCoin, null, 2));
console.log('\nBalance of xavier is', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('Bloks in blockchain:', savjeeCoin.chain.length);
console.log('Is chain valid?', savjeeCoin.isChainValid()); 