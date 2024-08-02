const http= require('node:http');

// First, we need to set up an agent
const agent= new http.Agent({keepAlive:true})   // An agent manages the connections, requests and reuses HTTP clients if required.  

//Now, we start setting up a request. For each request sent by the client, we need to follow this step.

let request= http.request(    // request() method returns http.ClientRequest object, which is basically a stream
    {   agent,
        host:'localhost',port:8000,method:'POST',
        path:'/create-post',
        headers:{
            'Content-Type':'application/json',
             greet:'hello'      // we can also specify some custom headers like this
            
        },
        
    })

// When the server sends some response, 'response' event is emitted. But it is emitted only once.

request.once('response', (resp)=>{  //  resp is a readable stream; In resp, we do not get properties e.g., method, url like req.

    console.log("---------STATUS----------")
    console.log(resp.statusCode)

    console.log("---------HEADERS----------")
    console.log(resp.headers)

    console.log("---------BODY----------")
    resp.on('data',(chunk)=>{
        console.log(chunk.toString())
    })

    // when the response is completed, 'close' event is emitted
    resp.on('close', ()=>{   
        // agent.destroy();    // shuts the agent; Instead, we can also reuse it, as shown below.
    })
})

// As we are making a POST request, we must send some data with the request (in chunks). If not required, we can directly call end(). 

request.write(JSON.stringify({message:'Hi There'}))
request.end(JSON.stringify({message:'How are you doin?'}))  //  end() finishes sending the request


// Remember, if after sending a request, the server doesn't send back a response but we try to close the connection by destroying the socket, the http.ClientRequest object
//  (i.e. 'request') emits an error. Read more at https://stackoverflow.com/questions/16995184/nodejs-what-does-socket-hang-up-actually-mean#_=_

// To handle that, we attach an error event-listener to request. But here, it doesn't happen as we close the connection only after receiving the response.

request.on('error', ()=>{
    console.log("error occurred");
})


/* 
---------------------------------------------------
    Reusing the same Agent to send another request
---------------------------------------------------
*/


/* 
    
    In the previous request, we wrote the body in chunks, hence Node automatically inserted the header, <"transfer-encoding": "chunked"> to the request. This prevents the
    other party to calculate the total size of the payload before receving it entirely.

    Instead of this, we can also use < 'content-length': size_in_bytes > header that only allows amt. data of mentioned size for sending.

    But for each message of any type ( request or response ), we can have only one of the two headers mentioned above. 

*/

request= http.request({     // we are setting up a new request 
    agent,      // using the previous agent    
    host:'localhost',port:8000,method:'POST',
    path:'/create-post',
    headers:{
        'Content-Type':'application/json',
        'content-length': 18        // Only 18 bytes data will be sent; not more, not less
    },
})

request.write('This part is sent , this part is not sent'); 
request.end();

request.once('response', (resp)=>{

    console.log('response received');

    resp.once('close', ()=>{
        agent.destroy();
        console.log("agent destroyed")
    })
})


