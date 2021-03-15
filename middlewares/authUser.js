const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const authUser = async (req, res, next) => {
  const { login, password } = req.body

  const comparePassword = async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      return null
    }
  }

  //find user
  try {
    const userFromDB = await User.findOne({ username: login })
    console.log(userFromDB)
    if (!userFromDB) return res.send({ answer: "Username is not found" })
    const isPasswordValid = await comparePassword(password, userFromDB.hashPassword)
    if (!isPasswordValid) return res.send({ answer: "Password is not valid" })
    const token = jwt.sign({ id: userFromDB._id }, "secretKey", { expiresIn: "1h" })
    console.log(token)
    res.header("auth-token", token).send({ answer: "You are logged in" })
  } catch (err) {
    return res.send(err)
  }
}

module.exports = authUser
