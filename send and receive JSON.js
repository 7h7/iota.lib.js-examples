//npm i iota.lib.js
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://iota.nodes24.com' })

var json     = {'website':'https://einfach-iota.de', 'example number': 3}
var seed     = 'EXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEED9999'
var message  = iota.utils.toTrytes(JSON.stringify(json))
var address  = 'EXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLE9999'
var tag      = 'EINFACHIOTA'

const transfers = [
    {
      value: 0,
      address: address,
      message: message,
      tag: tag
    }
]

//function to send the JSON message to the tangle
function send(){
    return new Promise((resolve, reject) => {
        iota.api.sendTransfer(seed, 3, 14, transfers, (error, success) => {
            if (success) {
                console.log("transactionhash: "+success[0].hash);
                resolve(success[0].hash)
            } else {
                reject(error)
            }
        })
    })
}


//receive the data from a bundle
function bundlereceive(tailtransaction){
    return new Promise((resolve, reject) => {
        iota.api.getBundle(tailtransaction, (error, success)=>{
            if(success){
                console.log(JSON.parse(iota.utils.extractJson(success)))
                resolve(iota.utils.extractJson(success))
            }else{
                reject(error)
            }
        })
    })
}

//receive a single transaction, if not the whole bundle, but only a special transaction is needed
function receivedsingle(transactionhash){
    return new Promise((resolve, reject) => {
        iota.api.getTransactionsObjects([transactionhash], (error, success)=>{
            if(success){
                var trytes   = success[0].signatureMessageFragment
                    n        = trytes.lastIndexOf("QD")
                    result = JSON.parse(iota.utils.fromTrytes(trytes.substring(0, n+2)))
                console.log(result)
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}


//send and receive
async function example(){
    var transactionhash= await send();
    bundlereceive(transactionhash)
    // receivedsingle(transactionhash)
}

//run
example()
