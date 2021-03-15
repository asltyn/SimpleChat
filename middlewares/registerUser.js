const User = require("../models/User.js")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {
  const { login, password } = req.body

  //Check if username available
  try {
    const usernameExist = await User.findOne({ username: login })
    if (usernameExist) {
      return res.send({ answer: "Username already used" })
    }
  } catch (err) {
    console.log("find user error")
    return res.send(err)
  }

  //Generate hash password
  const createHash = async (password) => {
    try {
      const salt = await bcrypt.genSalt()
      return await bcrypt.hash(password, salt)
    } catch (err) {
      return null
    }
  }
  const hashPassword = await createHash(password)
  if (!hashPassword) return res.send({ answer: "Server error. Try again" })

  //Create new User
  const user = new User({
    username: login,
    hashPassword,
    contacts: [],
  })

  //Add user to DB
  try {
    const savedUser = await user.save()
    console.log(savedUser)
    return res.send({ answer: `You have been successfully registered as ${login}` })
  } catch (e) {
    return res.send(e)
  }
}

module.exports = registerUser
