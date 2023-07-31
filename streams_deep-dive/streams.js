/*---------------------------
Streams and its types
---------------------------*/

/* 
    Data Stream refers to continuous flow of data over time in different small chunks. It makes Node faster.
    Instead of sending or receiving all the data at once, we send or receive small chunks of data over a period of time.
*/  

// In node, Stream is an abstract interface used to read and write data sequentially. Streams extends eventEmitter class. Generally, we use built-in streams in modules. Streams are used to handle streaming data or big files. There are four types of stream:

/*

1. Writable - Used to write data to a destination (for example, fs.createWriteStream())
2. Readable - Used to read data from a source  (for example, fs.createReadStream()).
3. Duplex - Used to both read and write data sequentially
4. Transform - Used to modify data while reading or writing sequentially

Example and use cases of different types of stream https://youtu.be/e5E8HHEYRNI?t=46m45s

    **** For any doubt, refer to the docs before thinking twice. ****
*/

