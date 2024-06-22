export default app.use((req,response,next)=>{
    response.status(404).end()
});
