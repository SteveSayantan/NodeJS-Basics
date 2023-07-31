//People.js theke prottek ta method er callback function gulo alada kore ekhane niye asa hobe


const {people}= require('../../testFiles/data'); //data.js er data ta use hoyeche tai file ta require korte holo


const getPeople =(req,res)=>{ //get method er callback ta
    res.status(200).json(people); 
}

const postPeople=(req,res)=>{ //post method er callback ta
    const {name}=req.body;
    // console.log(req.body);
    if(!name) return res.status(400).json({success:false,msg:"Invalid Input"});
    res.status(201).json({success:true,person:name});
}

const putPeople=(req,res)=>{ // put method er callback ta
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

}
const deletePeople=(req,res)=>{ // delete method er callback ta

    const newPeople= people.find(function(ele){
        return ele.id==Number(req.params.ID);
    })
    if(!newPeople) return res.status(404).json({success:false,msg:`No person with id ${req.params.ID} exists`});
    
    const updatedArr=people.filter(function(ele){
        return ele.id!=Number(req.params.ID);
    })
    
        res.status(200).json({success:true,data:updatedArr});
    }

    module.exports={ //export kore dilam sob gulo jate onno file e use korte pari
        getPeople,postPeople,putPeople,deletePeople
    }