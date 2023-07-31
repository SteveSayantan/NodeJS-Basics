const express= require('express');
const app= express();
const peopleRouter= require('./Routes/peopleAfterController'); //require korlam peopleAfterController.js file ta
const loginRouter= require('./Routes/loginAfterController'); //require korlam loginAfterController.js file ta

app.use(express.static('./Post_Method'));
app.use(express.json()) ; 
app.use(express.urlencoded({extended:false})) ;

app.use('/api/people',peopleRouter) //String er moddhe jeta likhlam ota base route hisebe use korbe people.js file ta, otar pore kichu add hoye onno route gulo toiri hoyeche
app.use('/api/login',loginRouter); //Ei route tar jonno /api/login ta base route hisebe kaj korbe



app.listen(80,()=>{
    console.log('The Server is listening on port 80 ...')
})

/*
 1. Router implement korar age route gulo ke group kore nilam. /api/login er jonno ekta file hobe, /api/people diye je je route gulo ache sesob gulor jonno ekta alada file hobe.
 2. Sei file gulo sob thakbe router folder er moddhe.
 3. Router implement korar age file ta kemon chilo seta dekhte hole checkout serverForPost.js
 4.
 */