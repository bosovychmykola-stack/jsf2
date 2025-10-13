// Класи з CSS
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

// Основні елементи
const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];
let nextId = 0;

// === Створюємо поле для введення нових TODO ===
const inputContainer = document.createElement('div');
inputContainer.className = 'todo-input-container';

const inputField = document.createElement('input');
inputField.type = 'text';
inputField.placeholder = 'Введіть нове завдання...';
inputField.className = 'todo-input';

inputContainer.appendChild(inputField);

list.parentNode.insertBefore(inputContainer, list);

// === Логіка додатку ===

// Оновлення лічильників
function updateCounters() {
  itemCountSpan.innerText = todos.length;
  uncheckedCountSpan.innerText = todos.filter(t => !t.checked).length;
}

// Функція, що викликається при натисканні кнопки "New TODO"
function newTodo() {
  const text = inputField.value.trim();
  if (!text) {
    inputField.focus();
    return;
  }

  const todo = {
    id: nextId++,
    text,
    checked: false
  };

  todos.push(todo);
  renderTodo(todo);
  updateCounters();

  inputField.value = '';
  inputField.focus();
}

// Відображення одного TODO
function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = classNames.TODO_ITEM;
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classNames.TODO_CHECKBOX;
  checkbox.checked = todo.checked;
  checkbox.addEventListener('change', () => toggleTodo(todo.id));

  const text = document.createElement('span');
  text.className = classNames.TODO_TEXT;
  text.innerText = todo.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = classNames.TODO_DELETE;
  deleteBtn.innerText = '❌';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Зміна стану checkbox
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    updateCounters();
  }
}

// Видалення TODO
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  const el = list.querySelector(`[data-id="${id}"]`);
  if (el) el.remove();
  updateCounters();
}

// Додавання можливості натискати Enter у полі вводу
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') newTodo();
});
