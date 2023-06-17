const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoute")
const cors = require("cors")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use("/user" , userRouter)

app.listen(PORT, async(req,res) => {
         try {
          await connection
          console.log("you are connected to db")  
         } catch (error) {
            console.log(error)
         }
         console.log("server running at", PORT)
})