const net = require('net');
const readline = require('readline/promises');  // this module is used to interact with the standard input
const EXIT_MESSAGE='EXIT';     

const rl = readline.createInterface({   // as per docs, we have created an instance of the readlinePromises.Interface class
    input: process.stdin,
    output: process.stdout,
});

const readLineInstance = new readline.Readline(process.stdout);

// createConnection method is used to create a client
const socket = net.createConnection({ host: '127.0.0.1', port: 3008 });   //A client is basically a socket (belonging to the class net.Socket, extends Duplex stream) used to connect to the server



class AC{
    
    #controller= null;
    
    get currentController(){
        return this.#controller;
    }
    
    createNewController(){
        this.#controller= new AbortController();
    }
    
    destroyController(){
        this.#controller= null;
    }
}


const controller= new AC();


const askIP = async () => {
    
    controller.createNewController();

    try{
        
        // using rl, we can wait for user input. Also attaching the signal of the AbortController to abort the question if required. 
        let message = await rl.question('Enter a message > ', { 
            signal:controller.currentController.signal 
        });

        if(message === EXIT_MESSAGE){
            socket.end();
            rl.close();
            console.log('closing socket');
            return;
        }

        socket.write(message);     // writes the msg to the socket (i.e. sends to the server)
        
        
        controller.destroyController();     // once user has responded, we don't need the controller anymore

        
        readLineInstance.moveCursor(0, -1); // moves cursor to the previous line
        readLineInstance.clearLine(0);      // clears the line
        readLineInstance.commit();          // displays the changes (call this method rather than passing autoCommit:true in the constructor)
          
    }
    catch(e){ // whenever we abort a question, an error is thrown, so we need to handle that

    }
  
};

socket.once('connect', askIP);


socket.on('data', (data) => {       // When 'data' event occurs, the eventlistener gets the data as argument.
  
    if(controller.currentController){
       
        controller.currentController.abort();   // abort the current question


        readLineInstance.moveCursor(0, -1);
        readLineInstance.clearLine(0);
        readLineInstance.commit();

    }

    console.log(data.toString('utf-8'));    // display the received message
    
    askIP();            // ask the user for input
});


socket.once('end', () => {       // When client receives a FIN packet from server (as a response to its FIN packet), 'end' event occurs. After that 'close' event takes place finally. 
    socket.destroy();
    console.log('Connection was ended!');
});


/* 
    Always remember: A socket supports duplex connection i.e. we can send and receive message simultaneously on each end.

    Workflow:
    --------
    1. Create a socket and connect it to the server using createConnection() method.

    2. Once, the socket connects to the server, call askIP() 

    3. If the server writes some data to this socket , 'data' event occurs.

    4. Finally, call the end() method, close all the connections.




    Recommended way to close the client:
    ------------------------------------
    
    1. Call the end() method on the client.

       Now, client can't write to the socket and the server can't read from it. It is done by sending a FIN packet to the server, which triggers 'end' event in the client-socket at server side. 
       Generally the writable part of the socket (at the server-side) will also be closed automatically.

        Now,the server will send back a FIN packet, which triggers 'end' event on the socket at client side. Thereby, the connection will be closed. 
     
     Read more about it https://nodejs.org/docs/latest/api/net.html#socketenddata-encoding-callback and https://nodejs.org/docs/latest/api/net.html#netcreateserveroptions-connectionlistener

    2. Now, we can call the destroy() method on the socket.


    # When we create a client, our operating system allocates a port (one of the dynamic ports) to the client. 
*/