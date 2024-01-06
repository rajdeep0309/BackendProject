import {v2 as cloudinary} from 'cloudinary';
// import dotenv from 'dotenv';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'})
 import fs from 'fs';



//  console.log(process.env.CLOUDINARY_API_KEY);
//  console.log(`process.env.PORT : ${process.env.PORT}`);
//  console.log(process.env.CLOUDINARY_CLOUD_NAME);
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET ,

});
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return;
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
    console.log(`File uploaded successfully:: ${response.url}`);
    fs.unlinkSync(localFilePath);
    return response;
    }
    catch(err) {
        fs.unlinkSync(localFilePath);
        console.log(err);
        return null;
    }
}
// export {uploadOnCloudinary};