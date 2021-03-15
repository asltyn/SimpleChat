import Ring from "./reactComponents/Ring.js"
import ReactDOM from "react-dom"
import React from "react"
import "./style.css"

const sendToServer = async (data, path) => {
  const resp = await fetch(path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
  const text = await resp.json()
  console.log(1)
  console.log(text)
  console.log(2)
  return text.answer
}

const Login = (props) => {
  return (
    <div id="login-block">
      <h1 id="app-name">SimpleChat</h1>
      {props.data.serverWait ? <div className="lds-dual-ring"></div> : <LoginForm {...props}></LoginForm>}
    </div>
  )
}

const LoginForm = (props) => {
  return (
    <div>
      <div className="log">
        <span className="inp-sp">Username:</span>
        <input type="text" className="inp" value={props.data.login} onChange={props.funcs.changeLoginInput}></input>
      </div>
      <div className="log">
        <span className="inp-sp">Password:</span>
        <input type="text" className="inp" value={props.data.password} onChange={props.funcs.changePasswordInput}></input>
      </div>
      <div id="buttons">
        <input className="btn" type="button" value="Enter" onClick={props.funcs.enterHandler}></input>
        <input className="btn" type="button" value="Register" onClick={props.funcs.registerHandler}></input>
      </div>
      <div id="myModal" className="modal" style={{ display: props.data.modal }}>
        <div className="modal-content">
          <span className="close" onClick={props.funcs.closeModalHandler}>
            &times;
          </span>
          <p>{props.data.modalText}</p>
        </div>
      </div>
    </div>
  )
}

const InputBlock = (props) => {
  return (
    <div id="input-block">
      <form id="form">
        <textarea id="input" onChange={props.funcs.changeInputText} value={props.data.inputText}></textarea>
        <input id="button" type="button" value="SEND" onClick={props.funcs.sendMessage}></input>
      </form>
    </div>
  )
}

const ModalFindContact = (props) => {
  return (
    <div>
      <p>Find contact</p>
      <input type="text" className="inp"></input>
      <input type="button" className="btn" value="Find"></input>
    </div>
  )
}

const ModalAddContact = (props) => {
  return (
    <div>
      <p>Contact</p>
      <input type="button" className="btn" value="Add"></input>
    </div>
  )
}

const ContactsBlock = (props) => (
  <div id="contacts-block">
    <div id="contacts">
      <Contacts {...props} />
    </div>
    <div id="add-contact">
      <input id="add-btn" type="button" value="Add contact" onClick={props.funcs.addContactHandler}></input>
    </div>
    <div id="myModal" className="modal" style={{ display: props.data.modalState === "none" ? "none" : "block" }}>
      <div className="modal-content">
        <span className="close" onClick={props.funcs.closeModalHandler}>
          &times;
        </span>
        {
          {
            input: <ModalFindContact {...props} />,
            search: <Ring />,
            find: <ModalAddContact {...props} />,
          }[props.data.modalState]
        }
      </div>
    </div>
  </div>
)

const Contacts = (props) => {
  const { contacts, activeContactId } = props.data
  return contacts.map(({ id, name }, i) => (
    <div
      className={`contact ${id === activeContactId ? "active" : ""}`}
      onClick={() => {
        props.funcs.changeActiveContact(id)
      }}
      key={i}
    >
      <span>{name}</span>
    </div>
  ))
}

const Message = ({ text, pos }) => {
  const divRef = React.useRef(null)
  React.useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" })
  })
  return (
    <div className={`message ${pos}`} ref={divRef}>
      <span>{text}</span>
    </div>
  )
}

const ChatBlock = (props) => {
  const { contacts, activeContactId } = props.data
  const messages = contacts.find(({ id }) => id === activeContactId).messages
  return (
    <div id="chat-block">
      {messages.map(({ text, pos }, i) => (
        <Message key={i} text={text} pos={pos} />
      ))}
    </div>
  )
}

const App = (props) => (
  <div id="container">
    {<ContactsBlock {...props} />}
    {<InputBlock {...props} />}
    {<ChatBlock {...props} />}
  </div>
)

function app() {
  this.pages = {
    chat: () => <App data={this.chatData} funcs={this.chatFuncs} />,
    login: () => <Login data={this.loginData} funcs={this.loginFuncs} />,
  }
  this.loginData = {
    serverWait: false,
    serverResp: "",
    modalText: "",
    login: "",
    password: "",
    modal: "none",
  }
  this.loginFuncs = {
    resetInputs: () => {
      ;(this.loginData.login = ""), (this.loginData.password = "")
    },
    enterHandler: async () => {
      this.loginData.serverWait = true
      this.render()
      this.loginData.serverResp = await sendToServer(this.loginData, "/auth")
      this.loginData.serverWait = false
      if (this.loginData.serverResp) {
        this.currentPage = "chat"
      } else {
        this.loginData.modal = "block"
        this.loginData.modalText = "Username or password is incorrect. Try again."
      }
      this.loginFuncs.resetInputs()
      this.render()
    },
    registerHandler: async () => {
      this.loginData.serverWait = true
      this.render()
      this.loginData.serverResp = await sendToServer(this.loginData, "/register")
      this.loginData.serverWait = false
      this.loginData.modal = "block"
      this.loginData.modalText = this.loginData.serverResp
      this.loginFuncs.resetInputs()
      this.render()
    },
    changeLoginInput: (event) => {
      this.loginData.login = event.target.value
      this.render()
    },
    changePasswordInput: (event) => {
      this.loginData.password = event.target.value
      this.render()
    },
    closeModalHandler: () => {
      this.loginData.modal = "none"
      this.render()
    },
  }
  this.chatData = {
    modalState: "none",
    contacts: [
      {
        id: 1,
        name: "name1",
        messages: [
          { text: "name1", pos: "left" },
          { text: "name1", pos: "right" },
        ],
      },
      {
        id: 3,
        name: "name3",
        messages: [
          { text: "name3", pos: "left" },
          { text: "name3", pos: "right" },
        ],
      },
      {
        id: 2,
        name: "name2",
        messages: [
          { text: "name2", pos: "left" },
          { text: "name2", pos: "right" },
        ],
      },
    ],
    activeContactId: 1,
    inputText: "",
  }
  ;(this.chatFuncs = {
    closeModalHandler: () => {
      this.chatData.modalState = "none"
      this.render()
    },
    addContactHandler: () => {
      this.chatData.modalState = "input"
      this.render()
    },
    searchContact: () => {
      this.chatData.modalState = "search"
      this.render()
    },
    changeActiveContact: (id) => {
      this.chatData.activeContactId = id
      this.chatData.inputText = ""
      this.render()
    },
    changeInputText: (event) => {
      this.chatData.inputText = event.target.value
      this.render()
    },
    sendMessage: () => {
      const message = { text: this.chatData.inputText, pos: "right" }
      this.chatData.contacts.find(({ id }) => this.chatData.activeContactId === id).messages.push(message)
      sendToServer(message)
      this.render()
    },
  }),
    (this.currentPage = "chat")
  this.getPage = () => this.pages[this.currentPage]()
  this.render = () => {
    ReactDOM.render(this.getPage(), document.getElementById("root"))
  }
}
const myApp = new app()

myApp.render()
