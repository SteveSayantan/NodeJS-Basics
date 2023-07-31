
//    Here we are going to implement our own readable stream. This is just for experimental purpose.

const {Readable}=require('node:stream')             // First we need to import the Readable class from basic stream class
const fs= require('node:fs')

class customReadable extends Readable{

    constructor({fileName}){                    // This is similar to the constructor used to implement our custom writable stream
        super();
        this.fileName=fileName;
    }

    _construct(callback){                       // This is similar to _construct used to implement our custom writable stream
        fs.open(this.fileName, "r", (err,fd)=>{
            if(err){
                callback(err)
                return;
            }
            
            this.fd=fd;
            callback()
            
        })
    }

    _read(size){                 // method to fetch data from the underlying resource

        /* 
            When _read is called, data is pushed into the read queue using this.push() method. Calling this.push() will emit 'data' event.
            _read will be called again after calling this.push()

            If we push null, it signals End-Of-File and emits 'end' event.

            In case of implementing readable stream, unlike the custom writable stream, we do not have to worry about the internal buffer size,
            we can simply push data and it will be available for the consumers.
        */
        const Buff= Buffer.alloc(size);
        fs.read(this.fd, Buff, 0, size, null, (err,bytesRead)=>{
            if(err){
                this.destroy(err);          // For any error, we have to call this.destroy(), because we don't have a callback fn in _read
            }
            else{
                /* 
                    We have to push null in this way, because after every call to this.push, _read is called.
                    So it is not possible to push null on a separate line after this.push()
                 */
                this.push(bytesRead>0?Buff.subarray(0,bytesRead):null);        
            }
        })
    }

    _destroy(err, callback) {           // This is similar to _destroy used to implement our custom writable stream
        if (this.fd) {
          fs.close(this.fd, (er) => callback(er || err));
        } else {
          callback(err);
        }
    }
}

const newStream= new customReadable({fileName:'test_src.txt'});

// Quite similar to our custom writable stream, never call _read or _construct directly . Use the methods used with regular streams.

newStream.on('data', (chunk)=>{
    console.log(chunk.toString('utf8'));
})

newStream.on('end',()=>{
    console.log('Stream ended');
})