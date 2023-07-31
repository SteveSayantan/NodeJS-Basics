/*---------------------------
        Query String
-----------------------------*/
//It is used to send small amount of info with the url to the server. This info is used to filter results etc.

const express=require('express');
const app= express();
const {products}= require('./testFiles/data');

app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h2><a href='/api/products'>Our Products</a>")
})

app.get('/api/v1/foo',(req,res)=>{ //url e foo er pore ? diye ja ja likhbo seta key value pair hisebe req.query obj er moddhe store hobe

console.log(req.query); //{ name: 'steve', role: 'developer' } for req.url /api/v1/kelane?name=steve&role=developer 

res.send('Hello World');
})

app.get('/api/v1/anything',(req,res)=>{
    const{search,limit}=req.query;
    let sortedProd=[...products];

    if(search){
        sortedProd=sortedProd.filter((ele)=>{
            return ele.name.startsWith(search)
        })
    }
    if(limit){
        sortedProd=sortedProd.slice(0,Number(limit)) //0 theke n-1 obdi search korbe
    }
    if(sortedProd.length<1) return res.status(404).send('No Products matched'); //return na dile porer res.json tao execute hoye jabe,but same req er jonno porpor dubar response pathano jayna
    res.status(200).json(sortedProd);
})

app.listen(80,()=>{
    console.log('Server is listening on port 80');
})