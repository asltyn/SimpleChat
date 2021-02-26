const sendToServer = text => {
  fetch("/chat", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      text
    })
  }).then(resp => resp.text()).then(resp => console.log(resp));
};

const InputBlock = ({
  addMessage
}) => {
  const [text, setText] = React.useState("");

  const send = () => {
    addMessage({
      text: text,
      pos: "right"
    });
    sendToServer(text); //console.log(text)
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

const ContactsBlock = ({
  storage,
  idSetter
}) => /*#__PURE__*/React.createElement("div", {
  id: "contacts-block"
}, /*#__PURE__*/React.createElement("div", {
  id: "contacts"
}, /*#__PURE__*/React.createElement(Contacts, {
  storage: storage,
  idSetter: idSetter
})), /*#__PURE__*/React.createElement("div", {
  id: "add-contact"
}));

const Contacts = ({
  storage,
  idSetter
}) => {
  const {
    contacts,
    activeId
  } = storage;
  return contacts.map(({
    id,
    name
  }) => /*#__PURE__*/React.createElement("div", {
    className: `contact ${id === activeId ? "active" : ""}`,
    onClick: () => idSetter(id)
  }, /*#__PURE__*/React.createElement("span", null, name)));
};

const Message = ({
  text,
  pos
}) => {
  const divRef = React.useRef(null);
  React.useEffect(() => {
    divRef.current.scrollIntoView({
      behavior: "smooth"
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `message ${pos}`,
    ref: divRef
  }, /*#__PURE__*/React.createElement("span", null, text));
};

const ChatBlock = props => {
  return /*#__PURE__*/React.createElement("div", {
    id: "chat-block"
  }, props.messages.map(({
    text,
    pos
  }, i) => /*#__PURE__*/React.createElement(Message, {
    key: i,
    text: text,
    pos: pos
  })));
};

const state = {
  contacts: [{
    id: 1,
    name: "name1",
    messages: [{
      text: "name1",
      pos: "left"
    }, {
      text: "name1",
      pos: "right"
    }]
  }, {
    id: 3,
    name: "name3",
    messages: [{
      text: "name3",
      pos: "left"
    }, {
      text: "name3",
      pos: "right"
    }]
  }, {
    id: 2,
    name: "name2",
    messages: [{
      text: "name2",
      pos: "left"
    }, {
      text: "name2",
      pos: "right"
    }]
  }],
  activeId: 1
};

const App = () => {
  const [storage, setStorage] = React.useState(state);
  return /*#__PURE__*/React.createElement("div", {
    id: "container"
  }, /*#__PURE__*/React.createElement(ContactsBlock, {
    storage: storage,
    idSetter: id => setStorage({ ...storage,
      activeId: id
    })
  }), /*#__PURE__*/React.createElement(InputBlock, {
    addMessage: newMessage => {
      const newStorage = { ...storage
      };
      newStorage.contacts.find(({
        id
      }) => storage.activeId === id).messages.push(newMessage);
      setStorage(newStorage);
    }
  }), /*#__PURE__*/React.createElement(ChatBlock, {
    messages: storage.contacts.find(({
      id
    }) => storage.activeId === id).messages
  }));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
