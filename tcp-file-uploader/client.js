const net = require('node:net');
const fs = require('node:fs/promises');
const path= require('node:path');


if(process.argv.length < 3){
    console.log("Insufficient Args, Please provide the filename");
    process.exit(1);
}

const FILENAME=path.basename(process.argv[2]);

const socket= net.createConnection({port:3000});

let fileHandleRead, readStream;

socket.on("connect", ()=>{

    console.log("Client is connected");
    
    fs.open(`${FILENAME}`,'r')    // After connection, we open the file  
    .then((fd)=>{
        
        fileHandleRead=fd;
        socket.write(`${FILENAME}`);  // First, we send the name of the file to the server

    })
    .then(()=>{  

        readStream=fileHandleRead.createReadStream();
        readStream.pipe(socket);
        
        // whenever, data is available on the readStream, 'data' event is emitted
        readStream.on('data',()=>{      // implement loader
            console.log('data event occurred');
        })

        readStream.on('error', ()=>{
            console.log("Error occurred in readStream");
            socket.end();       
        })
    
        
        readStream.on('end',()=>{
            readStream.unpipe(socket);      
            console.log("Successfully uploaded "+FILENAME);
            socket.end();
        })
    })
    .catch((error)=>{
        console.log(error.message);
        socket.end();
    });

    
})

// when the server sends a FIN packet, 'end' event occurs. When this socket is fully closed, 'close' event occurs
socket.once('close', async()=>{      

    console.log("Socket Closed");

    // readStream might be undefined, if the promise returned by fs.open() is rejected
    readStream?.unpipe();       
    readStream?.destroy();

    // fileHandleRead might be undefined, if the promise returned by fs.open() is rejected
    await fileHandleRead?.close();
    socket.destroy();
})





