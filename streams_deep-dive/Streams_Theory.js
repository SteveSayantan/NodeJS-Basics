/* 
    Writable Steam
    ----------------
    It is basically an object we get from fs.createWriteStream(). It has an internal buffer of size 16384 Bytes (by default).

    Now, we keep pushing chunks of data (from another buffer) to the internal buffer. The internal buffer keeps delivering all this data to the OS which performs a write to the destination.
    
    As a result, most of the write take place in the node.js process. Therefore, the no of writes to the file or resource (which is more costly than writing to a node process ) is reduced significantly.

    Now, if we keep writing to the internal buffer even if it is full or try to push some huge data into it,

        - node will keep buffering (store in memory) that extra data until our writing is finished. This causes a spike in memory usage.

        - Now, the internal buffer will empty itself (perform write) and that buffered data (in memory) is pushed again to the internal buffer.

    This makes our stream inefficient.

    Therefore, we should always wait for a stream (fully-loaded) to empty itself , before pushing more to it. When the stream is completely empty, 'drain' event takes place.
*/

/* 
    Readable Stream
    ---------------
    It is quite similar to writable stream. It has one internal buffer similar to Writable stream, that has a default size of 65,536 Bytes (64 KB) 

    It is used to read data from a huge file and we get data in chunks.

    Once its internal buffer is filled with data (from the source), we get an even called 'data'. Then we can pull the data out from it for other purposes.


*/

/* 
    Duplex Stream
    ---------------
    It is made of a readable and a writable stream . It inherits both from Writable and Readable class.

    It has two internal buffers , a readable and a writable one and they both work independently. 

    E.g., we can read data from one file with the readable stream and write something else to another file using the writable one, i.e. they do not have to be inter-related.


*/

/* 
    Transform Stream
    ---------------
    Using a Duplex stream, we can read data using the readable stream and write that data in the writable stream and get the data out from the writable stream.

    If the data is modified while passing between the readable and the writable internal buffer, it is called a transform stream.

    If the data is not modified at all, just passed from the readable to the writable internal buffer, it is called a passthrough stream (another type of transform stream)

    Transform stream inherits from Duplex stream.


*/

// So, if we want to write a huge amount of data from a source to another destination, we need to create a readable stream (so that we get data in chunks) and then write to the writable stream.

// Duplex and Transform streams both have two internal buffers one for reading , another for writing.

/* 
    There are two ways how we can use streams:
    
    1. Streams that are already written in some node.js module (e.g. fs,http etc.) aka API for stream consumers

    2. Implement our own stream with API for stream implementer

*/