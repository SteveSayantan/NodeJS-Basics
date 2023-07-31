/* 
    Here, we are going to create a transform stream which will encrypt our data and also learn how to implement custom 
    Transform stream.

    1. Encryption/ Decryption: Encrypting a data means creating something that nobody can decypher unless they run it through Decryption app and get original data. Ex-> Crypto
    
    2. Compression/ Decompression: It refers to reduce the number of bits in a file and vice-versa. Ex-> zLib

    3. Hashing : We can not retrieve the original data after hashing it . A hashed password can only be validated if the given password generates same hashed data. Ex-> Crypto

    4. Encoding/ Decoding: Encoding means converting data into some other form i.e. image, video, pdf, string etc, with the help of corresponding encoder. Node supports buffers and text encoding-decoding.
         It does not support video, image encoding by default.

    In all of the cases above we are dealing with binary data.

    Just for reference:
    -------------------

    52 is stored in memory as <Buffer 34> (base 16)
    '52' is stored in memory as <Buffer 35 32> (utf-8 encoding)
*/

const {Transform} = require('node:stream');
const fs= require('fs/promises')

class Encrypt extends Transform{
    // constructor,_write, _read,_destroy all of these are already inherited from Duplex class in Transform class. Therefore, no need to implement them.


    // We must implement _transform method
    _transform(chunk, encoding, callback){      // The chunk is received from another read stream and stored in the writable buffer of this transform stream

       for (let i = 0; i < chunk.length; i++) {
        //modifying each each byte in a  chunk
        
            if(chunk[i]!=255){  // Now a byte can store upto 255, so we must not exceed the range.
                chunk[i]++;
            }
        
        }
        this.push(chunk);          // pushing the chunk to the readable portion
        callback();                 // we must call this callback 
    }

}

async function encrypter(){
    
    const readFileHandle= await fs.open('../test_src.txt','r');
    const writeFileHandle= await fs.open('./encrypted.txt','w');


    const readStream= readFileHandle.createReadStream()
    const writeStream= writeFileHandle.createWriteStream()
    const newTransform= new Encrypt()

    readStream.pipe(newTransform).pipe(writeStream);
    
    readStream.on('end', ()=>{
        console.log("Closing readStream");
        readFileHandle.close();
    })
    writeStream.on('finish', ()=>{
        console.log("Closing writeStream");
        writeFileHandle.close();
    })
}

encrypter();

