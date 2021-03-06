const localStorage = {
  TodoList: [],
  getItem(name) {
    return this[name];
  },
  setItem(name, item) {
    this.TodoList = item;
  },

};

export const getFromStorage = (name) => localStorage.getItem(name);

export const saveToStorage = (name, data) => localStorage.setItem(name, data);
