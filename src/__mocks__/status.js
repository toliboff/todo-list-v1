import { getFromStorage, saveToStorage } from './storage.js';

export default function updateStatus(event) {
  event.target.nextElementSibling.classList.toggle('completed');
  const status = getFromStorage('TodoList');
  status[event.target.dataset.id].completed = event.target.checked;
  saveToStorage('TodoList', status);
}