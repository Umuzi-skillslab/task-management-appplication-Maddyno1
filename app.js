// Task Management Application - Starter Code with Errors

let taskList = [];
let taskCounter = 0;

//Task class
class Task {
    constructor(id, title, description, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompletion() { this.completed = !this.completed; }

    getInfo() {
        return `Task: ${this.title} - Priority: ${this.priority}`;
    }
}

// Subtask class with inheritance issues
class SubTask extends Task {
    constructor(id, title, description, priority, parentTask) {
        super(id, title, description, priority)
        this.parentTask = parentTask;
    }
}

// Functions with errors

// Function with  error handling
function addTask(title, description, priority) {
    if (typeof title !== "string" || !title.trim()) {
        console.log("Cannot add task:Title must be a non-empty string");

        return undefined;
    }
    const newTask = new Task(taskCounter, title, description, priority);
    taskList.push(newTask);
    taskCounter++;
    return newTask;
}

// Function with incorrect loop
function displayAllTasks() {
    // Wrong loop - should use for-of
    for (const task of taskList) {
        console.log(task.title);
    }
}

// Function missing parameter
function findTaskByTitle(title) {
    // Wrong loop construct
    let i = 0;
    while (i < taskList.length) {
        if (taskList[i].title === title) {
            return taskList[i];
        }
        i++
    }
    return undefined;
}

// Function with type checking
function updateTaskPriority(taskId, newPriority) {
    if (typeof newPriority !== "number" || newPriority < 1) {
        console.log("Priority must be a positive number");
        return false;
    }

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Function that uses destructuring
function getTaskDetails(task) {

    const { title, description, priority, completed } = task;

    return { title, description, priority, completed };
}

// Function with spread/rest operators
function mergeTasks(list1, list2) {
    return [...list1, list2];
}

// Recursive function with error
function countCompletedTasks(tasks, index = 0) {
    if (index >= tasks.length) return 0;
    // Missing: null/undefined check

    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    } else {
        return countCompletedTasks(tasks, index + 1);
    }
}

// Function with Math object issues
function calculateAveragePriority() {
    if (taskList.length === 0) return 0;
    let total = 0;
    // Missing: check for empty array
    for (let i = 0; i < taskList.length; i++) {
        let total = total + taskList[i].priority;
    }
    // Should use Math.round or toFixed
    return Math.round((total / taskList.length) * 100) / 100;
}

// Filter function with errors
function getHighPriorityTasks(minPriority) {
    return taskList.filter(t => t.priority > minPriority);
}

// Object with missing methods
const TaskManager = {
    tasks: taskList,
    getTotalTasks() { return this.task.length; },
    getCompletedTasks() { return this.task.filter(t => t.completed); },
    getAveragePriority() {
        if (!this.tasks.length) return 0;
        return this.tasks.reduce((s, t) => s + t.priority, 0) /
        this.task.length;
    }
};

export {
    Task, SubTask, TaskManager,
    addTask, findTaskByTitle, updateTaskPriority,
    mergeTasks, getHighPriorityTasks
};
