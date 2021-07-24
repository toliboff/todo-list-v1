import renderList from './renderList.js';
import { getFromStorage, saveToStorage } from './storage.js';

export function addTodo(newTodo, todos) {
  // event.preventDefault();
  // const input = event.target.children[0];
  todos.push({ index: todos.length, description: newTodo, completed: false });
  // input.value = '';
  return todos;
}

export function removeTodo(event, todos) {
  todos.splice(event.target.parentNode.id, 1);
  const modifiedIndex = todos.map((el, index) => ({ ...el, index }));
  return modifiedIndex;
}

export function clearCompleted(todos) {
  const clearedList = todos.filter((todo) => !todo.completed)
    .map((todo, index) => ({ ...todo, index }));
  return clearedList;
}