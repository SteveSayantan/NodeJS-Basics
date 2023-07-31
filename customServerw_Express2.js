const express=require('express');
const app= express();
const path= require('path');

/*Serving static Files */
app.use(express.static("./public")) //public nam er ekta folder baniye jodi tar moddhe css file,image,js esob rekhe diyi tahole express automatically niye nebe

/*Different request er jonno different response pathano hocche */

app.get('/',(req,res)=>{ 
res.sendFile(path.resolve(__dirname,'./testFiles/boxforserver.html')) //sendFile method er moddhe absolute path dite hobe
})
app.get('/clock',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'./testFiles/index.html'))
})

app.all('*',(req,res)=>{ 
res.status(404).send('<h1>Content Not Found</h1>')
})

app.listen(80,()=>{
    console.log('Server is listening on port 80')
})

/*
As the html file is basically a static asset, we can put it inside public folder too. In that case, there will be no need of both of the app.get methods stated above.

In case of multiple HTML files to be served in public dir,the html files should be interlinked through <a href='something.html'></a> like this and the main html file should be named index.html.
*/
