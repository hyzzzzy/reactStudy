import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoList from './components/TodoList';
import TodoListStats from './components/TodoListStats';
import TodoListFilters from './components/TodoListFilters';
import TodoItemCreator from './components/TodoItemCreator';

export default function App() {
  return (
    <RecoilRoot>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <TodoList />
    </RecoilRoot>
  );
}