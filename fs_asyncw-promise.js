const {readFile,writeFile} = require("fs");

const getText = path=>{
    return new Promise((resolve, reject)=>{
        readFile(path,"utf-8",(err,data)=>{
            if(err){
                reject(err);
                return;     // This return is necessary,otherwise the next part will be executed even if error occurs
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
            }
            else{ 
             resolve(data); 
            
            }
        })
    })
}
getText("testFiles/dele.txt").then((result)=>console.log(result)).catch((result)=>console.log(result));
writeText("./swee2.txt",`Sweetu is awesome:`).catch((result)=>console.log(result)); //resolve part ta lagchena tai then block tao dorkar nei

//Remarks: It improves the code readablity but still if we want to read two files and write one file, we have to write more lines, let's see how async-await changes the scenario.