const avg = require("./customModule.js"); //jodi same folder e file ta thake then ./ diye likhte hbe,baki path lekhar niyom same
//avg er moddhe imported data store kora holo

 
//console.log(avg([3,4])); call kora holo function ta. jokhn module ta sudhu average function ta export kore in that case 
console.log(avg.avg([3,4])); //call kora holo avg object er moddhe thaka function ta

console.log(avg.job); //module ta object export korche tai sei object er moddhe theke jeta dorkar seta print korchi

//Jodi imported module er moddhe kono amon kono function thake jeta already call kora hoyeche inside that module, in that case we can use require and see that code running for the current file without even calling it. Even though that function was not exported explicitly by imported module .
//e.g. Greet function ta customModule theke export kora hoini tao ekhane executed hocche, in fact, jekhanei customModule ke require kora hobe sekhanei executed hobe. For details refer to the Node tutorial by John Smilga 

/*
console.log(avg);
console.log(avg.items);


 */

