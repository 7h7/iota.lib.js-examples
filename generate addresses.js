//npm i iota.lib.js
const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://nutzdoch.einfachiota.de' })


var seed="EXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEEDEXAMPLESEED9999" // seed
var amount = 10 // amount of addresses
var seclvl = 2 // security level can be 1, 2, or 3, Trinity uses 2

console.log("Generate adresses from index 0 - "+amount)

//without the options in "iota.api.getNewAddress" addresses are generated deterministically
var options={
    index: 0,
    security: seclvl,
    total:1,
    checksum:false
}

function addressen(amount){
    for(var j=0; j<amount; j++){
        options.index=j;
        iota.api.getNewAddress(seed, options, (error, success) => {
            if(success){
                console.log(`Address at index ${j}: `+success)
            }else{
                console.log(error)
            }
        })
    }
}

//run
addressen(amount)

//An address has 81 characters, after which you can add a checksum, which is also needed in Trinity
console.log("Adress with checksum: "+iota.utils.addChecksum('HXKFPLDHDUI9PWCMEFAZCGUHTFYPUYQINAEWGRH9IZT9MUNEKIKHDYVBMXJUSXYOVEFLTYMAAEPMCVVUD', 9));

//Get balance from an address
iota.api.getBalances( ['HXKFPLDHDUI9PWCMEFAZCGUHTFYPUYQINAEWGRH9IZT9MUNEKIKHDYVBMXJUSXYOVEFLTYMAAEPMCVVUD'], 100, (error, success) =>{
    if(success){
        console.log(success)
    }else{
        console.log(error)
    }
})
