const dgram = require('node:dgram');

const client = dgram.createSocket('udp4');



// As we haven't used bind() for this socket, it is assigned a random port number and tries to listen to all addresses (on the assigned port) associated with our machine



client.send("Hello There", 3523, 'localhost', (err) => {  // this cb is called when the message has been sent.
    //If an error occurs while **sending** the error will be passed as the first argument to the callback
    if(err) console.log(err.message);   // Note that, it does not care if the segment has reached or not
    client.close();
});
