import { getFromStorage, saveToStorage } from './storage.js';

export function updateStatus(event) {
  event.target.nextElementSibling.classList.toggle('completed');
  const status = getFromStorage('TodoList');
  status[event.target.dataset.id].completed = event.target.checked;
  saveToStorage('TodoList', status);
}
export function updateTodo(event) {
  const editable = getFromStorage('TodoList');
  editable[event.target.dataset.index].description = event.target.value;
  saveToStorage('TodoList', editable);
}