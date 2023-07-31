/*---------------------
       Middleware
---------------------*/
//Express middlewares are functions that execute during the req to the server. Each middleware has access to the req, res obj and next() method.

//req ==> middleware ==> res (i.e. it sits between request and response)

const app= require('express')();

function logger(req,res,next){ //eta holo middleware function. It takes 3 parameters : req, res, next(method)
   const method=req.method;
   const url= req.url;
   const time=new Date().getFullYear();
   console.log(method,url,time);

//   res.send("Hello BC"); //middleware use korar por either seta res.send diye terminate korte hobe, or subsequent middleware e pass korte hobe using next method 

   next(); //next method use kora holo karon res.send use korle oi response tai bar bar jabe, onno kichu pathano jabe na.
}


app.get('/',logger,function(req,res){ // <-- This callback fn. is also a middleware function and it has access to req,res and next. However, we are just using the first two.
  res.send('Home Page')
})

app.get('/about',logger,function(req,res){
  res.send('About Page')
})
app.listen(80,function (){
  console.log('Server is listening at port 80');
})