const fs = require("fs")

const logger = (req, res, next) => {
  let now = new Date()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${JSON.stringify(req.body)}`
  console.log(data)
  fs.appendFile("server.log", data + "\n", function () {})
  next()
}

module.exports = logger
