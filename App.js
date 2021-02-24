const InputBlock = ({ addMessage }) => {
  const [text, setText] = React.useState("")
  const send = () => {
    addMessage({ text: text, pos: "right" })
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
const ContactsBlock = ({ storage, idSetter }) => (
  <div id="contacts-block">
    <div id="contacts">
      <Contacts storage={storage} idSetter={idSetter} />
    </div>
    <div id="add-contact"></div>
  </div>
)

const Contacts = ({ storage, idSetter }) => {
  const { contacts, activeId } = storage
  return contacts.map(({ id, name }) => (
    <div className={`contact ${id === activeId ? "active" : ""}`} onClick={() => idSetter(id)}>
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
  return (
    <div id="chat-block">
      {props.messages.map(({ text, pos }, i) => (
        <Message key={i} text={text} pos={pos} />
      ))}
    </div>
  )
}

const state = {
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
  activeId: 1,
}

const App = () => {
  const [storage, setStorage] = React.useState(state)

  return (
    <div id="container">
      {<ContactsBlock storage={storage} idSetter={(id) => setStorage({ ...storage, activeId: id })} />}
      {
        <InputBlock
          addMessage={(newMessage) => {
            const newStorage = { ...storage }
            newStorage.contacts.find(({ id }) => storage.activeId === id).messages.push(newMessage)
            setStorage(newStorage)
          }}
        />
      }
      {<ChatBlock messages={storage.contacts.find(({ id }) => storage.activeId === id).messages} />}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
