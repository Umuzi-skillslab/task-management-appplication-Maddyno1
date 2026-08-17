// Task Management Application - Starter Code with Errors

import { saveTasksToStorage, isHighPriority } from "./utils.js"

const taskList = [];
let taskCounter = 0;

//Task class
class Task {
    constructor(id, title, description, priority) {
        if (typeof title !== "string" || !title.trim()) {
            throw new TypeError("Task title must be a non-empty string");
        }
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
        return this.completed;
    }

    getInfo() {
        const status = this.completed ? "Completed" : "Pending";
        return `Task: ${this.title} - Priority: ${this.priority} - Status: ${status}`;
    }
}

// Subtask class
class SubTask extends Task {
    constructor(id, title, description, priority, parentTask) {
        super(id, title, description, priority)
        this.parentTask = parentTask;
    }

    getInfo() {
        return `${super.getInfo()} [SubTask of: ${this.parentTask}]`;
    }
}

//Higher-order function
function createPriorityFilter(minPriority) {
    return (task) => task.priority > minPriority;
}

// Function with  error handling
function addTask(title, description, priority) {
    try {
        if (typeof priority !== "number" || priority < 1) {
            throw new Error(`Cannot add task "${title}": priority must be a positive number`);
        }
        const newTask = new Task(taskCounter, title, description, priority);
        taskList.push(newTask);
        taskCounter++;
        return newTask;
    } catch (err) {
        console.error(err.message);
        return undefined;
    }
}

function deleteTask(taskId) {
    const index = taskList.findIndex((task) => task.id === taskId);
    if (index === -1) return false;
    taskList.splice(index, 1);
    return true;
}

function toggleTaskCompletion(taskId) {
    const task = taskList.find((t) => t.id === taskId);
    if (!task) return false;
    return task.toggleCompletion();
}

// Function with for...of loop
function displayAllTasks() {
    for (const task of taskList) {
        console.log(task.getInfo());
    }
}

function findTaskByTitle(title) {
    for (const task of taskList) {
        if (task.title === title) return task;
    }
    return undefined;
}

// Function with type checking
function updateTaskPriority(taskId, newPriority) {
    if (typeof newPriority !== "number" || newPriority < 1) {
        console.error(`Priority ${newPriority} is invalid; must be a positive number`);
        return false;
    }

    const task = taskList.find((t) => t.id === taskId);
    if (!task) return false;
    task.priority = newPriority;
    return true;
}

// Function that uses destructuring
function getTaskDetails({ title, description, priority, completed }) {
    return { title, description, priority, completed };
}

function cloneTask(task) {
    return { ...task };
}
// Function with spread/rest operators
function mergeTasks(...lists) {
    return lists.reduce((all, list) => [...all, ...list], []);
}

// Recursive function
function countCompletedTasks(tasks, index = 0) {
    if (!Array.isArray(tasks)) return 0
    if (index >= tasks.length) return 0;

    const [current] = tasks.slice(index, index + 1);
    const increment = current && current.completed ? 1 : 0
    return increment + countCompletedTasks(tasks, index + 1);
}

// Function with Math object
function calculateAveragePriority() {
    if (!Array.isArray(tasks) || tasks.length === 0) return 0;
    const total = tasks.reduce((sum, task) => sum + task.priority, 0);
    return Math.round((total /tasks.length) * 100) /100
}

// Filter function
function getHighPriorityTasks(minPriority) {
    return taskList.filter(createPriorityFilter(minPriority));
}

// Object with correct methods
const TaskManager = {
    tasks: taskList,
    getTotalTasks() { return this.tasks.length; },
    getCompletedTasks() { return this.tasks.filter(t => t.completed); },
    getAveragePriority() {
        if (!this.tasks.length) return 0;
        return this.tasks.reduce((sum, t) => sum + t.priority, 0) /
            this.tasks.length;
    },
    getSummary() {
        const { length: total } = this.tasks;
        const completed = this.getCompletedTasks().length;
        return `${completed}/${total} tasks completed`;
    },
    persist() {
        saveTasksToStorage(this.tasks);
    },
};

export {
    Task, SubTask, TaskManager, addTask, deleteTask, toggleTaskCompletion, getTaskDetails,
    displayAllTasks, findTaskByTitle, updateTaskPriority, cloneTask, mergeTasks,
    countCompletedTasks, calculateAveragePriority,getHighPriorityTasks, createPriorityFilter,
    isHighPriority, taskList,
};
