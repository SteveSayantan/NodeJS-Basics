//login.js theke  callback function ta alada kore ekhane niye asa holo ,Ekhane data.js er data lagchena tai import korar kono dorkar o nei



const loginFunc=(req,res)=>{  // login er callback function ta
    const {name}=req.body;
    // console.log(name);
    if(!name) return res.status(401).send('Please Provide Credentials');
    res.status(200).send(`<h2>Welcome ${name}</h2><p><a href="/">Return to home</a>`);
}
module.exports=loginFunc;