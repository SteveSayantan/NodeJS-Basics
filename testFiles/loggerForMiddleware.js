//To make maintain the cleanliness of our main file, we have decided to move this middleware to a separate file.

const logger= function(req,res,next){
    const method=req.method;
    const url= req.url;
    const time=new Date().getFullYear();
    console.log(method,url,time);
    next();
}

module.exports=logger;