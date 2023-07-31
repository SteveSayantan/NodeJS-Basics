const http = require('http');
const fs = require('fs');

http.createServer(function (req,res){
   
    /* usual method
    
    const fileContent= fs.readFileSync("../HTML&CSS/Animations.html","utf-8");
    res.end(fileContent) 
    */

    const fileStream= fs.createReadStream("testFiles/hello.txt",{encoding:"utf-8"});
    fileStream.on('open',()=>{ //open event ta fs.readStream er moddhe thake
       
        fileStream.pipe(res);//pipe method ta writeStrem er kaj kore, mane data ta sequentially write kora hobe
    })
}).listen(80);