import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import ApiResponse from '../utils/apiResponse.js';
const registerUser=asyncHandler(async (req,res)=>{
    
    //get user information from frontend

    const {fullName,email,password}=req.body;
    console.log("Email:",email);


    //validate user information
    if(
        [fullName,email,password].some((field)=>field?.trim()==="")    
    ){
        throw new ApiError(400,"Please fill all the fields");
    }
    const existedUSer=User.findOne({
        $or:[
            {userName},
            {email}
        ]
    })
    if(existedUSer){
        throw new ApiError(409,"User already existed");
    }


    //handle image upload
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImgLocalPath=req.files?.coverImg[0]?.path;

    if(!avatarLocalPath||!coverImgLocalPath){
        throw new ApiError(400,"Please upload avatar and cover image");
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImg=await uploadOnCloudinary(coverImgLocalPath)

    if(!avatar||!coverImg){
        throw new ApiError(500,"Image upload failed");
    }

    const user=await user.create({
        fullName,
        email,
        password,
        avatar:avatar.url,
        coverImg:coverImg.url
    })
    //check the user is created or not
    const createdUser=await user.findById(user._id).select(
        "-password -refreshToken "
    );
    if(!createdUser){
        throw new ApiError(500,"User registration failed");
    }
    //send the response to frontend
    return res.status(201).json(new ApiResponse(201,true,createdUser,"User registered successfully"));



})
    // if(fullName==null||email==null||password==null){
    //     // res.status(400 );
    //     throw new ApiError(400,"Please fill all the fields");


    // }



export {registerUser}