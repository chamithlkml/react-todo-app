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
      <span className="py-1 bg-gray-200 border-slate-50">
        <input type="checkbox" checked={this.state.done} onClick={this.handleClick}/>
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
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(event){
    event.preventDefault();
    const todos = this.state.todos;
    todos.push({ _id: todos.length + 1, text: '', done: false });
    this.setState({ todos: todos });
  }

  render() {
    const todoList = this.state.todos.map(todo => {
      return <Todo key={todo._id} text={todo.text} done={todo.done} />
    })
    return <React.Fragment>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-8">
          <h1 className="my-2 font-bold">Todo List</h1>
          {todoList}
          <a href="#" className="font-bold mt-6 px-4 h-4 rounded btn-blue bg-blue-500 text-white hover:bg-blue-700" onClick={this.addTodo}>Add Todo</a>
        </div>
      </div>
    </React.Fragment>;
  }

}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);