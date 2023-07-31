const express= require('express');
const router =express.Router(); //eivabe router ta call kora hoy
const {people}= require('../../testFiles/data'); //data.js er data ta use hoyeche tai file ta require korte holo


/* 

/api/people ta base path lekha ache serverForPostw_router.js e, tai otar sapekkhe ei route gulo likhte hobe( only extra part tuku)

*/

//Sending JSON Data
router.get('/',(req,res)=>{ //router ta app er jaygay likhte hoy evabe karon o e handle korbe sob
    res.status(200).json(people); 
})

//POST Through JavaScript
router.post('/',(req,res)=>{ // resultant path /api/people
    const {name}=req.body;
    // console.log(req.body);
    if(!name) return res.status(400).json({success:false,msg:"Invalid Input"});
    res.status(201).json({success:true,person:name});
})


//PUT Through PostMan

router.put('/:ID',(req,res)=>{ // resultant path /api/people/:ID
    const {ID}= req.params;
    const {name}= req.body; 

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

router.delete('/:ID',(req,res)=>{ // resultant path /api/people/:ID

const newPeople= people.find(function(ele){
    return ele.id==Number(req.params.ID);
})
if(!newPeople) return res.status(404).json({success:false,msg:`No person with id ${req.params.ID} exists`});

const updatedArr=people.filter(function(ele){
    return ele.id!=Number(req.params.ID);
})

    res.status(200).json({success:true,data:updatedArr});
})

module.exports= router; //last e evabe router ta export kore dite hobe