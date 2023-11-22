class TaskList extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                /* Добавьте стили по вашему усмотрению */
            </style>
            <div>
                <h2>Список задач</h2>
                <form id="taskForm">
                    <input type="text" id="taskInput" placeholder="Введите новую задачу" />
                    <button type="submit">Добавить</button>
                </form>
                <ul id="taskList"></ul>
            </div>
        `;

        this.taskForm = shadow.getElementById('taskForm');
        this.taskInput = shadow.getElementById('taskInput');
        this.taskList = shadow.getElementById('taskList');

        this.taskForm.addEventListener('submit', this.addTask.bind(this));
        this.taskList.addEventListener('change', this.toggleTask.bind(this));
        this.taskList.addEventListener('click', this.deleteTask.bind(this));

        this.tasks = [];
        this.render();
    }

    addTask(event) {
        event.preventDefault();
        const taskText = this.taskInput.value.trim();
        if (taskText !== '') {
            this.tasks.push({ text: taskText, completed: false });
            this.taskInput.value = '';
            this.render();
        }
    }

    toggleTask(event) {
        const target = event.target;
        if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            const index = target.dataset.index;
            this.tasks[index].completed = target.checked;
            this.render();
        }
    }

    deleteTask(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON' && target.dataset.index !== undefined) {
            const index = target.dataset.index;
            this.tasks.splice(index, 1);
            this.render();
        }
    }

    render() {
        this.taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <button data-index="${index}">Удалить</button>
            `;
            this.taskList.appendChild(listItem);
        });
    }
}

customElements.define('task-list', TaskList);
