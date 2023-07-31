const express= require('express');
const app= express();
const {products}= require('./testFiles/data.js');

app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h2><a href='/api/products'>Our Products</a>")
})

app.get('/api/products',(req,res)=>{
   const newProducts=products.map((ele)=>{
    const{id,name,image}=ele;
    return{id,name,image};
   })
    res.json(newProducts);
})
app.listen(80,()=>{
    console.log('The server is listening on port 80');
})