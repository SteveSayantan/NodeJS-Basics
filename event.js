const eventEmiiter= require('events');  // This events file has nothing to do with eventloop. It is written in JS. It helps using events in user-friendly, easy to read manner.

// Node.js is event-driven, i.e. we issue commands to the computer and wait to respond back to them in an asynchoronous manner i.e. without blocking the application.

const customEmitter= new eventEmiiter(); //Eivabe ekta notun event object banate hobe


//Prothome kono event listen korate hobe "on" method diye, tarpor sei event ta "emit" kora jabe.

customEmitter.on('scream',(name)=>{                 //je kono nijer iccha moto event listen korano jay, otherwise valid event er nam use korte hobe
    console.log("There is some data",name)
})

customEmitter.on('scream',(name,role,age)=>{        //same event er jonno multiple times listen korano jay. Emit korar somoy pass kora argument gulo ke callback er moddhe use kora jay
    console.log("There is some other data",role,age);
})

customEmitter.emit('scream','Steve','Developer',22); //scream event ta emit korlam, ebar scream event er jonno je kaj hoar kotha chilo seta hobe. Event er nam lekhar por eivabe jota khusi argument pass korano jay.
customEmitter.emit('scream','Sweetu','Officer',18)   // We can emit an event multiple times too. Every time ** all the callbacks associated with that particular event** will be executed.

customEmitter.once('onlyOnce', (random)=>{           // We can create event using once() method also. But we can use that event only once.
    console.log("This is going to run once");
})

customEmitter.emit('onlyOnce')      // It is going to run only for the first time.
customEmitter.emit('onlyOnce')
customEmitter.emit('onlyOnce')


/* 
How Does it work
----------------

    1. When we run Object.on(eventName,cbfunc), we attach the callback function to a master object. 

    2. Now, every time we emit that event, all the callbacks associated with that event are going to be executed.

    3. However, in case of once() method, the callback is removed from the master object after the first execution. Therefore, it can not be called after that.
    
*/




/*---------------------------
Creating a Server using Event
-----------------------------*/

/*
const http= require('http');

const server= http.createServer(); //In this case, we shall not pass any callback inside this. 

server.on('request',(req,res)=>{ //From the docs, we can find that server listens to request event. server is connected to the eventemitter class, so we can use the 'on' method.
    res.end('Hello')
})

server.listen(80)

 */