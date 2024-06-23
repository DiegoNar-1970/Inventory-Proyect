//Middleware for if not found a enpoind 
export const notFound =((req,response,next)=>{
    response.status(404).end()
});
