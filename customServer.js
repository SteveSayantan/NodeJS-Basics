const http = require('http');
const fs = require('fs');
const fileContent= fs.readFileSync("../HTML&CSS/Animations.html","utf-8");

const server= http.createServer((req,res)=>{
    
    res.writeHead(200,{"Content-type":"text/html"}); //html er jaygay plain likhle normal text hisebe consider kora hobe,css likhle css er format asbe
    res.end(fileContent)
    /* 
    //another syntax
    
    res.write(fileContent) //eta na likhe sudhu res.end(fileContent) likhleo hoto
    res.end()
    */
});

server.listen(80,"127.0.0.1",()=>{
    console.log("Listening on port 80"); //80 port e host korale seta browser e likhte hoyna alada kore
});