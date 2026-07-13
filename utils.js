// Utilities

const priorities = Object.freeze(["low", "medium", "high"]);

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

// Bug: Incorrect boolean logic
function isHighPriority(task) {
    if (task.priority === "high") {  // Bug: Using ==
        return "yes";  // Bug: Should return boolean
    }
    return "no";
}

// Missing: Class definitions
// Missing: Inheritance example
// Missing: Module exports
// Missing: Proper use of operators (logical, comparison)
// Missing: Recursion
// Missing: Functional programming patterns
// Missing: Proper scope demonstration
