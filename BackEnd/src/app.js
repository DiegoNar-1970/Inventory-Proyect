import express, { json } from 'express'

const app= express();
app.use(json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})
  