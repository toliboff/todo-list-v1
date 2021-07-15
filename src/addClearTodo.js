import renderList from './renderList.js';
import { getFromStorage, saveToStorage } from './storage.js';

export function addTodo(event) {
  event.preventDefault();
  const input = event.target.children[0];
  const todos = getFromStorage('TodoList');
  todos.push({ index: todos.length, description: input.value, completed: false });
  input.value = '';
  saveToStorage('TodoList', todos);
  renderList(todos);
}

export function removeTodo(event) {
  console.log('removeTodo');
}

export function clearCompleted() {
  const todos = getFromStorage('TodoList');
  renderList(todos.filter((todo) => !todo.completed));
}