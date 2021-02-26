const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())

//server log
app.use(function (req, resp, next) {
  let now = new Date()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${JSON.stringify(req.body)}`
  console.log(data)
  fs.appendFile("server.log", data + "\n", function () {})
  next()
})

//
app.use(express.json())
app.use("/chat", express.static(__dirname + "/public"))

app.post("/chat", (req, resp) => {
  resp.send("ok")
})

app.listen(3000)
