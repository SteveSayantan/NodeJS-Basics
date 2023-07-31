const app= require('express')();
const logger= require('./testFiles/loggerForMiddleware');
const authorize= require('./testFiles/authorizeForMiddleware');


app.use([logger,authorize]); //Multiple middleware function use korar jonno array te likhte hoy. Order onujayee execute hobe.. prothome logger, tarpor authorize, order change korle notun order onujayee hobe.


app.get('/',(req,res)=>{
    res.send('Home Page');
    })
app.get('/about',(req,res)=>{
    res.send('About Page');
    })

    /*
    app.get('/api',[logger,authorize],(req,res)=>{  //ekta particular route e multiple middleware add korte chaile evabe array te dhokate hobe
    
      res.send('Api Page');
    })
    
  */  
    
    app.get('/api/products',(req,res)=>{
    console.log(req.user);    //authorize middleware ta diye je user add korechilam request object e, seta evabe access kora jay
    res.send('Products Page');
    })
    
    app.get('/api/items',(req,res)=>{
    res.send('Items Page');
    })
    
    app.listen(80,()=>{
        console.log('Server is listening to port 80...');
    })

/*---------------------
   Types of Middleware 
---------------------*/

/* 
  our own / express / third party

  Example: express --> express.static  (static files share korte use kora hoy,etao basically ekta middleware)
        third party --> morgan
 */