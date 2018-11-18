//npm i iota.lib.js
//we need the iota.lib.js
const IOTA = require('iota.lib.js')

//This determines the node, in this case it is the load balancer of einfach-iota.de
const iota = new IOTA({ provider: 'https://iota.nodes24.com' })

//Checks if the node works and returns data about it
iota.api.getNodeInfo((error, success) => {
  if (success) {
    console.log(success)
  } else {
    console.log(error)
  }
})

//Seed, required to send value, must be 81 characters long and must consist of A-Z and 9 only (Trytes)
const seed ='EXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEED9999'
//The address to which the transaction is sent must also be 81 characters long and may only consist of trytes
const address = 'EXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLE9999'
//Messages need to be converted to Tytes because a transaction consists only of Trytes
const message = iota.utils.toTrytes('Hello Tangle!')
//The tag of a transaction may only consist of trytes and can be up to 27 trytes long
const tag = 'EINFACHIOTA'

const transfers = [
  {
    value: 0,
    address: address,
    message: message,
    tag: tag
  }
]

//The 3 stands for the depth of the random walk
//The 14 stands for MWM (Minimum Weight Magnitude), that's the difficulty of the PoW
iota.api.sendTransfer(seed, 3, 14, transfers, (error, success) => {
  if (success) {
    //Displays the transactionobject and a link to thetangle.org in the console
    console.log(success)
    console.log("https://thetangle.org/transaction/"+success[0].hash)
  } else {
    console.log(error)
  }
})
