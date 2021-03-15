const joi = require("@hapi/joi")

const validate = (req, res, next) => {
  const schema = joi.object({
    login: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().alphanum().min(3).max(30).required(),
  })
  const { login, password } = req.body
  console.log(login, password)
  const { error } = schema.validate({ login, password })
  if (error) {
    //conosle.log("validation error")
    console.log(error)
    return res.send({ answer: error.details[0].message })
  }
  next()
}

module.exports = validate
