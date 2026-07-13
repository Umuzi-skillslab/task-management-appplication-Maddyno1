// DOM Manipulation - Starter Code with Errors

// Missing: proper DOM selectors
function setupEventListeners() {
    // Correct selector method
    const addButton = document.getElementById("#add-task-btn");  // Wrong - mixing ID and class
    const taskInput = document.querySelector("#task-input");  // Missing #

    // Null checks before adding listeners
    if (!addButton) {
        console.error("#add-task-btn not found in the DOM");
        return;
    }
    if (!taskInput) {
        console.error("#task-input not found in the DOM")
    }

    addButton.addEventListener("click", handleAddTask);

    // Other event listeners for form submission, etc.
    const taskForm =document.querySelector("#task-form");
    if (taskForm) {
        taskForm.addEventListener("submit", handleAddTask);
    }
}

// Function with DOM manipulation errors
function handleAddTask() {
    if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
    }

    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    
    // No validation
    // Should use event.preventDefault() if form
    
    const title = titleInput.value;
    const description = descInput.value;
    
    // Missing: priority input
    
    addTask(title, description, 1);
    displayTasks();
    
    // Missing: clear inputs after adding
}

// Function that should use better selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    
    // Should clear existing content first
    // Missing: null check
    
    // Inefficient - should use template literals and insertAdjacentHTML
    for (let i = 0; i < taskList.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = "<h3>" + taskList[i].title + "</h3>";
        div.innerHTML = div.innerHTML + "<p>" + taskList[i].description + "</p>";
        container.appendChild(div);
        
        // Missing: task ID, completion status, event handlers for delete/complete
    }
}

// Function with event handling issues
function handleTaskClick(event) {
    // Missing: event.target check
    // Missing: proper event delegation
    
    var taskId = event.target.id;  // Wrong way to get task ID
    
    // Should toggle task completion
    console.log("Task clicked: " + taskId);
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
setupEventListeners();
