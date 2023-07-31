const path= require("path");

path.sep //returns platform specific separator

const js = path.join("../JAVASCRIPT","Notes_Lelo","engine.js")  //joins path segments using platform specific separator

const base= path.basename(js); //returns the base file from given path, engine.js in this case

const absolute= path.resolve(__dirname,'folder',"dele.txt"); //The given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed. Returns D:\WebDesign Bootcamp\Node Tutorials\folder\dele.txt

const js2= path.resolve('/dir','tele.txt') //D:\dir\tele.txt

console.log(__dirname)

//Checkout https://nodejs.org/dist/latest-v16.x/docs/api/path.html for further clarification