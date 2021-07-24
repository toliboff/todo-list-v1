/**
 * @jest-environment jsdom
 */
import { addTodo, removeTodo, clearCompleted } from './crud.js';
import { updateStatus, editTodo } from './status.js';
import { getFromStorage, saveToStorage } from './storage.js';
import { drop, dragStart, dragEnd, dragEnter, dragLeave, allowDrop } from './drag.js';
import renderList from './renderList.js';

jest.mock('./storage.js');

document.body.innerHTML = `
    <form class="form flex-row" id="form">
        <input type="text" id="input" placeholder="Add to your list..." autocomplete="off" class="input">
        <button type='submit' id="submit"><i class="fas fa-level-down-alt"></i></button> 
      </form>
      <ul id="list"></ul>
      <footer class="footer flex-row">
        <button class="clear-btn" type="button" id="clear-btn">Clear all completed</button>
      </footer>
    `;
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const addtBtn = document.getElementById('submit');

describe('Testing addTodo function', () => {
  test('Test 1: Check dynamically created list item', () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      input.value = 'New todo';
      const addedTodo = addTodo(input.value, getFromStorage('TodoList'));
      saveToStorage('TodoList', addedTodo);
      renderList(addedTodo);
    });

    addtBtn.click();
    expect(list.innerHTML).toBe(`<li class="flex-row todo" draggable="true" id="0">
  <input type="checkbox" class="checkbox" data-id="0">
  <input type="text" value="New todo" data-index="0" draggable="false" class="todo-text ">
  <i class="fas fa-ellipsis-v dots" data-id="0"></i>
  <i class="fas fa-trash deleteBtn" data-type="deleteBtn" data-trash="0"></i>
  </li>`);
  });

  test('Test 2: Check quantity of list items after adding a new one. Should return 2', () => {
    const newTodos = ['BBB', 'CCC', 'DDD', 'EEE', 'FFF'];
    newTodos.forEach((todo) => {
      const lastAdded = addTodo(todo, getFromStorage('TodoList'));
      saveToStorage('TodoList', lastAdded);
      renderList(lastAdded);
    });
    expect(list.children.length).toBe(6);
  });

  test('Test 3: Check quantity of list items after deleting. Should return 5', () => {
    const deleteIcon = document.querySelector('i[data-trash="0"]');
    deleteIcon.addEventListener('click', (event) => {
      const removedTodo = removeTodo(event, getFromStorage('TodoList'));
      saveToStorage('TodoList', removedTodo);
      renderList(removedTodo);
    });
    deleteIcon.click();
    expect(list.children.length).toBe(5);
  });

  test('Test 4: Check status of list item', () => {
    const checkbox = document.querySelector('input[data-id="0"]');
    expect(checkbox.checked).toBeFalsy();
  });

  test('Test 5: Check status of list item after updating', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((chbx) => {
      chbx.addEventListener('change', (event) => {
        const updatedStatus = updateStatus(event, getFromStorage('TodoList'));
        saveToStorage('TodoList', updatedStatus);
        renderList(updatedStatus);
      });
    });

    let checkbox = document.querySelector('input[data-id="0"]');
    checkbox.click();
    checkbox = document.querySelector('input[data-id="0"]');
    expect(checkbox.checked).toBeTruthy();
  });

  test('Test 6: Editing the task. Should return "Updated text"', () => {
    const inputEl = document.querySelector('input[data-index="0"]');
    inputEl.addEventListener('input', (event) => {
      const editedTodo = editTodo(event, getFromStorage('TodoList'));
      saveToStorage('TodoList', editedTodo);
    });

    const inputEvent = new Event('input');
    inputEl.value = 'Updated text';
    inputEl.dispatchEvent(inputEvent);
    expect(getFromStorage('TodoList')[0].description).toBe('Updated text');
  });

  test('Test 7: Check quantity of completed tasks. Should return 5', () => {
    const check1 = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    expect(check1.length).toBe(5);
  });

  test('Test 8: Clear all completed tasks. Only one task is completed. Should return 4', () => {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', () => {
      const clearedList = clearCompleted(getFromStorage('TodoList'));
      saveToStorage('TodoList', clearedList);
      renderList(clearedList);
    });
    clearBtn.click();
    const check2 = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    expect(check2.length).toBe(4);
  });

  test('Test 9: Check third todo\'s index and description. Should return EEE/2', () => {
    const tasks = Array.from(document.querySelectorAll('li'));
    const thirdTodo = tasks[2];
    const expectedValue = `${thirdTodo.children[1].value}/${thirdTodo.children[1].dataset.index}`;
    expect(expectedValue).toBe('EEE/2');
  });

  test('Test 10: Check third todo\'s after drag and drop. Should return EEE/0', () => {
    let tasks = Array.from(document.querySelectorAll('li'));
    const thirdTodo = tasks[2];
    let firstTodo = tasks[0];
    document.querySelectorAll('.todo').forEach((t) => {
      t.addEventListener('dragstart', dragStart);
      t.addEventListener('dragend', dragEnd);
      t.addEventListener('dragenter', dragEnter);
      t.addEventListener('dragleave', dragLeave);
      t.addEventListener('drop', drop);
      t.addEventListener('dragover', allowDrop);
    });

    thirdTodo.addEventListener('mousedown', (event) => {
      dragStart(event);
    });

    firstTodo.addEventListener('mouseup', (event) => {
      const dropped = drop(event);
      saveToStorage('TodoList', dropped);
      renderList(dropped);
    });

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    thirdTodo.dispatchEvent(mouseDownEvent);
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    firstTodo.dispatchEvent(mouseUpEvent);

    tasks = Array.from(document.querySelectorAll('li'));
    [firstTodo] = tasks;
    const expectedValue = `${firstTodo.children[1].value}/${firstTodo.children[1].dataset.index}`;
    expect(expectedValue).toBe('EEE/0');
  });
});
