class ApiResponse{
    constructor(statusCode,success,data,message="sucess"){
        this.statusCode=statusCode<400
        this.success=success
        this.data=data
        this.message=message
        console.log(this.message) 
    }
    
}
export default ApiResponse;