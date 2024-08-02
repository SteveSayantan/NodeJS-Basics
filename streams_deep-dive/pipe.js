const fs= require('fs/promises');
const { pipeline } = require('node:stream'); // All the streams we create from fs module, inherit from node:streams module        

/* 
    ---------------
    Read and Write (w/o stream)
    --------------
*/

/* 
    File Size Copied: 1 GB
    Memory Usage: 1 GB          // the memory usage is very high (equal to the size of the file) , therefore it is not recommended
    Execution Time: 900 ms
    Maximum File Size Able to Copy: 2 GB        // readFile() is suitable for copying files within 2GB, otherwise it may give error (if the file is too big to fit in the returned buffer)

    

    async function readWrite(){
        try {
            console.time("copy");
            const data= await fs.readFile("test_src.txt");     // Returns a Promise that fulfills with a buffer with the contents of the file (asynchronous)   
            await fs.writeFile('test_dest.txt', data);
            console.timeEnd("copy");
        } catch (error) {
            console.log(error);
        }
    }
*/

// Better Approach (Similar to our stream approach)
// File Size Copied: 1 GB
// Memory Usage: 30 MB
// Execution Time: 2 s
// Maximum File Size Able to Copy: No Limit

async function readWrite_v2(){
    try {
        console.time("copy");
        const srcHandler= await fs.open("test_src.txt",'r');     // Returns a Promise that fulfills with a buffer with the contents of the file (asynchronous)   
        const destHandler= await fs.open("test_dest.txt",'w');

        let byteSize=-1;

        while (byteSize!=0) {                               // keep going until bytes read is 0
            
            let data= await srcHandler.read()            // This method reads data from file and stores in a buffer (default size 16384 bytes) i.e. we get 16KB of data if it is executed once. 
            // console.log(data.bytesRead);                 // the number of bytes read
            // console.log(data.buffer)                     // the buffer containing data
            byteSize= data.bytesRead;                       //it is zero, when end-of-file is reached

            if(byteSize<16384){     // It is only possible when there is no data to read i.e. the file has ended
                
                // when the file has ended, the buffer will read 0. We have to spot the first index of 0 in the buffer
                // All the characters in the file has unicode value > 0, so if we get 0 in the buffer, definitely it is the end-of-file

                const indexOfNotFilled= data.buffer.indexOf(0)

                // The first index of 0 tells us the amount of useful bytes present before it
                const newBuffer= Buffer.alloc(indexOfNotFilled)          //e.g. if the index is 0, then we have two useful bytes at index i.e. 0 and 1
                data.buffer.copy(newBuffer,0,0,indexOfNotFilled)          // Now copy the useful bytes and write to the destination
                await destHandler.write(newBuffer);
                break;
            }
            else{                           // in this case we can write directly
                await destHandler.write(data.buffer);
            }
        }
        console.timeEnd("copy");

        await srcHandler.close();
        await destHandler.close();
    } catch (error) {
        console.log(error);
    }
}


/* 
    --------------
    Using Pipe
    -------------
*/
async function readWrite_v3(){
    try {
        console.time("copy");
        const srcHandler= await fs.open("test_src.txt",'r');     // Returns a Promise that fulfills with a buffer with the contents of the file (asynchronous)   
        const destHandler= await fs.open("test_dest.txt",'w');


        const readerStream= srcHandler.createReadStream()
        const writerStream= destHandler.createWriteStream()
        // Now instead of doing all hardwork of pausing ,resuming, listening to data events etc. , we can use Pipe.

        // Pipe will automatically read from source (in chunks) and write to the destination, handle all these back pressuring, draining, resuming, pausing 

        readerStream.pipe(writerStream)     // The destination must be a writable stream (can also use duplex or transform) and the source must be a readable one

        // readerStream.pipe(Duplex/Transform_Stream).pipe(Another_Duplex/Transform_Stream).pipe(Another_Duplex/Transform/Writable_Stream)       // we can chain this pipe method, only if the intermediate streams are transform/duplex


        // readerStream.unpipe(writerStream)            //This is how we can unpipe to detach the writable stream. We can again attach it using pipe method, and it will resume from where it was paused


        // we can also listen to pipe and unpipe event on the writestream, checkout https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#event-pipe


        readerStream.on('end', ()=>{     //While piping, when the Readable stream emits 'end', stream.end() is called on the writable stream by default   
            console.timeEnd("copy");

            // therfore, now we can close the file handlers
            srcHandler.close();
            destHandler.close();
        })

    } catch (error) {
        console.log(error);
    }
}

/* 
    Pipeline()
    -----------
    Pipe is not recommended for production as we have to manually close the writestreams if an error happens.
    Instead, we can use pipeline() method, it will handle errors itself and close the streams if an error occurs, refer to https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#streampipelinestreams-callback
*/

async function readWrite_pipeline(){
    try {
        console.time("copy");
        const srcHandler= await fs.open("test_src.txt",'r');     // Returns a Promise that fulfills with a buffer with the contents of the file (asynchronous)   
        const destHandler= await fs.open("test_dest.txt",'w');


        const readerStream= srcHandler.createReadStream()
        const writerStream= destHandler.createWriteStream()
        

        pipeline(readerStream, writerStream,(err)=>{    //Called when the pipeline is fully done

            if(err){
                console.log('Error happened',err);
            }
            else{
                console.log('Success');
                console.timeEnd("copy");
            }
            srcHandler.close();
            destHandler.close();

        })
        // pipeline(readstream,duplex/transform_stream,duplex/transform/writable_stream,callbackfn)        // we can chain streams like this only if the intermediate streams are duplex/transform
    } catch (error) {
        console.log(error);
    }
}
 readWrite_pipeline();
