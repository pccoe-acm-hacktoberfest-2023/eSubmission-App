const express = require("express");
const bypass = require("../middleware/bypass");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../model/Student");
const router = express.Router();

require("dotenv").config()

router.get("/",bypass,async(req,res)=>{
    res.send("Auth");
})

router.post("/create",bypass,async(req,res)=>{
    let success = 0;
    try {
        let studentExist = await Student.findOne({ email: req.body.email });
        // console.log(studentExist);
        if (studentExist) {
          return res.status(400).json({ success,message: "Email already in use!" });
        }
  
        // // Check Username Exits or not
        // studentExist = await Student.findOne({ username: req.body.username });
        // // console.log(studentExist);
        // if (studentExist) {
        //   return res.status(400).json({ success,message: "Username already in use!" });
        // }
  
        //creating user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
  
        let user = await Student.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

        console.log(user);
        success = 1;
        message = "Account created successfully!"
        res.status(200).json({ success ,message});
      } catch (error) {
        //error if occurred
        console.log(error);
        res.status(500).json({ success, message: "Error Occurred" });
      }
})


router.post("/login",bypass,async(req,res)=>{
    const { email, password } = req.body;
    let success = 0;
    try {
      // Check if User Exists
      let student = await Student.findOne({ email });
      if (!student) {
        //if student not exists return
        return res
          .status(400)
          .json({ success ,message: "Please Login with correct Credentials" });
      }

      //Comparing password
      let passwordMatches = await bcrypt.compare(password, student.password);

      //if password doesnt matches
      if (!passwordMatches) {
       
        return res
          .status(400)
          .json({ success, message: "Please Login with correct Credentials" });
      }

      // aFTER SUCCESSFULL LOGIN
      let data = {
        id: student.id,
      };

      JWT_SECRET = process.env.SECRET_KEY;

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = 1;
      res.status(200).json({ success,authtoken });
    } catch (error) {
      res.status(500).json(error);
    }
})

module.exports = router;
