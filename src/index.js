import './style.css';

const list = document.getElementById('list');

const todoList = [
  {
    description: 'Deploy project on GitHub pages',
    completed: false,
    index: 4,
  },
  {
    description: 'Add README.md file',
    completed: true,
    index: 3,
  },
  {
    description: 'Take a screenshot',
    completed: false,
    index: 2,
  },
  {
    description: 'Install webpack',
    completed: false,
    index: 1,
  },
];

function renderList(arr) {
  list.innerHTML = arr.sort((a, b) => +a.index - +b.index).map((item) => `<li class="flex-row todo">
                                      <input type="checkbox" class="checkbox" id="${item.index}"  ${item.completed ? 'checked' : ''}>
                                      <input type="text" value="${item.description}" class="todo-text ${item.completed ? 'completed' : ''}">
                                      <i class="fas fa-ellipsis-v dots"></i>
                                      </li>`).join('');
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((chbox) => {
    chbox.addEventListener('change', (event) => {
      event.target.nextElementSibling.classList.toggle('completed');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderList(todoList);
});