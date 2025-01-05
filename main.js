const form = document.querySelector('#form-id');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const clearButton = document.querySelector('.btn-clear');

let tasks = [];

// Загружаем задачи из localStorage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

// Слушатель для добавления новой задачи
form.addEventListener('submit', addTask);

// Слушатель для выполнения и удаления задачи
taskList.addEventListener('click', handleTaskAction);

// Слушатель для очистки всех задач
clearButton.addEventListener('click', clearAllTasks);

// Функция для отображения задач
function renderTasks() {
    taskList.innerHTML = ''; // Очищаем список
    tasks.forEach(function (task) {
        const cssClass = task.done ? 'main-task-title main-task-title--done' : 'main-task-title';
        const taskHTML = `<div id="${task.id}" class="main-task">
            <span class="${cssClass}">${task.text}</span>
            <div class="main-btns">
                <button type="button" data-action="done">
                    <img src="./img/tick.svg" alt="done" width="18px" height="18">
                </button>
                <button type="button" data-action="delete">
                    <img src="./img/cross.svg" alt="delete" width="18px" height="18">
                </button>
            </div>
        </div>`;
        taskList.insertAdjacentHTML('beforeend', taskHTML);
    });
}

// Функция для добавления задачи
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === '') return; // Проверка на пустой ввод

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
}

// Функция для обработки действий с задачами (удаление или выполнение)
function handleTaskAction(event) {
    const action = event.target.dataset.action;

    if (!action) return;

    const parentNode = event.target.closest('.main-task');
    const id = parentNode.id;

    if (action === 'delete') {
        tasks = tasks.filter(task => task.id != id);
    } else if (action === 'done') {
        const task = tasks.find(task => task.id == id);
        task.done = !task.done;
    }

    saveToLocalStorage();
    renderTasks();
}

// Функция для очистки всех задач
function clearAllTasks() {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
}

// Функция для сохранения задач в localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
