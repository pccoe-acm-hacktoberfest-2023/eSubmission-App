const mongoose = require("mongoose")

const studentSchema =  mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    
    password : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        default : false
    },
    date_created :{
        type : Date,
        default :Date.now
    },


});

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;