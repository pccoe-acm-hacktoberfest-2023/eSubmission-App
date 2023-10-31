var validator = require("email-validator");

const bypass = (req,res,next)=>{
    console.log(req.body);
    const {email} = req.body;
    if(validator.validate(email)){
        next();
    }else{
        return res.status(500).json({"success":0,"message":"Invalid Email!"});
    }
}

module.exports = bypass