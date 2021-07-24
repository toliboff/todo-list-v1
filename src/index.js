import renderList from './renderList.js';
import { addTodo, removeTodo, clearCompleted } from './crud.js';
import { getFromStorage, saveToStorage } from './storage.js';
import { updateStatus, editTodo } from './status.js';
import './style.css';

const storage = 'TodoList';
let todoList = [];

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const addedTodo = addTodo(event.target.children[0].value, getFromStorage('TodoList'));
  event.target.children[0].value = '';
  saveToStorage(storage, addedTodo);
  renderList(addedTodo);
});

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  const clearedList = clearCompleted(getFromStorage('TodoList'));
  saveToStorage('TodoList', clearedList);
  renderList(clearedList);
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('TodoList')) {
    todoList = getFromStorage(storage);
  } else {
    saveToStorage(storage, todoList);
  }
  renderList(getFromStorage(storage));

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((chbox) => {
    chbox.addEventListener('change', (event) => {
      const updatedTodo = updateStatus(event, getFromStorage('TodoList'));
      saveToStorage('TodoList', updatedTodo);
    });
  });

  document.querySelectorAll('.todo-text').forEach((text) => {
    const trash = document.querySelector(`[data-trash='${text.dataset.index}']`);
    text.addEventListener('focus', (event) => {
      document.querySelectorAll('.todo').forEach((t) => {
        t.style.backgroundColor = '#fff';
      });
      event.target.parentNode.style.backgroundColor = '#fea';
      trash.classList.add('active');
    });

    text.addEventListener('blur', () => {
      document.querySelectorAll('.todo').forEach((t) => {
        t.style.backgroundColor = '#fff';
      });
      setTimeout(() => trash.classList.remove('active'), 150);
    });
  });

  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (event) => {
      const removedTodo = removeTodo(event, getFromStorage('TodoList'));
      saveToStorage(storage, removedTodo);
      renderList(removedTodo);
    });
  });

  const todoDescriptions = document.querySelectorAll('.todo-text');
  todoDescriptions.forEach((todoDescription) => {
    todoDescription.addEventListener('input', (event) => {
      const editedDescription = editTodo(event, getFromStorage('TodoList'));
      saveToStorage(storage, editedDescription);
    });
  });
});