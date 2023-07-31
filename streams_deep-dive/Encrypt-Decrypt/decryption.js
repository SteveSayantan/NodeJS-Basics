/* 
    Here, we are going to create another transform stream which will decrypt our data
*/

const {Transform} = require('node:stream');
const fs= require('fs/promises')

class Decrypt extends Transform{
   

    // We must implement _transform method
    _transform(chunk, encoding, callback){      

        for (let i = 0; i < chunk.length; i++) {
            //reverting each each byte to its previous state 
    
                if(chunk[i]!=255){  
                    chunk[i]--;
                }
            
            }
        this.push(chunk);          // pushing the chunk to the readable portion

        callback();
    }

}

async function decrypter(){
    
    const readFileHandle= await fs.open('encrypted.txt','r');
    const writeFileHandle= await fs.open('decrypted.txt','w');


    const readStream= readFileHandle.createReadStream();
    const writeStream= writeFileHandle.createWriteStream();

    const newTransform= new Decrypt()

    readStream.pipe(newTransform).pipe(writeStream);

    let bytesRead=0;
    const {size}= await readFileHandle.stat();

    newTransform.on('data', (chunk)=>{
        bytesRead+=chunk.length;
        let progress= parseInt(bytesRead*100/size);
                   
        console.log(`Decrypting file...${progress}%`);
        
    })
    readStream.on('end', ()=>{
        console.log("Closing readStream");
        readFileHandle.close();
    })

    writeStream.on('finish', ()=>{
        console.log("Closing writeStream");
        writeFileHandle.close();
    })
}

decrypter();

