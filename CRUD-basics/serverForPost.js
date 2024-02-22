const express= require('express');
const app= express();
const path= require('path');
const {people}= require('../testFiles/data')


app.use(express.static('./CRUD-basics/Post_Method'));
app.use(express.json()) //incoming http request theke json data parse kore req.body te dhokay. req.body object er moddhe parsed data ta key-value pair hisebe thakbe 
app.use(express.urlencoded({extended:false})) //form theke incoming urlencoded data ta parse kore req.body te dhokabe, extended flag ta false thakle queryString Library diye parse korabe

//POST Through Traditional Form
app.post('/api/login',(req,res)=>{ 
    const {name}=req.body;
    // console.log(name);
    if(!name) return res.status(401).send('Please Provide Credentials');
    res.status(200).send(`<h2>Welcome ${name}</h2><p><a href="/">Return to home</a>`);
})

//Sending JSON Data
app.get('/api/people',(req,res)=>{ 
    res.status(200).json(people);
})


//POST Through JavaScript
app.post('/api/people',(req,res)=>{ 
    const {name}=req.body;
    // console.log(req.body);
    if(!name) return res.status(400).json({success:false,msg:"Invalid Input"});
    res.status(201).json({success:true,person:name});
})

//PUT Through PostMan
//1. Put request is used to update an existing data

app.put('/api/people/:ID',(req,res)=>{ //:ID route param ta diye amra je specific data ta chai setake target korbo
    const {ID}= req.params;
    const {name}= req.body; //Eta notun data, jeta purono data ke replace korbe, eta user e pathabe

    console.log(ID,name);
    const newPeople= people.find(function(ele){
        return ele.id==Number(ID);
    })
    if(!newPeople) return res.status(404).json({success:false,msg:`No person with id ${ID} exists`});
    const updatedArr=people.map(function(ele){
        if(ele.id==Number(ID)) ele.name=name;
        return ele;
    })
    res.status(200).json({success:true,data:updatedArr});

})

//DELETE Through PostMan
//1. Delete request is used to delete an existing data

app.delete('/api/people/:ID',(req,res)=>{ //:ID route param ta diye amra je specific data ta delete korte chaichi seta target korbo

//jehetu delete req, tai user kono data provide korbena

const newPeople= people.find(function(ele){
    return ele.id==Number(req.params.ID);
})
if(!newPeople) return res.status(404).json({success:false,msg:`No person with id ${req.params.ID} exists`});

const updatedArr=people.filter(function(ele){
    return ele.id!=Number(req.params.ID);
})

    res.status(200).json({success:true,data:updatedArr});
})


app.listen(80,()=>{
    console.log('The Server is listening on port 80 ...')
})