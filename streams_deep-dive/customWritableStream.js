
//    Here we are going to implement our own writable stream. This is just for experimental purpose.

const { Writable } = require('node:stream');    // First we need to import the Writable class from basic stream class
const fs= require('node:fs');

class customWritable extends Writable{ 

    constructor({fileName}){            
        super();                            // this calls the new stream.Writable() method.
        // super({highWaterMark:1800})      // We can also pass (optional) an object containing some properties, refer to docs for details. 
        
        this.fileName=fileName;
        this.fd=null;
        this.chunks=[];
        this.chunkSize=0;
    }

    _construct(callback){   // This method is called after the constructor is called.
        // None of the methods defined below will execute, until we invoke this callback inside _construct.
        
        fs.open(this.fileName, 'w', (err,fd)=>{
            if(err){
                callback(err)   //passing an argument indicates there was an error and that will be automatically handled by stream
                // Do not use throw error or emit('error') etc.
            }
            else{
                this.fd=fd;
                callback()      // No argument means it was successful
            }
        } )

    }

    // Now there are some specific methods that must be implemented while implementing a stream https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#api-for-stream-implementers 

    _write(chunk, encoding, callback){  // Don't use 'write' instead of '_write' as it will override the existing method
        // Here,we do our operations
        this.chunks.push(chunk);        
        this.chunkSize+=chunk.length;

        if(this.chunkSize>=this.writableHighWaterMark){ 
            // Write this data to the file first and then call the cb
            fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
                if(err){
                    callback(err)
                    return;
                }
                this.chunks=[]
                this.chunkSize=0;
                callback()
            })
        }
        else{
            // there is more space available, so just call the cb
            callback()
        }
        /* 
        when we're done, we should call the callback inside _write. If _write is called again before this cb is finished, the data is buffered.
        Calling this cb, may emit 'drain' event. But we must avoid doing the following to emit an event:  

        // this.emit('drain')  // Never do this!!!

        */

        
    }


    _final(callback){           // this method is will execute only when we call strem.end() method . This will notify node that our work is finished.

        // When this callback inside _final is called, 'finish' event is emitted.

        fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{  // If some data is still left in the chunks array, that will be written to the file now 
            if(err){
                callback(err)
                return;
            }
            this.chunks = [];
            callback()
        })
    }


    _destroy(error, callback){      // This method is called after _final is executed
        
        if (this.fd) {
            fs.close(this.fd, (err) => {
              callback(err || error);
            });
          } else {
            callback(error);    // In case of no error, the 'error' arg will be null
          }
    }
}

const newStream= new customWritable({fileName:'test_dest.txt'});
newStream.write(Buffer.from("Hello Hii"));


/* 
    Here, if the internal buffer is not filled, we are writing when _final is called,
    so it is very important to call stream.end() , as it will invoke  _final  
*/
newStream.end('Bye Bye'); 

newStream.on('finish', ()=>{
    console.log('Stream is finished');
})

/*
 IMPORTANT: None of the methods (_write,_final,_destroy) should be called directly like this:

    newStream._write()      !!!!
    newStream._destroy()    !!!!

This will cause unexpeced errors and compatibility issues. We should only use the methods we use with regular streams. 
*/

