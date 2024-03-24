class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.id,
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
    let id = this.props.id || this.state._id;

    if(id == '' || id == undefined){
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.state.text,
          done: this.state.done
        })
      }).then(response => response.json())
        .then(data => {
          this.setState(state => ({
            _id: data.id
          }));
        });
    }else{
      fetch('http://localhost:3000/todos/' + this.props.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.state.text,
          done: this.state.done
        })
      }).then(response => response.json())
        .then(data => {
          this.setState(state => ({
            text: data.text,
            done: data.done
          }))
        });
    }
  }

  render() {
    return <div className="todo">
      <span className="py-1 bg-gray-200 border-slate-50">
        <input type="checkbox" checked={this.state.done} onClick={this.handleClick}/>
        <input type="text" value={this.state.text} onChange={this.handleChange} className={this.state.done ? 'line-through' : ''} onBlur={this.handleSubmit} />
      </span>
    </div>;
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/todos/')
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          todos: data
        }))
      });
  }

  addTodo(event){
    event.preventDefault();
    const todos = this.state.todos;
    todos.push({ id: '', text: '', done: false });
    this.setState({ todos: todos });
  }

  render() {
    const todoList = this.state.todos.map(todo => {
      return <Todo id={todo.id} key={todo.id} text={todo.text} done={todo.done} />
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