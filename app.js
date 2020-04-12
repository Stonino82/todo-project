//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listner
document.addEventListener('DomContentLoaded', getTodos());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault(); //prevent the browser from refresh the page every time I click the button
    //create Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //creare Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value); //Call function (below) tosave the todo in localStorage
    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to UL
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        //todo.remove();
    }
    //CHECK TODO
    if(item.classList[0] === 'completed-btn'){
        // item.style.textDecoration = 'line-through';
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Chechk if I already have something in there?
    let todos;
    if(localStorage.getItem('todos') === null){ //if it doesn't exist
        todos = [];
    } else {    //if it does exist!
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos)); //Set it back to the local storage
}

//get todos from the localStorage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){ //if it doesn't exist
        todos = [];
    } else {    //if it does exist!
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //create Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //creare Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to UL
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //Chechk if I already have something in there?
    let todos;
    if(localStorage.getItem('todos') === null){ //if it doesn't exist
        todos = [];
    } else {    //if it does exist!
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));

}

