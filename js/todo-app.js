// all selector elements
const mainElement = document.querySelector('.output');
const form = mainElement.querySelector('form');
const inputElement = mainElement.querySelector('#input-todo');
const submitButton = mainElement.querySelector('.submit-bttn');
const displayMessage = mainElement.querySelector('.message');
const toDoLists = mainElement.querySelector('.todo-lists ul');
const deleteBttn = mainElement.querySelector('.deltebtn');
let counter = 0;

// delete todos
const deleteTodos = (event) => { 
    const delteTodo = event.target.parentElement;
    toDoLists.removeChild(delteTodo);
    showMessage("Todo list Deleted Success","danger");

    let todos = localStorageData();
    todos = todos.filter((todo) => todo.toDoID !== delteTodo.id);
    localStorage.setItem("myTodos", JSON.stringify(todos));
}

// to do create
const createToDo = (toDoID,toDoElement) => { 
    counter++;
    let newElement = document.createElement('li');
    newElement.id = toDoID;
    let spanElement = document.createElement('span');
    let linkElement = document.createElement('a');
    linkElement.classList.add('deltebtn');
    linkElement.href = "javascript:void(0)";
    linkElement.innerText = "Delete";
    spanElement.innerHTML = counter + " " + toDoElement ;
    newElement.appendChild(spanElement);
    newElement.appendChild(linkElement);
    toDoLists.appendChild(newElement);
    newElement.querySelector('.deltebtn').addEventListener('click',deleteTodos);
    
}

// show messages 
const showMessage = (messages,type) => {
    let displayInner = document.createElement('span');
    displayInner.innerText = messages;
    displayInner.classList.add(type); 
    displayMessage.appendChild(displayInner); 

    setTimeout(() => {
        displayMessage.removeChild(displayInner);
    }, 1500);
}

// local storage data call
const localStorageData = () => {
   return localStorage.getItem('myTodos') ? JSON.parse(localStorage.getItem('myTodos')) : [];
}

// form submit 
const formSubmit = (event) => {
    event.preventDefault();
    const toDoElement = inputElement.value;
    let toDoID = Date.now().toString(); 
    createToDo(toDoID,toDoElement);
    showMessage("Todo list Created Success","success");

    const todos = localStorageData();
    todos.push({toDoID,toDoElement});
    localStorage.setItem("myTodos", JSON.stringify(todos)); 

    inputElement.value = '';
}

// load todo list
const loadToDos = () => {
    const todos = localStorageData();
    todos.map((todo) => createToDo(todo.toDoID,todo.toDoElement));
}

// event listner 
form.addEventListener('submit',formSubmit);
window.addEventListener('DOMContentLoaded',loadToDos);