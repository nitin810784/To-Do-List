// script.js
document.addEventListener('DOMContentLoaded', loadTasks);

document.querySelector('#task-form').addEventListener('submit', addTask);

document.querySelector('#task-list').addEventListener('click', removeTask);

document.querySelector('#task-list').addEventListener('click', toggleComplete);

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task.text));

        const link = document.createElement('button');
        link.innerHTML = '&times;';
        link.className = 'delete-task';
        li.appendChild(link);

        if (task.completed) {
            li.classList.add('completed');
        }

        document.querySelector('#task-list').appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.querySelector('#task-input').value;
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput));

    const link = document.createElement('button');
    link.innerHTML = '&times;';
    link.className = 'delete-task';
    li.appendChild(link);

    document.querySelector('#task-list').appendChild(li);

    storeTaskInLocalStorage(taskInput);

    document.querySelector('#task-input').value = '';
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.classList.contains('delete-task')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent.includes(task.text)) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');

        updateTaskStatusInLocalStorage(e.target);
    }
}

function updateTaskStatusInLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        if (taskItem.textContent.includes(task.text)) {
            task.completed = !task.completed;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
