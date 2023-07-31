// Refer to the docs for any doubt

const fs= require('fs/promises'); // Another approach to use asynchronous file system methods (e.g. readFile, writeFile) that return promises.


const CREATE_FILE = "create a file";
const DELETE_FILE = "delete the file";
const RENAME_FILE = "rename the file";
const ADD_TO_FILE = "add to the file";
const EXIT = "exit";

(async function (){
    try {
        const ac = new AbortController();
        const { signal } = ac;          // These are for stopping the watcher (copied from docs)

        const watcher= fs.watch('./text.txt',{signal}) ;      // watch() method returns an asyncGenerator obj. It can take a directory path also to watch the whole directory (e.g. write ' ./ ' to watch for current directory) ).
        const fileHandler= await fs.open('./text.txt',"r")  // This is how we open a file, open() method returns a file descriptor
    
        const createFile=async (path)=>{
            try {
                //Checking if file already exists
                let checkForExisting= await fs.open(path,"r");
                checkForExisting.close();
                return console.log("File Already Exists");
            } catch (error) {
                // We do not have that file, create it
                const newFileHandle= await fs.open(path,"w")
                newFileHandle.close();
            }
        };

        const deleteFile=async (path)=>{
            try {    
                await fs.unlink(path);      // usage of rm() is not recommened as they are way too powerful.
                console.log("The file was successfully removed.");
            } catch (e) {
                if (e.code === "ENOENT") {      // If the path does not exist, it returns an error (Print it to see!!)
                console.log("No file at this path to remove.");
                } else {
                console.log("An error occurred while removing the file: ");
                console.log(e);
                }
            }
        }

        const renameFile = async (oldPath, newPath) => {
            try {
            await fs.rename(oldPath, newPath);
            console.log("The file was successfully renamed.");
            } catch (e) {
            if (e.code === "ENOENT") {
                console.log(
                "No file at this path to rename, or the destination doesn't exist."
                );
            } else {
                console.log("An error occurred while removing the file: ");
                console.log(e);
            }
            }
        };

        const addToFile= async (path,content)=>{
            try {
            await fs.appendFile(path, content);
            } catch (error) {
            console.log(error);
            }
        }

        fileHandler.on('change',async()=>{  // As filehandle object is a event-emitter, we can do this 

            try {
                // Now, we want to read the content of our file.
                // Get the size of the file to create buffer of same size
                const size= (await fileHandler.stat()).size;
                const buff= Buffer.alloc(size)
                // The location at which we want to start filling our buffer
                const offset=0;
                // how many bytes we want to read
                const length=buff.byteLength;
                // the position that we want to start reading the file from
                const position=0;

                // We always want to read the whole content (from beginning all the way to the end )
                await fileHandler.read(buff,offset,length,position);           //We must specify the position to always start reading from 0th character. Otherwise, it will read only the modified part after the first read operation.

                // Now data is stored in buffer
                const command= buff.toString('utf-8')

                // creating a file
                if(command.includes(CREATE_FILE)){
                    const ipPath= command.slice(CREATE_FILE.length+1);
                    createFile(ipPath);
                }

                // deleting a file
                else if(command.includes(DELETE_FILE)){
                    const ipPath= command.slice(DELETE_FILE.length+1);
                    console.log(ipPath);
                    deleteFile(ipPath);
                }

                else if(command.includes(RENAME_FILE)){
                    const _idx = command.indexOf(" to ");
                    const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
                    const newFilePath = command.substring(_idx + 4);

                    renameFile(oldFilePath, newFilePath);
                }

                else if(command.includes(ADD_TO_FILE)){
                    const _idx = command.indexOf(" this content: ");
                    const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
                    const content = command.substring(_idx + 15);

                    addToFile(filePath, content);
                }
                else if(command.includes(EXIT)){

                    await fileHandler.close()       // closing the file handler
                    ac.abort();                     // calling the abort method to stop the watcher, this will cause the watcher to throw an error
                }
                else{
                    console.log("Invalid Command, Try Again!!");
                }
            } catch (error) {
                console.log("Something Went Wrong");
            }
                        
        })

        for await(let event of watcher){       // looping over the values returned by asyncGenerator obj. This is taken from docs. We could have used an infinite while loop too.
            if(event.eventType==='change'){    //the file was changed
                // console.log("The file was changed");
                fileHandler.emit('change')
                
            }
        
        }
    } 
    catch (error) {
        if (error.name === 'AbortError')    // The error thrown by the watcher is handled here (taken from docs)
            return;
        console.log(error);
    }
    
   
})()

/* 
    To perform read or write operation on a file, first, we need to open it.
    After that we can read or write to the file. When we are done, we must close that file.

    Now, when we open a file, we do not move all its content to our program. Instead, we get an unique ID assigned to that opened file, aka file descriptor.
    With the file descriptor, we can access or modify the content of the file or do some other tasks.

*/



