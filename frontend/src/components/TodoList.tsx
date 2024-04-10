import * as React from 'react'
import { useState, useEffect } from 'react';
import Todo from './Todo'

type TodoType = {id: string | number, text: string, done: boolean}
const todosList: TodoType[] = []

const TodoList = () => {
  const [todos, setTodos] = useState(todosList)

  useEffect(() => {
    fetch('http://localhost:3000/todos/')
      .then(response => response.json())
      .then(data => {
        setTodos(data)
      });
  }, [])

  const addTodo = (event: any) => {
    event.preventDefault()
    const newTodo: TodoType = {
      id: `draft-${todos.length + 1}`,
      text: '',
      done: false
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const getTodoList = (): JSX.Element[] => {
    return todos.map(todo => {
      return <Todo id={todo.id} key={todo.id} text={todo.text} done={todo.done} />
    })
  }

  return (
    <React.Fragment>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-8">
          <h1 className="my-2 font-bold">Todo List</h1>
          {getTodoList()}
          <a href="#" className="font-bold mt-6 px-4 h-4 rounded btn-blue bg-blue-500 text-white hover:bg-blue-700" onClick={addTodo}>Add Todo</a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TodoList;