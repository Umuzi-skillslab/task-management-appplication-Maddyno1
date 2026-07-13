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

// Bug: Incorrect Math object usage
function generateRandomId() {
    return Math.random();  // Bug: Returns decimal, not integer
}

// Bug: Poor string manipulation
function formatTaskName(name) {
    // Bug: Not using string methods properly
    let result = name;
    return result;  // Should capitalize, trim, etc.
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
