class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      done: props.done
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event){
    this.setState(state => ({
      done: !state.done
    }), function(event){
      this.handleSubmit(event);
    });
  }

  handleChange(event){
    this.setState(state => ({
      text:  event.target.value
    }))
  }

  handleSubmit(event){
    console.log('Submitted');
  }

  render() {
    return <div className="todo">
      <span>
        <input type="checkbox" checked={this.state.done} onClick={this.handleClick} />
        <input type="text" value={this.state.text} onChange={this.handleChange} />
      </span>
    </div>;
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { _id: 1, text: 'Learn React', done: false },
        { _id: 2, text: 'Learn JSX', done: true },
        { _id: 3, text: 'Build an App', done: false }
      ]
    };
  }

  render() {
    const todoList = this.state.todos.map(todo => {
      return <Todo key={todo._id} text={todo.text} done={todo.done} />
    })
    return <React.Fragment>
      <h1>Todo List</h1>
      {todoList}
    </React.Fragment>;
  }

}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);