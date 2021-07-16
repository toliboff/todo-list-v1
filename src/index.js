import renderList from './renderList.js';
import {addTodo, removeTodo, clearCompleted} from './addClearTodo.js';
import { getFromStorage, saveToStorage } from './storage.js';
import './style.css';

const storage = 'TodoList';
let todoList = [];

const form = document.getElementById('form');
form.addEventListener('submit', addTodo);

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', clearCompleted);

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('TodoList')) {
    todoList = getFromStorage(storage);
  } else {
    saveToStorage(storage, todoList);
  }
  renderList(getFromStorage(storage));
  // const deleteBtns = document.querySelectorAll('[data-trash]');
  // deleteBtns.forEach((deleteBtn) => {
  //   deleteBtn.addEventListener('click', removeTodo);
  // });
});