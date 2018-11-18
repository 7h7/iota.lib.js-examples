//npm i zeromq
//npm i iota.lib.js
const IOTA = require('iota.lib.js')
var iota = new IOTA ({ provider: 'https://nodes.devnet.thetangle.org:443' })

let zmq = require('zeromq')
let sock = zmq.socket('sub')

sock.connect('tcp://zmq.devnet.iota.org:5556')
//for new confirmed transactions
sock.subscribe('sn')
//for alle new transactions
//sock.subscribe('tx')


var address='EXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLEADDRESSEXAMPLE9999'


sock.on('message', msg => {
  const data = msg.toString().split(' ') // Split to get topic & data
  switch (
    data[0] // Use index 0 to match topic
  ) {
       //'sn' for new confirmed transactions, there are also other possibilities: https://github.com/iotaledger/iri/tree/dev/src/main/java/com/iota/iri/zmq
    case 'sn':
      if(data[3]==address){
        console.log("Confirmed transaction: "+data[3]);
            //request transaction object from the node to get the value
            iota.api.getTransactionsObjects([data[2]], (error, success)=>{
              if (success){
                console.log("Transactionshash: "+success[0].hash);
                console.log("Value: "+success[0].value);
              }else{
                console.log(error);
              }
        })
      }
    //Display all new transactions
    //   case 'tx': console.log(data);
    break
    } 
})

/*
returned array for sock.subscribe('sn'):

[0] = option ('sn')
[1] = milestoneindex
[2] = transactionhash
[3] = adress
[4] = branch transaction
[5] = trunk transaction
[6] = bundle

*/