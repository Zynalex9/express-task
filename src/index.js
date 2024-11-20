import connectDB from "./db/index.js"
import { app } from "./app.js"
connectDB()
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})