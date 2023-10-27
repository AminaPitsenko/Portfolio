//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event
  form.addEventListener('submit', addTask);
  //Delete task event
  taskList.addEventListener('click', removeTask);
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks)
}

//Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement('li');
    //Add a class 
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task))
    //Create new link element and add a class
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add an html icon to link
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    //Append link to li
    li.appendChild(link)
    //Add li to the ul
    taskList.appendChild(li);

  });
}

//Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }
  else {
    //Create li element
    const li = document.createElement('li');
    //Add a class 
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value))
    //Create new link element and add a class
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add an html icon to link
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    //Append link to li
    li.appendChild(link)
    //Add li to the ul
    taskList.appendChild(li);

    //Store to LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear Tasks
function clearTasks() {
  //We can do it simply like that:
  //taskList.InnerHTML = '';

  //Faster way: loop through
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //Get all the items in a list
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    }
  )
}