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
let x
app.use(express.json())
app.use("/", express.static(__dirname + "/public"))

const users = [
  { login: "aaa", password: "sss" },
  { login: "bbb", password: "nnn" },
]

const auth = (req, res, next) => {
  const { login, password } = req.body
  res.auth = users.some((u) => u.login === login && u.password === password)
  next()
}

const register = (req, res, next) => {
  const { login, password } = req.body
  const isLoginFree = users.every((u) => u.login !== login)
  if (isLoginFree) {
    users.push({ login, password })
  }
  res.reg = isLoginFree
  next()
}

app.post("/auth", auth, (req, resp) => {
  setTimeout(() => resp.send(JSON.stringify({ answer: resp.auth })), 1000)
  console.log(users)
})

app.post("/register", register, (req, resp) => {
  setTimeout(() => resp.send(JSON.stringify({ answer: resp.reg })), 1000)
})

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

app.listen(3000)
