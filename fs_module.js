/* 
    Basically, file is a sequence of 0s and 1s stored in the memory. The data represented by these 0 and 1s entirely depend on the decoding procedure. Everything in our computer is a file.
    
    E.g., bits in a text file does not represent the same as those in a image, therefore both of them need to be decoded differently.

    1. Node can not access files directly, it talks to the OS with system-calls to request files (using libuv)

    2. We can use either Promises API or Callback API or Synchronous API to perform any operation using fs_module.
*/

const fs = require("fs"); //Module include korlam
let text = fs.readFileSync("dele.txt","utf-8") 
//Prothom argument ta je file ke read korbo tar path, second ta oi file tar encoding type
console.log(text);          //readfilesync function ta dele.txt ke read kore text er moddhe store korlo



text= text.replace("Evening","Morning");
// fs.writeFileSync("../Sweet2.txt",text);      // parent folder e file ta banate
// fs.writeFileSync("Sweet2.txt",text);         //current folder e file ta banate
// fs.writeFileSync("Sweet2.txt","Ami tomar chokher kalo chai");                //Evabe direct string diyeo lekha jay
// fs.writeFileSync("Sweet2.txt","Ami tomar chokher kalo chai",{flag:"a"});     //Evabe third argument e "a" flag dile jodi file ta already exist kore tahole setar ja data ache setar sathe ei input ta jure jabe


/* 
    1. WriteFileSync function ta file create kore, jodi given location e oi nam e kono file present na thake. Thakle setar data overwrite kore notun data put korbe. Prothom argument ta jekhane file banabo tar path, second ta oi file er moddhe ki thakbe seta denote korbe

    2. Jodi chai kono file e je data ache seta overwritten na hoye just por por jure jak... tokhn aro ekta argument pass korte hobe writeFile e, which is an object

    3. Jodi onno kono directory te write korte chai, sei directory ta jeno age theke exist kore, nahole error debe.

    4. It is synchronous in nature, i.e. it blocks the main thread while execution. Moreover, we can not handle errors in this approach and our whole application halts if an error is encountered.
*/