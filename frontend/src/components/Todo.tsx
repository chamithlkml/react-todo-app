import { useState, useEffect } from "react"
import * as React from 'react'

type TodoProps = {
  id: number | string,
  text: string,
  done: boolean
}

const Todo = ({ id, text, done }: TodoProps) => {
  const [todoId, setTodoId] = useState(id)
  const [todoText, setTodoText] = useState(text)
  const [todoDone, setTodoDone] = useState(done)

  useEffect(() => {
    handleSubmit()
  }, [todoDone])

  const handleClick = (): void => {
    setTodoDone(!todoDone)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoText(event.target.value)
  }

  const handleSubmit = () => {
    if(todoId.toString().startsWith('draft-')){
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: todoText,
          done: todoDone
        })
      }).then(response => response.json())
        .then(data => {
          setTodoId(data.id)
        });
    }else{
      fetch('http://localhost:3000/todos/' + todoId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: todoText,
          done: todoDone
        })
      })
    }
  }

  return (
    <div className="todo">
      <span className="py-1 bg-gray-200 border-slate-50">
        <input type="checkbox" checked={todoDone} onChange={handleClick}/>
        <input type="text" value={todoText} onChange={handleChange} className={todoDone ? 'line-through' : ''} onBlur={handleSubmit} />
      </span>
    </div>
  )
}

export default Todo