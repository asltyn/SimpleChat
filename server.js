const express = require("express")
const mongoose = require("mongoose")
const logger = require("./middlewares/logger.js")
const registerUser = require("./middlewares/registerUser.js")
const validateUser = require("./middlewares/validateUser.js")
const timeout = require("./middlewares/timeout.js")
const authUser = require("./middlewares/authUser.js")

mongoose.connect("mongodb://localhost/simpleChatDB", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connect to DB"))

const app = express()

app.use(express.json())
app.use(logger)

//
let x

app.use("/", express.static(__dirname + "/dist"))

app.post("/auth", timeout, validateUser, authUser)

app.post("/register", timeout, validateUser, registerUser)

app.get("/messageChannel", (req, resp) => {
  console.log(req.header, req.body)
  resp.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  })
  resp.write("data: 1")
  resp.write("data: 2")
  x = resp
  //resp.end()
})

const server = app.listen(3000, () => console.log("Server has been started ..."))
