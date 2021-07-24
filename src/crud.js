export function addTodo(newTodo, todos) {
  todos.push({ index: todos.length, description: newTodo, completed: false });
  return todos;
}

export function removeTodo(event, todos) {
  todos.splice(event.target.parentNode.id, 1);
  const modifiedIndex = todos.map((el, index) => ({ ...el, index }));
  return modifiedIndex;
}

export function clearCompleted(todos) {
  const clearedList = todos.filter((todo) => !todo.completed)
    .map((todo, index) => ({ ...todo, index }));
  return clearedList;
}