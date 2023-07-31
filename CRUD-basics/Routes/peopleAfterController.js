const express= require('express');
const router =express.Router(); //eivabe router ta call kora hoy
const{ getPeople,postPeople,putPeople,deletePeople}=require('../controller/peoplew_Controller')

/* 

/api/people ta base path lekha ache serverForPostw_router.js e, tai otar sapekkhe ei route gulo likhte hobe( only extra part tuku)

*/

//Sending JSON Data
router.get('/',getPeople)

//POST Through JavaScript
router.post('/',postPeople)


//PUT Through PostMan

router.put('/:ID',putPeople)

//DELETE Through PostMan

router.delete('/:ID',deletePeople)

/* //Route gulo lekhar onno method
    
    router.route('/').get(getPeople).post(postPeople)
    router.route('/:ID').put(putPeople).delete(deletePeople)

 
 */

module.exports= router; //last e evabe router ta export kore dite hobe