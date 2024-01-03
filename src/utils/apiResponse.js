class ApiResponse{
    constructor(statusCode,success,data,message="sucess"){
        this.success=success
        this.data=data
        this.message=message
        this.statusCode=statusCode<400
    }
}
export default ApiResponse;