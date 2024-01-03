import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= new mongoose.Schema(
    {
        videoFile:{
            type:String,//coludinary video url
            required:true
        },
        thumnail:{
            type:String,
            required:true
            
        },
        title:{
            type:String,
            required:true
            
        },
        description:{
            type:String,//cloudinary image url
            required:true
            
        },
        duration:{
            type:Number,
            required:true
            
        },
        views:{
            type:Number,
            default:0
            
            
        },
        isPublished:{
            type:Boolean
            
            
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            
        }
        
    },
    {
        timestamps:true
    }
);

export const Video=mongoose.model("Video",videoSchema)