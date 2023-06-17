const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    password:String
})

const UserModal = mongoose.model("quiz" , userSchema)
module.exports = {
  UserModal
}