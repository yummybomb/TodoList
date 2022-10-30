//Selectors
const todoTxt = document.querySelector('.todo-txt');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Funcs
function addTodo(event){
    event.preventDefault();
    //Make Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Make LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoTxt.value;
    //Add todo into local storage
    saveLocalTodos(todoTxt.value);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Empty value every time entered
    todoTxt.value = "";
    // Add Check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class = "fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    // Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Appending to list
    todoList.appendChild(todoDiv);
}
function deleteCheck(event){
    //Delete
    if (event.target.classList[0] === "delete-btn"){
        event.target.parentElement.remove(); // Delete Item in todoList
        removeLocalTodos(event.target.parentElement);
    }
    //Check
    if(event.target.classList[0] === "check-btn"){
        event.target.parentElement.classList.toggle("checked");
    }
}
function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "checked":
                if(todo.classList.contains('checked')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "unchecked":
                if(!todo.classList.contains('checked')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoTxt.value = "";
      //make check button
      const checkButton = document.createElement("button");
      checkButton.innerHTML = `<i class="fas fa-check"></i>`;
      checkButton.classList.add("check-btn");
      todoDiv.appendChild(checkButton);
      //make delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
      deleteButton.classList.add("delete-btn");
      todoDiv.appendChild(deleteButton);
      //attach todo
      todoList.appendChild(todoDiv);
    });
  }