import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
            
        },
        fullname:{
            type:String,
            required:true,
            trim:true
            
        },
        avatar:{
            type:String,//cloudinary image url
            required:true
            
        },
        coverImg:{
            type:String
            
        },
        watchHistory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
            
            
        },
        password:{
            type:String,
            required:[true,"Please provide a password"]
            
            
        },
        refreshToken:{
            type:String
            
        }
        
    },
    {
        timestamps:true
    }
);


//hashing password before saving user
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})
//compare password with hashed password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}



//generate access token    
userSchema.methods.generateAccessToken=function(){
    const payload={
        _id:this._id,
        username:this.username,
        email:this.email
    }
const token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    })
    return token;
}
//generate refresh token
userSchema.methods.generateRefreshToken=function(){
    const payload={
        _id:this._id,
       
    }
const token=jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    })
    return token;
}


//export user model
export const User=mongoose.model("User",userSchema)