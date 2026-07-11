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

// Function with type checking issues
function updateTaskPriority(taskId, newPriority) {
    // Missing: typeof check for parameters
    // Missing: null/undefined validation

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

// Function that should use destructuring but doesn't
function getTaskDetails(task) {

    const { title, description, priority, completed } = task;

    return { title, description, priority, completed };
}

// Function missing spread/rest operators
function mergeTasks(list1, list2) {
    // Should use spread operator
    const merged = [];
    for (let i = 0; i < list1.length; i++) {
        merged.push(list1[i]);
    }
    for (let i = 0; i < list2.length; i++) {
        merged.push(list2[i]);
    }
    return merged;
}

// Recursive function with error
function countCompletedTasks(tasks, index) {
    // Missing: base case check
    // Missing: null/undefined check

    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    } else {
        return countCompletedTasks(tasks, index + 1);
    }
}

// Function with Math object issues
function calculateAveragePriority() {
    let total = 0;
    // Missing: check for empty array
    for (let i = 0; i < taskList.length; i++) {
        let total = total + taskList[i].priority;
    }
    // Should use Math.round or toFixed
    return total / taskList.length;
}

// Filter function with errors
function getHighPriorityTasks(minPriority) {
    const highPriority = [];
    // Should use array methods (filter)
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].priority > minPriority) {
            highPriority.push(taskList[i]);
        }
    }
    return highPriority;
}

// Object with missing methods
const TaskManager = {
    tasks: taskList,

    // Missing: method to add task using functional approach
    // Missing: method using array methods (map, filter, reduce)

    getTotalTasks: function () {
        return this.tasks.length;
    }
};

// Export issues - should be a module
// Missing: proper module exports
