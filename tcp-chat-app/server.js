const net = require("net");

const server = net.createServer();    // This method is used to create a server which is an object of net.Server class

// an array of client sockets
const clients = [];

// since, the server is an EventEmitter , we can listen to events:

server.on("connection", (socket) => {   // This cb takes the incoming client (i.e. a socket) as param

  console.log("A new connection to the server!");
  
  
  // The incoming socket will emit 'data' event whenever its corresponding client-app sends a message. we are attaching an eventlistener to the incoming socket to listen to it. 
  socket.on("data", (data) => {  
    clients.forEach((s) => {
      s.write(data);
    });
  });
  
  /* 
    --------------------------------------
    Handling the Disconnection of a Client
    -------------------------------------
  */
  socket.on('error', ()=>{  // if we use ctrl+c to close the client (instead of using end() ), it stops the client abruptly and that causes an error in the client-socket of server

    socket.end();     // This sends a FIN packet to the client, indicating no further writes from the server (i.e. closes the client-socket at server side)

    // Remember: If 'error' event occurs due to the aforesaid reason, the client can not send back a FIN packet as it may have already stopped.
    // In such cases, we need to listen to 'close' event on the client-socket at server.
    console.log("socket disconnected");
  })


  socket.on('end', ()=>{  // when the client sends a FIN packet using end(), it causes 'end' event in the client-socket of server

    // then, this client-socket will automatically send an FIN packet back and destroy its file-descriptor.
    console.log("socket disconnected");
  })


  clients.push(socket);
});


// to make a server listen for connections, we use listen() method
server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});


/* 

  -- Refer to the docs in case of any doubt.

  Net Module:
  -----------

  Net module is used to create steam-based TCP or IPC (Inter Process Communication) servers and clients.

  As we know, it is crucial for different processes of the same system to communicate with each other. We achieve that using IPC. This is no way related to networking.
  
  Here, we are interested in creating a TCP based server-client system , both of which will communicate using loopback IP address (i.e. the localhost).

  Recommended way to close the server:
  ------------------------------------

  1. First, we need to call end() method on all the connections (connected sockets). It is necessary because until all connections are ended, server can not be closed.
     If the connections have already ended (i.e. received FIN packet from corresponding clients), skip this step.

  2. Then, we can call the close() method on the server.

  3. However, in this case, we end the server manually using ctrl+c .



*/
