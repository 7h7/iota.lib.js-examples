//npm i iota.lib.js
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://iota.nodes24.com' })

var seed    = 'EXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEED9999'
var address = 'EXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLE9999'
var message = iota.utils.toTrytes('Hello Tangle!')
var tag     = 'EINFACHIOTA'

var transfers = [
  {
    value: 0,
    address: address,
    message: message,
    tag: tag
  }
]

//Prepare the transaction with the transfersobject
function prepareTransfers(){
    return new Promise((resolve, reject) => {
        iota.api.prepareTransfers(seed, transfers, (error, trytes) => {
            if(trytes) {
                console.log(trytes);
                resolve (trytes)
            }else{
                reject (error)
            }
        })
    })
}

//Get two transactions to approve
function getTransactionsToApprove(){
    return new Promise((resolve, reject) => {
        //How deep the random walk should start
        var depth = 3;
        iota.api.getTransactionsToApprove(depth, (error, toApprove) => {
            if(toApprove){
                console.log(toApprove);
                resolve(toApprove)
            }else{
                reject(error)
            }
        })
    })
}

//Proof of work with the two tips in the transaction, you could also choose your own transactions and use as a tip to promote such a transaction
function attachToTangle(tips, trytes){
    return new Promise((resolve, reject) => {
        iota.api.attachToTangle(tips.trunkTransaction, tips.branchTransaction, 14, trytes, (error, attachedTrytes) => {
            if(attachedTrytes) {
                console.log(attachedTrytes);
                console.log("Transactionhash: "+iota.utils.transactionObject(attachedTrytes[0]).hash);
                resolve (attachedTrytes)
            }else{
                reject (error)
            }
        })
    })
}

//Send the transaction to the Tangle
function storeAndBroadcast(attachedTrytes){
    return new Promise((resolve, reject) => {
        iota.api.storeAndBroadcast(attachedTrytes, (error, success) => {
            if(success) {
                resolve (success)
            }else{
                reject (error)
            }
        })
    })
}

async function send(){
    var trytes         = await prepareTransfers();
    var tips           = await getTransactionsToApprove();      
    var attachedTrytes = await attachToTangle(tips, trytes);
        await storeAndBroadcast(attachedTrytes)
    console.log("Transaction sent")
}

//run
send()