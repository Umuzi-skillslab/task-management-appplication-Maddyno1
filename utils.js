// Utilities

const PRIORITIES = Object.freeze(["low", "medium", "high"]);

function saveToStorage(data) {
    try {
    localStorage.setItem("tasks", JSON.stringify(data));
    } catch (err) {
        console.error("Could not save tasks:",err);
    }
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem("tasks");
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not load tasks:", err);
        return [];
    }
}

function generateRandomId() {
    return Math.floor(Math.random() * 1_000_000);
}

function formatTaskName(name) {
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function isHighPriority(task) {
    return task.priority === "high";
}

// Class
class Task {
    #completed =false;

    constructor(name, priority = "low"){
        this.id = generateRandomId()
        this.name = formatTaskName(name);
        this.priority = PRIORITIES.includes(priority) ? priority : "low";
        this.createdAt =new Date();
    }

    complete() {
        this.#completed =true;
    }

    get isCompleted() {
        return this.#completed;
    }

    toString() {
        return `[${this.priority.toUpperCase()}] ${this.name}`;
    }
}

// Inheritance

class RecurringTask extends Task {
    constructor(name, priority, intervalDays) {
        super(name, priority);
        this.intervalDays = intervalDays;
    }

    nextOccurrence() {
        const next = new Date(this.createdAt);
        next.setDate(next.getDate() + this.intervalDays);
        return next;
    }

    toString() {
        return `${super.toString()} (repeats every ${this.intervalDays}d)`;
    }
}

// Recursion
function countTasks(node) {
    if (!node) return 0;
    let count = 1;
    for (const child of node.subtasks || []) {
        count += countTasks(child);
    }
    return count;
}

// Functional programming patterns
const getHighPriorityTasks = (tasks) => tasks.filter(isHighPriority);
const getTaskNames = (tasks) => tasks.map((t) => t.name);
const countCompleted = (tasks) =>
    tasks.reduce((acc, t) => acc + (t.isCompleted ? 1: 0), 0);

// Module exports
export {
    PRIORITIES,
    saveToStorage,
    loadFromStorage,
    generateRandomId,
    formatTaskName,
    isHighPriority,
    Task,
    RecurringTask,
    countTasks,
    getHighPriorityTasks,
    getTaskNames,
    countCompleted,
};