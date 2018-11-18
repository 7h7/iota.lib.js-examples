const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://iota.nodes24.com' })

var seed    = 'EXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEED9999'
    address = 'EXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLE9999'
    message = iota.utils.toTrytes('Promotetransaction!')
    tag     = 'EINFACHIOTA'

var transfers = [
    {
      value: 0,
      address: address,
      message: message,
      tag: tag
    }
  ]

//reattach(replay) a bundle
function replay(transactionhash){
    return new Promise((resolve, reject) => {
        iota.api.replayBundle(transactionhash, 3, 14, (error, success) => {
            if(success){
                console.log("Replayed tail transaction: "+success[0].hash);
                resolve(success[0].hash)
            }else{
                reject(error)
            }
        })
    })
}

//promote a transaction
function promote(transaction){
    return new Promise((resolve, reject) => {
        iota.api.promoteTransaction(transaction, 3, 14, transfers, {delay: 0, interrupt: false}, (error, success)=>{
            if(success){
                console.log("Promotetransaction: "+success[0].hash);
                resolve(success)
            }else{
                reject(error)
            }
        })
    })
}

//function to wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function promoteandreplay(){
    var transactionhash = await replay('9BCAXBZSZHAXQOLJYFNSMWYPFDXXSKZEZL9BPEWZPEXBOYQCF9SHFSYJMIRFAVFQTWGATIFUKBVB99999')
    //wait one second for the node to process the transaction
    await sleep(1000)
    promote(transactionhash)
}

//run
promoteandreplay()
