const net = require('node:net');
const fs = require('node:fs/promises');


const server= net.createServer();

server.on('connection', (socket)=>{

    let fileHandleWrite, writeStream;   // To keep these unique for every connection, they aren't global    

    console.log("A friend has connected!!!")

    // Important: we can't catch errors inside event listeners using try..catch !!!!

    socket.once('data', (chunk)=>{  // Make sure to use once() method, as we want to execute the following block only once !!!   
        
        fs.open(`copy_${chunk.toString()}`,'w')     // At the first 'data' event, we create a file 
        
        .then((fd)=>{   // if the promise returned by open() is resolved, this cb will be executed
            fileHandleWrite=fd; 
        })

        .then(()=>{     // if the promise returned by previous then() is resolved, this cb will be executed

            writeStream=fileHandleWrite.createWriteStream();
            socket.pipe(writeStream);

            socket.on('error', ()=>{     // if any error occurs in the socket,   
                console.log("Error occurred in client");

                socket.end();   // we can simply call end() to send the client FIN packet. 
                
            })
        })
        .catch ((error)=>{
            console.log("Something went wrong while writing the file!!", error.message)
        })
        
    })

    // The FIN packet received from the client causes 'end' event to the client-socket of server. It will execute the 'end' eventlistener on client-socket

    
    // 'close' event occurs after an 'error' event on this client-socket or when this client-socket is fully closed
    socket.once('close', async ()=>{    
        console.log("Connection Closed!!");
        socket.unpipe();
        await fileHandleWrite?.close();     // the client may want to end the connection, even before the fileHandle is opened, hence we need optional chaining.
        
    })

})


server.listen(3000,'localhost',()=>{
    console.log("Server is listening on port 3000");
})