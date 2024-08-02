// Reference: https://youtu.be/e5E8HHEYRNI , and Node Docs 

/* 
    If we want to write data to a file for multiple times (say 10000000), we may take two different approaches:

        1. Going the synchronous way, i.e. perfrom write operations sequentially. It will block the event loop and our app will become unresponsive.
            like this,
                    // Execution Time: 8s
                    // CPU Usage: 100% (one core)
                    // Memory Usage: 50MB

                    (async () => {
                        console.time("writeMany");
                        const fileHandle = await fs.open("test.txt", "w");

                        for (let i = 0; i < 1000000; i++) {
                        await fileHandle.write(` ${i} `);
                        }
                        console.timeEnd("writeMany");
                    })();

        2. Taking the asynchronous road, with the help of callback api version.
            like this,
                    // Execution Time: 1.8s
                    // CPU Usage: 100% (one core)
                    // Memory Usage: 50MB

                    (async () => {
                      console.time("writeMany");
                      fs.open("test.txt", "w", (err, fd) => {
                        for (let i = 0; i < 1000000; i++) {     // we could have done this w/o creating a buffer also.
                          const buff = Buffer.from(` ${i} `, "utf-8");
                          fs.writeSync(fd, buff);               // If we use the cb version of write, the numbers will not be in order because the cb functions pushed into the event loop do not execute sequentially.
                        }
                        console.timeEnd("writeMany");
                      });
                    })();   

    Now, with the help of streams we can get our job done in fraction of a second. 



    AN UGLY WAY TO WORK WITH STREAMS!! (As we keep writing to the stream, even if it gets full)
    -------------------------------
    // Execution Time: 270ms
    // CPU Usage: 100% (one core)
    // Memory Usage: 200MB  (Too Much!!)

    (async () => {
    console.time("writeMany");
    const fileHandle = await fs.open("test.txt", "w");

    const stream = fileHandle.createWriteStream();

    for (let i = 0; i < 1000000; i++) {
        const buff = Buffer.from(` ${i} `, "utf-8");

        stream.write(buff);
    }
    console.timeEnd("writeMany");
  })();
  
*/

/* 
  Stream Best Practices
  ---------------------
*/

const fs= require('fs/promises')

  async function writeStream(){
    const fileHandle = await fs.open("test_src.txt", "w");

    const stream = fileHandle.createWriteStream();

    // console.log(stream.writableLength);          // returns the total number of bytes currently present inside internal buffer (used memory in bytes)
    // console.log(stream.writableHighWaterMark);   // returns the total size of internal buffer

    const buff= Buffer.alloc(16384,63)                  // Creating a buffer of size same as internal buffer size, filled with 63
    // console.log(buff)                                // <Buffer 3F 3F ....>

    const isFull= stream.write(buff);               // It writes the content of buffer to the internal buffer of stream and returns true if the internal buffer has more space available. Otherwise it returns false 
    // console.log(isFull);

    // when we call stream.write(), the data , from the internal buffer of stream, is delivered to the OS. The internal buffer of the stream may or may not be completely filled.


    // We have written 16384 bytes to the internal buffer of the stream, hence it is full now

    // Once the internal buffer of stream is full, further writes must be stopped until it is totally emptied. 'drain' event occurs when the internal buffer is completely empty.
    
    // If the internal buffer is not entirely full, data is delivered to the OS, but 'drain' event is not fired when the buffer is emptied.

    stream.on('drain',()=>{         // This callback is called when the internal buffer is completely empty
      console.log('We are now safe to write more')

      // Now we can write again
      const buff2= Buffer.alloc(1,36)       //At this point, Don't  try fill the internal buffer entirely, otherwise that will cause infinite loop as drain event will be called again and again
      stream.write(buff2);
    })

    // We should always let the internal buffer empty itself when it is full (the value of writableLength should never exceed writableHighWaterMark) 

    // We shall see `?` in the test.txt as 63 when decoded in utf-8 (occurs before writing to the file) gives `?`

  }

  /* 
    --------------------------------------------------
      Solution for performing multiple writes to a file
      using Strems
    ------------------------------------------------
  */
  
  const WriteMany= async () => {
    let i=0, limit=100000;
    try {
        console.time("writeMany");
        const fileHandle = await fs.open("test_src.txt", "w");
        const stream = fileHandle.createWriteStream();

        const writer=function(){
          while ( i < limit) {

            if(!stream.write(Buffer.from(`${i} `))){
              i++;
              break;
            }
            if(i==limit-1) stream.end();     //  method signals that no more data will be written to the Writable Stream, and this method emits 'finish' event
            i++;
          }
        }
        writer();

        stream.on('drain',()=>{
          console.count("Drain");
          writer();
        })
        
        stream.on('finish',()=>{
          console.timeEnd("writeMany");
          fileHandle.close();           // closing the file handler

        })
    } catch (error) {
      console.log(error)
    }
    
  }
  WriteMany();                // File size/ internal buffer size = 6888890/16384 = 420 (Approx.) ---> No of drains

  
 

  

    




