/**
 * @jest-environment jsdom
 */
import { addTodo, removeTodo, clearCompleted } from './crud.js';
import { updateStatus, updateTodo } from './status.js';

jest.mock('./storage.js');
jest.mock('./crud.js');
jest.mock('./status.js');

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
  test('Check dynamically created list item', () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addTodo(event);
    });
    input.value = 'New todo';
    addtBtn.click();
    expect(list.innerHTML).toBe(`<li class="flex-row todo" draggable="true" id="0">
  <input type="checkbox" class="checkbox" data-id="0">
  <input type="text" value="New todo" data-index="0" draggable="false" class="todo-text ">
  <i class="fas fa-ellipsis-v dots" data-id="0"></i>
  <i class="fas fa-trash deleteBtn" data-type="deleteBtn" data-trash="0"></i>
  </li>`);
  });

  test('Check quantity of list items after adding a new one. Should return 2', () => {
    input.value = 'Second todo';
    addtBtn.click();
    input.value = 'Third todo';
    addtBtn.click();
    input.value = 'Fourth todo';
    addtBtn.click();
    expect(list.children.length).toBe(4);
  });

  test('Check quantity of list items after deleting. Should return 3', () => {
    const deleteIcon = document.querySelector('i[data-trash="0"]');
    deleteIcon.addEventListener('click', (event) => {
      removeTodo(event);
    });
    deleteIcon.click();
    expect(list.children.length).toBe(3);
  });

  test('Check status of list item', () => {
    const checkbox = document.querySelector('input[data-id="0"]');
    expect(checkbox.checked).toBeFalsy();
  });

  test('Check status of list item after updating', () => {
    const checkbox = document.querySelector('input[data-id="0"]');
    checkbox.addEventListener('change', (event) => {
      updateStatus(event);
    });
    checkbox.click();
    expect(checkbox.checked).toBeTruthy();
  });

  test('Editing the task. Should return "Updated text"', () => {
    const inputEl = document.querySelector('input[data-index="0"]');
    inputEl.addEventListener('input', updateTodo);

    const inputEvent = new Event('input');
    inputEl.value = 'Updated text';
    inputEl.dispatchEvent(inputEvent);
    expect(inputEl.value).toBe('Updated text');
  });

  test('Check quantity of completed tasks. Should return 3', () => {
    const check1 = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    expect(check1.length).toBe(3);
  });

  test('Clear all completed tasks. Only one task is completed. Should return 2', () => {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', clearCompleted);
    clearBtn.click();
    const check2 = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    expect(check2.length).toBe(2);
  });
});
