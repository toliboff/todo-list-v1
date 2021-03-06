import {
  dragStart, allowDrop, dragEnd, drop, dragEnter, dragLeave,
} from './drag.js';

export default function renderList(arr) {
  const list = document.getElementById('list');

  list.innerHTML = arr.map((item) => `<li class="flex-row todo" draggable="true" id="${item.index}">
  <input type="checkbox" class="checkbox" data-id="${item.index}"  ${item.completed ? 'checked' : ''}>
  <input type="text" value="${item.description}" data-index="${item.index}" draggable="false" class="todo-text ${item.completed ? 'completed' : ''}">
  <i class="fas fa-ellipsis-v dots" data-id="${item.index}"></i>
  <i class="fas fa-trash deleteBtn" data-type="deleteBtn" data-trash="${item.index}"></i>
  </li>`).join('');

  list.addEventListener('dragenter', dragEnter);

  document.querySelectorAll('.todo').forEach((t) => {
    t.addEventListener('dragstart', dragStart);
    t.addEventListener('dragend', dragEnd);
    t.addEventListener('dragenter', dragEnter);
    t.addEventListener('dragleave', dragLeave);
    t.addEventListener('drop', drop);
    t.addEventListener('dragover', allowDrop);
  });
}