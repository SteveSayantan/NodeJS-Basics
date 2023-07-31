const express= require('express');
const router =express.Router();
//Ekhane data.js er data lagchena tai import korar kono dorkar o nei

//POST Through Traditional Form
router.post('/',(req,res)=>{  // karon /api/login ta base route hisebe kaj korche, as per serverForPostw_router.js . Tai ekhetre resultant path /api/people
    const {name}=req.body;
    // console.log(name);
    if(!name) return res.status(401).send('Please Provide Credentials');
    res.status(200).send(`Welcome ${name}`);
})

module.exports= router;