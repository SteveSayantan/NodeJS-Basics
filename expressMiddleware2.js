const app= require('express')();
const logger= require('./testFiles/loggerForMiddleware');

//To use the middleware for any route w/o manually adding it to each route
// app.use(logger); //it is to be added at the top of the file, before any route. Any route before this line cannot use the middleware as line by line execution takes place in express.

app.use('/api',logger) //Eivabe path mention kore dile sei base path er por ja ja route thakbe segulor jonno only middleware ta kaj korbe. Path mention na korle je kono route er jonno kaj korbe
/*



//This works only for urls like '/api','api/products','api/products/review' etc. But not for '/','/about' etc.

*/

app.get('/',(req,res)=>{
res.send('Home Page');
})
app.get('/about',(req,res)=>{
res.send('About Page');
})

app.get('/api',(req,res)=>{
res.send('Api Page');
})

app.get('/api/products',(req,res)=>{
res.send('Products Page');
})

app.get('/api/items',(req,res)=>{
res.send('Items Page');
})

app.listen(80,()=>{
    console.log('Server is listening to port 80...');
})