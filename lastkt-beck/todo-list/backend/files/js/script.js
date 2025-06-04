document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const tasks = getTasks();
    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);

    taskInput.value = '';
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="toggle-btn" onclick="toggleTask(${task.id})">${task.completed ? 'отменить' : 'выполнить'}</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">удалить</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks(tasks);
    }
}

function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks(tasks);
}

function loadTasks() {
    const tasks = getTasks();
    renderTasks(tasks);
}