const authorize= function(req,res,next){
    console.log(req.query);
    const {user}=req.query;
    if(user=='steve'){
        req.user={name:'steve',id:Math.ceil(Math.random()*10)} //user nam e ekta property add korlam req object er moddhe. Eta onno jayga theke access kora jabe
        next();
    }
    else{
        res.status(401).send('Unauthorized'); //ekhane res.send diye terminate kore dicchi bole next method ta call korte holo na
    }
}
module.exports=authorize;