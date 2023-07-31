
function average(arr) {
    let sum= 0;
    arr.forEach(element => {
        sum += element;
    });
    return sum/arr.length;
    
}
// module.exports = average; // sudhu average function ta export korbe. Basically it is an object inside module object. 
/* 
module.exports= {
    name:"Steve",
    job: "Developer",
    avg: average
}
*/

function Greet(){ //Ei function ta export na kora sotteo exported hoye jabe,jehetu eta invoke kora ache. Invoke na korle jeto na
    console.log('Have a Nice Day');
}
Greet();

console.log(module);
/*

let john="randomGuy";
let peter= "peter"

module.exports={ //multiple value evabeo export kora jay object baniye
    john:john,
    peter: peter
}
//Instead we can use ES6 Syntax too

module.exports={john,peter}



module.exports.items=["item1","item2","item3","item4"]; //array ta ke alada kore variable er moddhe store korar dorkar porena ekhetre, direct export kore dicchi bole. export object er moddhe item property hisebe value ta dilam

const person={
    name: "Bob",
    role:"Builder"
}
module.exports.SinglePerson=person;
*/