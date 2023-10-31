const mongoose =  require("mongoose")
require('dotenv').config()


const MONGOURI = process.env.MONGOURI
const connectToMongo = () =>{
    mongoose.connect(MONGOURI,{}).then(()=>{
        console.log("Connected !!");
        
    }).catch(err => console.log(err))
}

module.exports = connectToMongo