import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import ApiResponse from '../utils/apiResponse.js';
const registerUser=asyncHandler(async (req,res)=>{
    
    //get user information from frontend

    const {fullname,email,password,username}=req.body;
    
    console.log(`Fullname: ${fullname} email:${email} username: ${username}`);


    //validate user information
    if(
        [username,email,password].some((field)=>field?.trim()==="")    
    ){
        throw new ApiError(400,"Please fill all the fields");
    }
    const existedUSer=await User.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(existedUSer){
        throw new ApiError(409,"User already existed");
    }


    //handle image upload
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImgLocalPath=req.files?.coverImg[0]?.path;
    console.log(`avatarLocalPath: ${avatarLocalPath} coverImgLocalPath: ${coverImgLocalPath}`);

    if(!avatarLocalPath||!coverImgLocalPath){
        throw new ApiError(400,"Please upload avatar and cover image");
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImg=await uploadOnCloudinary(coverImgLocalPath)
    // console.log(
    //     `avatar: ${avatar} coverImg: ${coverImg}`
    // );
    if(!avatar||!coverImg){
        console.log("Image upload failed");
        throw new ApiError(500,"Image upload failed");
    }

    const user=await User.create({
        fullname,
        email,
        password,
        coverImg:coverImg.url,
        avatar:avatar.url,
        username
    })
    //check the user is created or not
    // console.log("User:",user);
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
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