const express=require('express'); //require('express')() erokom likhle porer line e invoke korar dorkar porena i.e. ek line ei call and invoke ei duto kaj hoye jay
const app= express();




app.get('/',(req,res)=>{
    res.status(200).send("This is home page") //status method diye status code ta define kore deoa hoy
})
app.get('/about',(req,res)=>{
    res.status(200).send("This is about page")
})
app.all('*',(req,res)=>{ //Eta sobar last e dite hobe otherwise ja request asbe sob kichur jonno eta trigger hoye jabe
    res.status(404).send("<h1>Content Not Found</h1>")
})
app.listen(80,()=>{
    console.log("Server is listening on port 80");
})
