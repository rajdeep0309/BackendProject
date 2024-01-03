const asynHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}

// export default asynHandler;
export {asynHandler}


// const asyncHandler = () => { }
// const asyncHandler = (func) => {  ()=>{} }
// const asyncHandler = (func) => ()=>{ }

// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(err){
//         res.status(err.code||400).json({
//             success:false,
//             message:err.message||"Server Error"
//         })
//     }
// }

