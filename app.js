// Define UI variables

const form =      document.querySelector('#task-form');
const taskList =  document.querySelector('.collection');
const clearBtn =  document.querySelector('.clear-tasks');
const filter =    document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);

};

// Get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){ // If there's nothing in local storage, create an empty array
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks')); // get the item from local storage and parse it as JSON
    }
    tasks.forEach(function (task){
        // Create li element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new delete link
        const link = document.createElement('a');
        // Add a class to the delete link
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to the li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li); 
    })
}

// Add Task

function addTask(e){
    if (taskInput.value === ''){ // If user didn't enter anything before clicking Add Task, prompt them to
        alert('Please add a task')
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new delete link
    const link = document.createElement('a');
    // Add a class to the delete link
    link.className = 'delete-item secondary-content';
    // Add delete icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append delete link to the li
    li.appendChild(link);

    // Append task li to to task list ul
    taskList.appendChild(li);

    // Save to local storage
    storeTasks(taskInput.value);

    // Clear the task input field
    taskInput.value = '';

    e.preventDefault();
}; 

// Remove task

function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')){ 
        if(confirm('Are you sure?')){
            // Target the li to remove, which is the 'grandparent' of the i tag)
            e.target.parentElement.parentElement.remove();  
            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    };
}

// Remove a task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task list

function clearTasks(e){
    //taskList.innerHTML = ''; // Alternative, slower
    while(taskList.firstChild){  // While there's still a first child in the task list, remove it
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
};

// Clear tasks from local storage

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });

};

// Store tasks in local storage

function storeTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};