/**
 * @jest-environment jsdom
 */
import { addTodo, removeTodo } from './src/crud.js';
import {saveToStorage, getFromStorage} from './src/storage.js';
import renderList from './src/renderList.js';

jest.mock('./src/storage.js');

describe('Unit tests containing the add item and delete item functions', () => {
  document.body.innerHTML = `
    <form class="form flex-row" id="form">
        <input type="text" id="input" placeholder="Add to your list..." autocomplete="off" class="input">
        <button type='submit' id="submit"><i class="fas fa-level-down-alt"></i></button> 
      </form>
      <ul id="list"></ul>
    `;
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const list = document.getElementById('list');
  const addtBtn = document.getElementById('submit');

  test('Check added list item', () => {
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

  test('Check quantity of list items after adding a new one', () => {
    expect(list.children.length).toBe(1);
  });
});