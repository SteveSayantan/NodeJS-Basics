/* 
    http is a protocol used mainly to access data on the World Wide Web. 

    In TCP layer, we used to send raw data. But, in http, there is a specific format we need to follow for sending requests
    and receiving responses.

    In Node, http module is built on top of the TCP module. Hence, there will be many similarities in the workflow while using http module.

    http version 1 & 2 are built on top of TCP.
    http version 3 is built on top of UDP.

    The client has to request for a resource first, only then the server can send a response. It can't be the other way around.

    We use websocket protocol to build chat-apps where clients can send messages to other clients, which is not possible in http.

    Read MDN docs on HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP

    --------------------------------

    HTTP is just a layer on top of TCP. In TCP, we sent raw data segments which didn't have any specific structure. But in HTTP, to interact
    successfully, we must maintain the format of an HTTP message. So, we can definitely say, HTTP internally works like TCP but it requires messages
    in HTTP format.

    Now, an HTTP message can be converted into human readable string if it is decoded using utf-8. Hence, it is not safe.
*/

const http= require('node:http');   // node:http means http is a native to Node.js, we don't need to install something else to use it

const server= http.createServer(); // this creates a http server (similar to what we did using net module)

// since server inherits from net.server, it can listen to events
server.on('request', (req,res)=>{ // req is a readable stream, res is a writable stream   

    console.log("---------METHOD----------")
    console.log(req.method)

    console.log("---------URL----------")
    console.log(req.url)

    console.log("---------HEADERS----------")
    console.log(req.headers)

    // req can optionally have a body, we can access that data (in chunks) on 'data' event. As a result, body can contain huge amount of data w/o affecting the performance
    // of our app

    console.log("---------BODY----------")
    req.on('data', (data)=>{
        console.log(data.toString());
    })

    req.on('close', ()=>{   // when the request is completed, 'close' event is emitted

        const body={success: true};
        // writeHead() is used to set headers to the response. This method should be called before end(). We can also use setHeader() method.
        res.writeHead(200,{
            'content-type':'application/json',

            // As we don't set the <'content-length': JSON.stringify(body).length > header explicitly, the response will contain the header < 'transfer-encoding':'chunked'> 
        })

        res.end(JSON.stringify(body))  // This signals that all of the response headers and body have been sent  
    })

})

server.listen(8000,'localhost',()=>{
    console.log("Server is listening on http://localhost:8000");
})


// we can close the server using close() method, but here we close it manually .

/* 

    Once our client has received response from server, we can either keep the connection for future requests or kill it. It is defined by the value of
    one of the General Headers i.e. connection

    e.g., 
    {
        ...,
        connection: 'keep-alive' (or, close) , ---->  keep-alive indicates the connection has to be kept, close indicates the connection is killed after receiving a response and another connection is established for next request.
        'keep-alive': 'timeout=8',      ----> data must be exchanged at least once every 8 sec
        max=800,    -----> maximum 800 connections are allowed
        ...
    }

*/


