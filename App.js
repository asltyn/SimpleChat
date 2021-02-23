const InputBlock = ({ handler }) => {
  const [text, setText] = React.useState("")
  const send = () => {
    handler({ text: text, pos: "right" })
    console.log(text)
  }
  const print = (e) => {
    setText(e.target.value)
  }
  return (
    <div id="input-block">
      <form id="form">
        <textarea id="input" onChange={print}></textarea>
        <input id="button" type="button" value="SEND" onClick={send}></input>
      </form>
    </div>
  )
}
const ContactsBlock = () => (
  <div id="contacts-block">
    <div id="contacts">
      <div className="contact">name1</div>
      <div className="contact">name2</div>
    </div>
    <div id="add-contact"></div>
  </div>
)

const Message = ({ text, pos }) => (
  <div className={`message ${pos}`}>
    <span>{text}</span>
  </div>
)

const ChatBlock = (props) => {
  const x = props.messages.map(({ text, pos }, i) => <Message key={i} text={text} pos={pos} />)
  return <div id="chat-block">{x}</div>
}

const App = () => {
  const [messages, setMessages] = React.useState([
    { text: "text1", pos: "left" },
    { text: "text2", pos: "left" },
    { text: "text3", pos: "right" },
    { text: "text4", pos: "right" },
  ])
  return (
    <div id="container">
      {<ContactsBlock />}
      {<InputBlock handler={(newMessage) => setMessages([...messages, newMessage])} />}
      {<ChatBlock messages={messages} />}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
