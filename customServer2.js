const http = require('http');
const fs = require('fs');
const host= "127.0.0.1";
const port =80;


const clock = fs.readFileSync("testFiles/index.html","utf-8");
const index= fs.readFileSync("testFiles/positionforserver.html","utf-8");

const server = http.createServer((req,res)=>{
    url=req.url;

    res.statusCode=200;
    res.setHeader("Content-type","text/html");
    if(url == '/'){
        res.end(index);
    }
    else if(url == '/dash'){
        fs.readFile("testFiles/boxforserver.html","utf-8",(err,data)=>res.end(data));
    }
    else if(url == '/clock'){
        res.end(clock);
    }
    else{
        res.statusCode = 404;
        res.end("<h1>404 not found</h1>");
    }
})
    server.listen(port,host,()=>{
        console.log(`Server running at http://${hostname}:${port}/`);
    })
