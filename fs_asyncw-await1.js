const {readFile,writeFile} = require("fs");

function getText (path){
    return new Promise((resolve, reject)=>{
        readFile(path,"utf-8",(err,data)=>{
            if(err){
             reject(err);
             return;
            }
            resolve(data);
        })
    })
}
function writeText(path,text){
    return new Promise((resolve, reject)=>{
        writeFile(path,text,(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data); //As it returns undefined, it is not required
        })
    })
}
const fileManager= async ()=>{ //async function fileManager(){} likheo kora jeto
   try
    {
    const first= await getText("testFiles/hello.txt");
    const second= await getText("testFiles/dele.txt");
    await writeText("./swee2.txt",`Sweetu is awesome:${first} and ${second}`); //writeFile er resolve part ta undefined return kore, tai otake variable er moddhe store korlam na.
    console.log(first,second);
}
catch(error){
    console.log(error);
}
}

fileManager();

//Remarks: This makes our code a lot cleaner but we need to write some code for writeFile,lets see.