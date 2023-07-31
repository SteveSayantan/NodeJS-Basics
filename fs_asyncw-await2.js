// Er age,amra ekta wrapper function likhe sekhan theke promise return koracchilam, but sei kaj ta easily kora jay du vabe: 

const {readFile} = require("fs");

const {promisify} = require("util");    // It is an in-built module.
const readFilePromise= promisify(readFile); //readFile method ta ebar promise return korbe, etai promisify method tar magic. writeFile er jonno o kora jeto same vabe.

const {writeFile} = require("fs").promises; //util module er promisify method er bodole etao use kora jay, akhn writeFile method ta promise return korbe. readFile er jonno o kora jeto same vabe


async function fileManager(){ 
    try
     {
     const first= await readFilePromise("testFiles/hello.txt","utf-8"); //readFilePromise e callback lagbena ar, but baki argument gulo lagbe
     const second= await readFilePromise("testFiles/dele.txt","utf-8");
     await writeFile("./swee2.txt",`Sweets are awesome:${first}&${second}`)
     console.log(first,second)
 }
 catch(error){
     console.log(error);
 }
 }

 fileManager();