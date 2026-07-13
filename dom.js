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
    const priorityInput = document.querySelector("#priority");

    if (!titleInput || !descInput) {
        console.error("Taks form inputs not found");
        return;
    }

    const title = titleInput.value;
    const description = descInput.value;
    const priority = priorityInput ? Number(priorityInput.value) || 1 : 1;
    
    if (!title) {
        alert("Please enter a task title.");
        titleInput.focus();
        return;
    }

    addTask(title, description, priority);
    displayTasks();
    
    //Clear inputs after adding
    titleInput.value = "";
    descInput.value = "";
    if (priorityInput) priorityInput.value = "";
}

// Function that uses proper selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    if (!container) {
        console.error("#task-list not found in the DOM");
    }
    
    
    
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
