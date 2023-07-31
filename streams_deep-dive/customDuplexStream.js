//    Here we are going to implement our own readable stream. This is just for experimental purpose. 

//    This is nothing but a combination of customReadableStream.js and customWritableStream.js

const {Duplex} = require ('node:stream')    // First we need to import the Duplex class from basic stream class
const fs= require('node:fs')

class customDuplex extends Duplex{
    constructor({readFileName,writeFileName,readableHighWaterMark,writableHighWaterMark}){

        super({readableHighWaterMark,writableHighWaterMark});       // We must pass these two values in the constructor

        this.readFileName= readFileName;
        this.writeFileName= writeFileName;
        this.readFd=null;
        this.writeFd=null;
        this.chunks=[];
        this.chunkSize=0;

    }

    _construct(callback){

        fs.open(this.readFileName, "r", (err, readFd) => {
            // for reading
            if (err) return callback(err);
            this.readFd = readFd;
            // for writing
            fs.open(this.writeFileName, "w", (err, writeFd) => {
              if (err) return callback(err);
              this.writeFd = writeFd;

              callback();                     
            });
        });

        // callback(); !!!!            // In this case, it will be called before the files are opened as fs.open is asynchronous and result in errors
    }

    _write(chunk, encoding, callback){  
        // Here,we do our operations
        this.chunks.push(chunk);        
        this.chunkSize+=chunk.length;

        if(this.chunkSize>=this.writableHighWaterMark){ 
            // Write this data to the file first and then call the cb
            fs.write(this.writeFd, Buffer.concat(this.chunks), (err)=>{
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
        
    }

    _read(size){              

        const Buff= Buffer.alloc(size);
        fs.read(this.readFd, Buff, 0, size, null, (err,bytesRead)=>{
            if(err){
                this.destroy(err);          // For any error, we have to call this.destroy(), because we don't have a callback fn in _read
            }
            else{
                this.push(bytesRead>0?Buff.subarray(0,bytesRead):null);        
            }
        })
    }

    _final(callback){          

        fs.write(this.writeFd, Buffer.concat(this.chunks), (err)=>{  // If some data is still left in the chunks array, that will be written to the file now 
            if(err){
                callback(err)
                return;
            }
            this.chunks = [];
            callback()
        })
    }

    _destroy(err, callback) {           // This is similar to _destroy used to implement our custom writable stream
        callback(err);
    }

}


const newStream= new customDuplex({readFileName:'test_src.txt',writeFileName:'test_dest.txt',readableHighWaterMark:10000,writableHighWaterMark:5000});
newStream.write("Hello This is from Duplex Stream");
newStream.write("It is raining outside");
newStream.end("Bye Bye");

function getFirstTwoChunks(){
    let chunksRead=0;
    newStream.on('data', (chunk)=>{
        if(chunksRead==2){
            newStream.pause();
            return;
        }
        console.log(chunk.toString('utf8'));
        chunksRead++;      
    })
}
getFirstTwoChunks();
