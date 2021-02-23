const InputBlock = ({
  handler
}) => {
  const [text, setText] = React.useState("");

  const send = () => {
    handler({
      text: text,
      pos: "right"
    });
    console.log(text);
  };

  const print = e => {
    setText(e.target.value);
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "input-block"
  }, /*#__PURE__*/React.createElement("form", {
    id: "form"
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "input",
    onChange: print
  }), /*#__PURE__*/React.createElement("input", {
    id: "button",
    type: "button",
    value: "SEND",
    onClick: send
  })));
};

const ContactsBlock = () => /*#__PURE__*/React.createElement("div", {
  id: "contacts-block"
}, /*#__PURE__*/React.createElement("div", {
  id: "contacts"
}, /*#__PURE__*/React.createElement("div", {
  className: "contact"
}, "name1"), /*#__PURE__*/React.createElement("div", {
  className: "contact"
}, "name2")), /*#__PURE__*/React.createElement("div", {
  id: "add-contact"
})); // const messages = [
//   { text: "text1", pos: "left" },
//   { text: "text2", pos: "left" },
//   { text: "text3", pos: "right" },
//   { text: "text4", pos: "right" },
// ]


const Message = ({
  text,
  pos
}) => /*#__PURE__*/React.createElement("div", {
  className: `message ${pos}`
}, /*#__PURE__*/React.createElement("span", null, text));

const ChatBlock = props => {
  const x = props.messages.map(({
    text,
    pos
  }, i) => /*#__PURE__*/React.createElement(Message, {
    key: i,
    text: text,
    pos: pos
  }));
  return /*#__PURE__*/React.createElement("div", {
    id: "chat-block"
  }, x);
};

const App = () => {
  const [messages, setMessages] = React.useState([{
    text: "text1",
    pos: "left"
  }, {
    text: "text2",
    pos: "left"
  }, {
    text: "text3",
    pos: "right"
  }, {
    text: "text4",
    pos: "right"
  }]);
  return /*#__PURE__*/React.createElement("div", {
    id: "container"
  }, /*#__PURE__*/React.createElement(ContactsBlock, null), /*#__PURE__*/React.createElement(InputBlock, {
    handler: newMessage => setMessages([...messages, newMessage])
  }), /*#__PURE__*/React.createElement(ChatBlock, {
    messages: messages
  }));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
