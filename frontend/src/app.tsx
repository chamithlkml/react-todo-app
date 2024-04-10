import * as React from 'react'
import TodoList from './components/TodoList'
import { createRoot } from 'react-dom/client';

const rootElement: HTMLElement | null = document.getElementById('root')

if(rootElement !== null){
  const root = createRoot(rootElement);
  root.render(
    <TodoList />
  );
}
