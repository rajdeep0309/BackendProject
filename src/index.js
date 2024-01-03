// require('dotenv').config({ path: './.env' });
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';
import {app} from './app.js';


dotenv.config({path:'./.env'})


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error("ERROR:",error);
        throw error;
    })
    app.listen(process.env.PORT||4000,()=>{ 
    console.log("Connected to DB");
    console.log(`Listening on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error: MongoDB connection failed",error);
})














// first approach
/*
import expres from 'express';
const app=express();
// Eppie's code
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.error("ERROR:",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Listening on port ${process.env.PORT}`);
        })
         
    
    } catch (error) {
        console.error(error);
        throw error;
    }
})()
*/