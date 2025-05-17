console.log("hi");
const inputBox = document.getElementById('input-box');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let editTodo = null;

/* add to do function
1. trim 
2. validate 
3. create <li><p></li>
4. erase value
5. update localStorage
*/

const addToDo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to-do");
    return;
  }

  // If editing
  if (editTodo) {
    const p = editTodo.querySelector("p");
    const oldText = p.innerText;
    p.innerText = inputText;
    updateLocalTodo(oldText, inputText);
    editTodo = null;
    addBtn.value = "Add";
    inputBox.value = "";
    return;
  }

  // Create new todo
  createTodoElement(inputText);
  saveLocalTodo(inputText);
  inputBox.value = "";
};

const updateTodo = (e) => {
  if (e.target.innerText === "Remove") {
    const li = e.target.parentElement;
    const p = li.querySelector("p").innerText;
    removeLocalTodo(p);
    todoList.removeChild(li);
  }

  if (e.target.innerText === "Edit") {
    editTodo = e.target.parentElement;
    const p = editTodo.querySelector("p");
    inputBox.value = p.innerText;
    addBtn.value = "Update";
  }
};

// Create <li> and buttons for a todo
const createTodoElement = (text) => {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Remove";
  deleteBtn.classList.add("btn", "delete");
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "edit");
  li.appendChild(editBtn);

  todoList.appendChild(li);
};

// Save to localStorage
const saveLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove from localStorage
const removeLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(t => t !== todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Update an existing todo in localStorage
const updateLocalTodo = (oldText, newText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.indexOf(oldText);
  if (index !== -1) {
    todos[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// Load todos from localStorage when page loads
window.onload = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => createTodoElement(todo));
};

addBtn.addEventListener('click', addToDo);
todoList.addEventListener('click', updateTodo);
