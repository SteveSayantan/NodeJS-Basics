/* 
 Character Set:
 --------------

    It is basically the set of letters and symbols used by a writing system, with different numbers assigned to each character.
    Two of the most commonly used character sets are: Unicode and ASCII

    Unicode: It is a standard for representing and encoding characters in most of the writing systems worldwide. It defines 144,697 characters.
             E.g. 's' gets assigned number 115.

    ASCII: It stands for American Standard Code for Information Interchange. It defines only 128 characters only. 
           Since it's just a subset of Unicode, it's characters have the same number as Unicode ('s' is assigned 115)

Character Encoding:
-------------------

    It is a system of assigning a sequence of bits to a character.
    Most commonly used is 'utf-8', defined by Unicode Standard. Therefore, 'utf-8' uses the binary equivalent(8-bit or 1 byte) of the numbers assigned to each character in Unicode system.

    E.g. 's' is encoded in 'utf-8' as 0111 0011 (i.e. 8-bit binary equivalent of 115)
    Needless to say, ASCII characters have the same encoded value as the corresponding Unicode Characters.

    NodeJS only understands character decoder and encoders, not image, video or any other type of decoder and encoders
*/

/* 
Buffers :
--------
    Buffer is a container in memory and it is fixed in size (expressed in bytes)
    It receives raw binary data and sends it to somewhere else. We can also perform some processing on the data after extracting it from buffer.

    As JS sucks in dealing with binary data and nodeJS as a server-side language has to handle files,network requests that are nothing but binary data, we have Buffers.

*/

const {Buffer}= require('node:buffer')  // 'Buffer' class is available globally, therefore we can directly use 'Buffer' without importing (though not recommended) it like this.

const buff= Buffer.alloc(10)    // With alloc() method, we allocate memory(in bytes) to our buffer. Here, allocating 10 bytes. We can not resize it later.

// console.log(buff)           // <Buffer 00 00 00 00 00 00 00 00 00 00> Each digit is represented in Hexadecimal. Therefore two digits make 1byte and we have 10 of those, total 10 bytes.

buff.write('sweetu','utf-8')    // write() method is used to write encoded data in buffer. We have to specify the encoding too (if omitted, it defaults to 'utf-8')
// <Buffer 73 77 65 65 74 75 00 00 00 00>       // 73 is 's', 77 is 'w' (in hex)


// If we try to write more than the alloted space, it will ignore the extra characters

buff.toJSON()       // This method returns the buffer in JSON format that contains the unicode value of each character (in decimal)

buff.length        // Returns the size of the buffer (reserved+used) in bytes
buff.byteLength    // Returns the size of the buffer (used) in bytes

buff[3]   // Returns the unicode value of the character at index 3 (in decimal)

const buff2= Buffer.from("random",'utf-8')   // This creates a buffer with given data, memory is allocated accordingly. We can run the above methods on this as well.

const buff3= Buffer.from([115,116,114])         // It creates a buffer using integers (within 0-255) provided in this array. We can provide hex values as well  

// buff3.toString('encoding_name')                // decodes the buffer according to specified encoding (must)



// To know about hex encoding (which is binary-to-text encoding, not character encoding) and its terminologies read https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#buffers-and-character-encodings

const buff4=Buffer.from("737765657475",'hex');     // <Buffer 73 77 65 65 74 75> Creates a buffer from the given valid hex string, we must use 'hex', otherwise, it will be encoded in 'utf-8'
buff4.toString('utf-8');                           // Now this will return the characters, decoded from the buffer using utf-8. If 'hex' is used, it returns the initial hex string






