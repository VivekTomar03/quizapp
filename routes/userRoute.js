const express = require("express")
const bcrypt = require('bcrypt')
const { UserModal } = require("../modal/userModal")
var jwt = require('jsonwebtoken')
const userRouter = express.Router()

userRouter.post("/add" , async(req,res) => {
    const {email,password} = req.body
    try {
       
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err) {
            res.send("not hash")
           }
           else {
            const data = new UserModal({email,password:hash})
            await data.save()
            res.send({
                msg:"user created "
            })
           }
        })
    } catch (error) {
        res.send({
            msg:"something wrong"
        })
    }
})

userRouter.post("/login" , async(req,res) => {
    const {email, password} = req.body
    try {
        const user = await UserModal.findOne({email})
        if(user){
            var token = jwt.sign({owner:user.email, userID:user._id }, 'quiz');
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    res.send({
                        msg:"user login",
                           token
                    })
                }
            })
        }
        else {
        res.send("user not found")
        }
    } catch (error) {
        res.send({
            msg:"something wrong"
        })
    }
})

module.exports= {
    userRouter
}