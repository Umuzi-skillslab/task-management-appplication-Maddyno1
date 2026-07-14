// Utilities

const PRIORITIES = Object.freeze(["low", "medium", "high"]);

function saveTasksToStorage(tasks) {
    try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
        console.error("Could not save tasks:",err);
    }
}

function loadTasksFromStorage() {
    try {
        const raw = localStorage.getItem("tasks");
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not load tasks:", err);
        return [];
    }
}

function formatTaskName(name) {
    if (typeof name !== "string") {
        throw new TypeError("formatTaskName expects a string");
    }
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function isHighPriority(task, threshold = 3) {
    return task.priority >= threshold;
}

function validateAll(...values) {
    return values.every((value) => value !== null && value !== undefined);
}

// Module exports
export {
    PRIORITIES,
    saveTasksToStorage,
    loadTasksFromStorage,
    formatTaskName,
    isHighPriority,
    validateAll,
};