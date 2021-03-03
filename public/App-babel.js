const sendToServer = async (data, path) => {
  const resp = await fetch(path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });
  const text = await resp.json();
  return text.answer;
};

const Login = props => {
  return /*#__PURE__*/React.createElement("div", {
    id: "login-block"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "app-name"
  }, "SimpleChat"), props.data.serverWait ? /*#__PURE__*/React.createElement("div", {
    className: "lds-dual-ring"
  }) : /*#__PURE__*/React.createElement(LoginForm, props));
};

const LoginForm = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "log"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inp-sp"
  }, "Username:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "inp",
    value: props.data.login,
    onChange: props.funcs.changeLoginInput
  })), /*#__PURE__*/React.createElement("div", {
    className: "log"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inp-sp"
  }, "Password:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "inp",
    value: props.data.password,
    onChange: props.funcs.changePasswordInput
  })), /*#__PURE__*/React.createElement("div", {
    id: "buttons"
  }, /*#__PURE__*/React.createElement("input", {
    className: "btn",
    type: "button",
    value: "Enter",
    onClick: props.funcs.enterHandler
  }), /*#__PURE__*/React.createElement("input", {
    className: "btn",
    type: "button",
    value: "Register",
    onClick: props.funcs.registerHandler
  })), /*#__PURE__*/React.createElement("div", {
    id: "myModal",
    className: "modal",
    style: {
      display: props.data.modal
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "close",
    onClick: props.funcs.closeModalHandler
  }, "\xD7"), /*#__PURE__*/React.createElement("p", null, props.data.modalText))));
};

const InputBlock = props => {
  return /*#__PURE__*/React.createElement("div", {
    id: "input-block"
  }, /*#__PURE__*/React.createElement("form", {
    id: "form"
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "input",
    onChange: props.funcs.changeInputText,
    value: props.data.inputText
  }), /*#__PURE__*/React.createElement("input", {
    id: "button",
    type: "button",
    value: "SEND",
    onClick: props.funcs.sendMessage
  })));
};

const ContactsBlock = props => /*#__PURE__*/React.createElement("div", {
  id: "contacts-block"
}, /*#__PURE__*/React.createElement("div", {
  id: "contacts"
}, /*#__PURE__*/React.createElement(Contacts, props)), /*#__PURE__*/React.createElement("div", {
  id: "add-contact"
}));

const Contacts = props => {
  const {
    contacts,
    activeContactId
  } = props.data;
  return contacts.map(({
    id,
    name
  }, i) => /*#__PURE__*/React.createElement("div", {
    className: `contact ${id === activeContactId ? "active" : ""}`,
    onClick: () => {
      props.funcs.changeActiveContact(id);
    },
    key: i
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
  const {
    contacts,
    activeContactId
  } = props.data;
  const messages = contacts.find(({
    id
  }) => id === activeContactId).messages;
  return /*#__PURE__*/React.createElement("div", {
    id: "chat-block"
  }, messages.map(({
    text,
    pos
  }, i) => /*#__PURE__*/React.createElement(Message, {
    key: i,
    text: text,
    pos: pos
  })));
};

const App = props => /*#__PURE__*/React.createElement("div", {
  id: "container"
}, /*#__PURE__*/React.createElement(ContactsBlock, props), /*#__PURE__*/React.createElement(InputBlock, props), /*#__PURE__*/React.createElement(ChatBlock, props));

function app() {
  this.pages = {
    chat: () => /*#__PURE__*/React.createElement(App, {
      data: this.chatData,
      funcs: this.chatFuncs
    }),
    login: () => /*#__PURE__*/React.createElement(Login, {
      data: this.loginData,
      funcs: this.loginFuncs
    })
  };
  this.loginData = {
    serverWait: false,
    serverResp: "",
    modalText: "",
    login: "",
    password: "",
    modal: "none"
  };
  this.loginFuncs = {
    enterHandler: async () => {
      this.loginData.serverWait = true;
      this.render();
      this.loginData.serverResp = await sendToServer(this.loginData, "/auth");
      this.loginData.serverWait = false;

      if (this.loginData.serverResp) {
        this.currentPage = "chat";
      } else {
        this.loginData.modal = "block";
        this.loginData.modalText = "Username or password is incorrect. Try again.";
      }

      this.render();
    },
    registerHandler: async () => {
      this.loginData.serverWait = true;
      this.render();
      this.loginData.serverResp = await sendToServer(this.loginData, "/register");
      this.loginData.serverWait = false;

      if (this.loginData.serverResp) {
        this.currentPage = "chat";
      } else {
        this.loginData.modal = "block";
        this.loginData.modalText = "Sorry, this username is already taken. Please try something different.";
      }

      this.render();
    },
    changeLoginInput: event => {
      this.loginData.login = event.target.value;
      this.render();
    },
    changePasswordInput: event => {
      this.loginData.password = event.target.value;
      this.render();
    },
    closeModalHandler: () => {
      this.loginData.modal = "none";
      this.render();
    }
  };
  this.chatData = {
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
    activeContactId: 1,
    inputText: ""
  };
  this.chatFuncs = {
    changeActiveContact: id => {
      this.chatData.activeContactId = id;
      this.chatData.inputText = "";
      this.render();
    },
    changeInputText: event => {
      this.chatData.inputText = event.target.value;
      this.render();
    },
    sendMessage: () => {
      const message = {
        text: this.chatData.inputText,
        pos: "right"
      };
      this.chatData.contacts.find(({
        id
      }) => this.chatData.activeContactId === id).messages.push(message);
      sendToServer(message);
      this.render();
    }
  }, this.currentPage = "login";

  this.getPage = () => this.pages[this.currentPage]();

  this.render = () => ReactDOM.render(this.getPage(), document.getElementById("root"));
}

const myApp = new app();
myApp.render();

const g = () => {
  const xhr = new XMLHttpRequest();

  xhr.onprogress = event => {
    console.log(xhr.responseText);
  };

  xhr.onerror = function () {
    // происходит, только когда запрос совсем не получилось выполнить
    console.log(`Ошибка соединения`);
  };

  xhr.open("GET", "/messageChannel", true);
  console.log("send");
  xhr.send();
};
