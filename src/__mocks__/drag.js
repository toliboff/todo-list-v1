import renderList from '../renderList.js';
import { saveToStorage } from './storage.js';

export default function drop(current, targetItem) {
  current.parentElement.insertBefore(current, targetItem);
  const children = Array.from(current.parentElement.children);
  const updatedList = children.map((el, index) => ({
    index, completed: el.children[0].checked, description: el.children[1].value,
  }
  ));
  saveToStorage('TodoList', updatedList);
  renderList(updatedList);
}