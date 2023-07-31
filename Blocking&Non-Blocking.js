/* ---------------------------
Blocking or Synchronous Program
-----------------------------*/
// Line by Line execution takes place. 
const ls = require("fs");
let synctext = ls.readFileSync("dele.txt","utf-8") ;//jtokkhn na file ta read kora ses hocche totokkhn onno line execution hobena
console.log(synctext);
console.log("This is a message");


/*-------------------------------
Non-Blocking or Asynchronous Program
--------------------------------*/

//It takes a callback function. Handles multiple tasks simultaneously 

ls.readFile("dele.txt","utf-8",(err,data)=>{
   console.log(err,data); 
})//last er ta callback function jar first argument error show kore, second argument data show kore
console.log("This is a message");
//Ekhane file ta read korche,but korte korte porer line tao execute hocche



//Another Example of Asychronous Program
ls.writeFile("../Sweet.txt","Some random text",{flag:'a'},(err,data)=>console.log(err,data)); //Third Argument ta optional, ota dile jodi file ta already exist kore tahole setar ja data ache setar sathe ei input ta jure jabe