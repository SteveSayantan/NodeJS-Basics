const dgram= require('node:dgram');// To implement UDP datagram socket, we use this module

// createSocket() method can be used to create both server and client
const server= dgram.createSocket('udp4'); // udp4 uses IPv4 , udp6 uses IPv6


// The 'message' event is emitted when a new datagram is available on a socket, 
server.on('message',  (msg,rinfo)=>{  // msg is a buffer representing the message, rinfo is an object containing remote address info
    
    console.log(`Received: ${msg.toString()}`, `from ${rinfo.address}:${rinfo.port}`);

})

server.on('listening', ()=>{
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);    
})


// bind() causes socket to listen for messages. 
//If address is omitted, the socket tries to listen to all addresses (on the specified port) associated with our machine
server.bind(3523,'localhost');  // Once binding is complete, a 'listening' event is emitted 



