var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = function (_React$Component) {
  _inherits(Todo, _React$Component);

  function Todo(props) {
    _classCallCheck(this, Todo);

    var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

    _this.state = {
      text: props.text,
      done: props.done
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Todo, [{
    key: "handleClick",
    value: function handleClick(event) {
      this.setState(function (state) {
        return {
          done: !state.done
        };
      }, function (event) {
        this.handleSubmit(event);
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(function (state) {
        return {
          text: event.target.value
        };
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      console.log('Submitted');
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "todo" },
        React.createElement(
          "span",
          { className: "py-1 bg-gray-200 border-slate-50" },
          React.createElement("input", { type: "checkbox", checked: this.state.done, onClick: this.handleClick }),
          React.createElement("input", { type: "text", value: this.state.text, onChange: this.handleChange })
        )
      );
    }
  }]);

  return Todo;
}(React.Component);

var TodoList = function (_React$Component2) {
  _inherits(TodoList, _React$Component2);

  function TodoList(props) {
    _classCallCheck(this, TodoList);

    var _this2 = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

    _this2.state = {
      todos: [{ _id: 1, text: 'Learn React', done: false }, { _id: 2, text: 'Learn JSX', done: true }, { _id: 3, text: 'Build an App', done: false }]
    };
    _this2.addTodo = _this2.addTodo.bind(_this2);
    return _this2;
  }

  _createClass(TodoList, [{
    key: "addTodo",
    value: function addTodo(event) {
      event.preventDefault();
      var todos = this.state.todos;
      todos.push({ _id: todos.length + 1, text: '', done: false });
      this.setState({ todos: todos });
    }
  }, {
    key: "render",
    value: function render() {
      var todoList = this.state.todos.map(function (todo) {
        return React.createElement(Todo, { key: todo._id, text: todo.text, done: todo.done });
      });
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "flex justify-center items-center h-screen" },
          React.createElement(
            "div",
            { className: "bg-gray-200 p-8" },
            React.createElement(
              "h1",
              { className: "my-2 font-bold" },
              "Todo List"
            ),
            todoList,
            React.createElement(
              "a",
              { href: "#", className: "font-bold mt-6 px-4 h-4 rounded btn-blue bg-blue-500 text-white hover:bg-blue-700", onClick: this.addTodo },
              "Add Todo"
            )
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(TodoList, null), document.getElementById('root'));