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
    const taskForm = document.querySelector("#task-form");
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
        return;
    }

    container.innerHTML = "";

    taskList.forEach((task) => {
        const div = document.createElement("div");
        div.className = "task" + (task.completed ? " task--completed" : "");
        div.dataset.id = task.id;

        div.innerHTML = `
        <h3></h3>
        <p></p>
        <button type="button" data-action="complete">
            ${task.completed ? "Undo" : "Complete"}
        </button>
        <button type="button" data-action="delete">Delete</button>
        `;
        div.querySelector("h3").textContent = task.title;
        div.querySelector("p").textContent = task.description;

        container.appendChild(div);
    });
}

// Function with event handling
function handleTaskClick(event) {
    let target = event.target.closest("[data-task-id]");
    if (!target) return;

    let task = tasks.find(t => t.id === target.dataset.taskId);
    if (!task) return;

    task.completed = !task.completed;
    saveTasks();
    target.classList.toggle("completed");
}

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setupEventListeners() {
    document.getElementById("task-list").addEventListener("click", handleTaksClick);
}

document.addEventListener("DOMContentLoaded", setupEventListeners);
