const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  hashPassword: String,
  contacts: [String],
})

module.exports = mongoose.model("User", userSchema)
