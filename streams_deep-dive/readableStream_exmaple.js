const fs= require('fs/promises');
const { finished } = require('node:stream');        // we have to import finished method directly from this module, it is an utility function

/* 
   -------------
    Reading a File
   --------------
*/
const fileReader= async ()=>{
    try {
        const fileHandleRead= await fs.open('test_src.txt','r');

        // First we have to create the stream
        const stream = fileHandleRead.createReadStream({highWaterMark:64*1024});        // This is how we can change the size of the internal buffer of a read stream. The default is 64*1024

        // Now, add a 'data' event handler
        stream.on('data',(chunk)=>{     
            console.log('----')
            console.log(chunk)          // It is basically returns a buffer that contains a chunk of data read from the source
        })

        stream.on('end', ()=>{          // When the reading is completed, the readstream emits 'end' event
            console.log("Process Finished");
            fileHandleRead.close();
        })

        
    } catch (error) {
        console.log(error)
    }
}


/* 
    A read stream has three different states: https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#three-states

        - When the stream is created, it does not read the file until event handler or pipe is attached (remains in null state)

        - After the adding the event handler or pipe, it starts reading the file (remains in flowing state)

        - we can also pause the read stream or unpipe (remains in paused state)

        
    When we are done reading, the read stream emits 'end' event. 
*/

/* 
    -------------------
    Reading and Writing
    -------------------
*/

// AN UGLY APPROACH. DON'T TRY TO RUN THIS!!!!

    /* 
    async function readWrite_inefficient (){
        const fileHandleRead= await fs.open('test_src.txt','r');
        const fileHandleWrite= await fs.open('test_dest.txt','w');

        const reader= fileHandleRead.createReadStream()
        const writer= fileHandleWrite.createWriteStream()

        reader.on('data', (chunk)=>{
            writer.write(chunk);        // Not waiting for the writestream to empty itself
        })
    }

        Usually, the write speed is slower than the read speed. Therefore, for a fixed size of data, it takes more time to write than to read.

        Now, in the example stated above, we are just writing to the writestream without letting it empty itself. As a result, every time the
        internal buffer of the write stream is full, it keeps buffering the extra data in the main memory and the memory usage reaches the sky.

    */

// A Better Approach

    async function readWrite_efficient (){

        try {

            const fileHandleRead= await fs.open('test_src.txt','r');
            const fileHandleWrite= await fs.open('test_dest.txt','w');

            const reader= fileHandleRead.createReadStream();
            const writer= fileHandleWrite.createWriteStream();

            

            reader.on('data', (chunk)=>{
                if(!writer.write(chunk)){
                    reader.pause();         // This method pauses the readstream
                }       
            })


            writer.on('drain',()=>{
                reader.resume();            // This method resumes the readstream
            })


            // also, attaching error handlers to readstream and writestream
            reader.on('error', (err)=>{
                console.log("Error occured in readstream: "+err.message)
            })

            writer.on('error', (err)=>{
                console.log("Error occured in writestream: "+err.message)
            })

            
            /* 
                Steps to close the resources:
                ----------------------------

                1. When there is no data to read, readstream will emit 'end' event. In that case,

                    a. Destroy the read stream ( Consequently, the read stream emits 'close' event ).

                    b. Try to close the Read File Handler.

                2. Now, listen to the 'close' event emitted by readstream and call end() on writestream ( Consequently, the writestream emits 'finish' event ).

                3. Listen to the 'finish' event emitted by writestream . In that case,

                    a. Destroy the write stream

                    b. Try to close the Write File Handler.

                
            */
            reader.on('end', async ()=>{

                console.log('Destroying the read stream');
                reader.destroy()

                try {
                    await fileHandleRead?.close();
                    console.log("Closed Read File handler");
                    
                } catch (error) {
                    console.log("Error occured while closing Read File handler");
                }
            })
            
            reader.on('close',()=>{
                
                writer.end();  

            })

            writer.on('finish',async ()=>{

                console.log('Destroying the write stream');
                writer.destroy()

                try {
                    await fileHandleWrite?.close();
                    console.log("Closed Write File handler");
                    
                } catch (error) {
                    console.log("Error occured while closing Write File handler");
                }

            })
    
        
        } 
        catch (error) {
            console.log(error);
        }
        
    }

/* 
    Read the whole document and write the even numbers 
    -------------------------------------------------
*/

async function writeEven(){
    try {
        const fileHandleRead= await fs.open('test_src.txt','r');
        const fileHandleWrite= await fs.open('test_dest.txt','w');         

        const reader= fileHandleRead.createReadStream();
        const writer= fileHandleWrite.createWriteStream();

        let container='';
        reader.on('data', (chunk)=>{

            const arr= chunk.toString('utf8').trim().split(' ');    // trimming the entire string to avoid issues with whitespaces

            if(container){                                          // If some data is stored in the container, append it and reset the container
                arr[0]=container+arr[0];
                container='';
            }
           
            if(Number(arr[arr.length-1])-1!==Number(arr[arr.length-2])){    // Check if the last number is present properly, otherwise store it in container
                container= arr.pop();
            }
           
            arr.forEach(num=>{
                if(Number(num)%2==0){
                    if(!writer.write(num+" ")) reader.pause();
                }
            })
                 
        })
        writer.on('drain', ()=>{
            reader.resume();            
        })
        reader.on('end', ()=>{
            console.log('File closed');
            fileHandleRead.close();
        })

        finished(writer,(err)=>{
            fileHandleWrite.close();
        })
    } catch (error) {
        console.log(error);
    }
}

readWrite_efficient();
