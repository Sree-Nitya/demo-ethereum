/**
 * Creating your own transaction using the addresses in Ganache
 */

// Step 1: set up the appropriate configuration

var Web3 = require('web3')
var EthereumTransaction = require('ethereumjs-tx').Transaction
var web3 = new Web3('https://rinkeby.infura.io/v3/562f510605d04990ac991c8011448600')

// step 2: set the sending and receiving addresses for the transaction. 
// These addresses are from 2 accounts in metamask
var sendingAddress = '0x2A84496aFa798937554610aFfD79f69C6C3d1d71'
var receivingAddress = '0x279B090c8d36122A14B994EEE72917c7aFa7beBe'

// step 3: check the balance for each address 
web3.eth.getBalance(sendingAddress).then(balance => 
    console.log(web3.utils.fromWei(balance, 'ether')));

web3.eth.getBalance(receivingAddress).then(balance => 
    console.log(web3.utils.fromWei(balance, 'ether')));

// step 4: set up the transaction using the transaction variables

web3.eth.getTransactionCount(sendingAddress, (err, transactionCount) =>{
    var rawTransaction = {
        nonce: web3.utils.toHex(transactionCount),
        to: receivingAddress,
        gasPrice: web3.utils.toHex(20000000),
        gasLimit: web3.utils.toHex(30000),
        value: web3.utils.toHex(web3.utils.toWei('10','ether'))
    }

// step 5: create the transaction 
var transaction = new EthereumTransaction(rawTransaction)

// step 6: sign the transaction with the hex value of the private key of sender
var privateKeySender = '<private key>'
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex')

transaction.sign(privateKeySenderHex)

// step 7: send the serialized transaction to the Ethereum network.

var serializedTransaction = transaction.serialize()
web3.eth.sendSignedTransaction(serializedTransaction)
})