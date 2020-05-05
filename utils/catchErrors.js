function catchErrors(error, displayError){
 let errorMsg;
 if(error.response){
     //the request was made and the server responded with a status not in the range 200s
     errorMsg = error.response.data;
     
     if(error.response.data.error){
    //  for cloudinary image uploads
     errorMsg = error.response.data.error.message;
 }  
 }else if(error.request){
     // The request was made, but no response was recieved 
     errorMsg = error.request;
 } else{
    //  somthing else happend during the request that cuased the error
    errorMsg = error.message;
 }
 displayError(errorMsg);
}
export default catchErrors;