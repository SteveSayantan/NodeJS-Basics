const express= require('express');
const router =express.Router();
const loginFunc=require('../controller/loginw_Controller')
//Ekhane data.js er data lagchena tai import korar kono dorkar o nei

//POST Through Traditional Form
router.post('/',loginFunc)

/* 
//Route ta lekhar onno method
    
    router.route('/').post(loginFunc)
 
 */

module.exports= router;