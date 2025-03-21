import jwt from "jsonwebtoken";
import { config } from "../config/auth.config.js"; // Import the JWT config from "../config/auth.config.js"; // Import the JWT configuration
import User from "../models/productModel.js";
import Bcrypt from "bcryptjs";
console.log("JWT Secret Key:", config.secret); // Debugging line

export const hashPassword = function(password){
    //needed for web token authentication
    const saltRounds=10;
    return Bcrypt.hashSync(password, saltRounds)
    } 

    
export const login = function(req,res){
    User.findOne({username:req.body.username}, function(err,user){
    if(err){
    console.log("unspecified error");
    console.log(err);
    res.status(500).send(err);
    }
    //check login details, return token if they are logged in
    if(!user){
    return res.status(401).send({message: "user not found."});
    }
    if(Bcrypt.compareSync(req.body.password, user.password)){
    var token = jwt.sign({id:req.body.username}, config.secret, {expiresIn:86400});
    res.status(200).send({message:"Login successful", accessToken:token})
    }else{
    //if we found a user, but password is invalid, return message.
    return res.status(401).send({message:"Invalid password"});
    }
    });//replaces role_ID with the associated information from the linked role
    }

export const admin = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Admin area reached successfully"
    });
};
