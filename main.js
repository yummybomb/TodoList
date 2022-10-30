//Selectors
const todoTxt = document.querySelector('.todo-txt');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Funcs
function addTodo(event){
    event.preventDefault();
    //Make Div
    const todoDiv = document.createElement("todo");
    todoDiv.classList.add("todo");
    //Make LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoTxt.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
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
    //Empty value every time entered
    todoTxt.value = "";
}
function deleteCheck(event){
    //Delete
    const item = event.target;
    if (item.classList[0] === "delete-btn"){
        item.parentElement.remove(); // Delete Item in todoList
    }
    //Check
    if(item.classList[0] === "check-btn"){
        item.parentElement.classList.toggle("checked");
    }
}
function filterTodo(event){
    todoList.childNodes.forEach(function(todo){
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
    function saveLocalTodos(todo){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify('todos'));
    }
}