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
    res.json(newProducts); //json e convert kore pathabe newProducts ta
})

/*Kono ekta specific product ber korte chaichi, setar jonno route parameter use korbo */

app.get('/api/products/:productID',(req,res)=>{ // : diye route params likhte hoy
  
    console.log(req.params); //{productID:'2'} for the req.url /api/products/2 . i.e. products/ diye jeta likhbo seta productID key er value hoye req.params obj te store hobe.
  
    const {productID}=req.params;
    const singleProduct=products.find((ele)=>{
      return  ele.id==Number(productID);
    })
    if(!singleProduct) return res.status(404).send('Product Does Not Exist'); //return ta dite hobe otherwise if block ta execute hoar poreo next res.send ta execute hoye jabe, ekta req er jonno duto response pathano jayna
    res.json(singleProduct);
})

/*Complex route params */
app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{ // : diye jegulo lekha ache segulo route params hisebe kaj korbe
    
    console.log(req.params); //{ productID: 'abc', reviewID: 'xyz' } for req.url /api/products/abc/reviews/xyz
    
    res.send('Hello World');
})


app.listen(80,()=>{
    console.log('The server is listening on port 80');
})