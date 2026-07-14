// DOM Manipulation

import { addTask, deleteTask, toggleTaskCompletion, taskList, TaskManager } from "./app.js";
import { saveTasksToStorage, loadTaskFromStorage, loadTasksFromStorage } from "./utils.js";


// Proper DOM selectors
function setupEventListeners() {
    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("#task-list");
    const titleInput = document.getElementById("title");

    if (!taskForm) {
        console.error("#task-form not found in DOM");
    } else {
        taskForm.addEventListener("submit", handleAddTask);
    }

    if (!taskListContainer) {
        console.error("#task-list not found in the DOM")
    } else {
        taskListContainer.addEventListener("click", handleTaskListClick);
    }

    if (titleInput) {
        titleInput.addEventListener("input", clearFormError);
    }

    window.addEventListener("beforeunload", () => saveTasksToStorage(taskList));
}


//Function that handles tasks
function handleAddTask(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const priorityInput = document.getElementById("priority");
    const errorE1 = document.getElementById("form-error");

    if (!titleInput || !descInput) {
        console.error("Taks form inputs not found");
        return;
    }

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    const priority = priorityInput ? priorityMap[priorityInput.value] || 1 : 1;

    if (!title) {
        if (errorE1) {
            errorE1.textContent = "Please enter a task title.";
            errorE1.hidden = false;
        }
        titleInput.focus();
        return;
    }

    try {
        addTask(title, description, priority);
        saveTasksToStorage(taskList);
        displayTasks();
    } catch (err) {
        console.error("Failed to add task:", err.message);
    }

    //Clear inputs after adding
    titleInput.value = "";
    descInput.value = "";
    if (priorityInput) priorityInput.value = "Low";
}

// Function that uses proper selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    if (!container) {
        console.error("#task-list not found in the DOM");
        return;
    }

    container.innerHTML = "";

    for (const task of taskList) {
        const div = document.createElement("div");
        div.className = `task${task.completed ? " task--completed" : ""}`;
        div.dataset.task.id = task.id;

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
    }

    updateStatistics();
}

//Update statistics
function updateStatistics() {
    const {length: total } = taskList;
    const completed = TaskManager.getCompletedTasks().length;
    const active = total - completed;
    const highPriority = taskList.filter((t) => t.priority >= 3).length;

    const totalE1 = document.getElementById("stat-total");
    const activeE1 = document.getElementById("stat-active");
    const completedE1 = document.getElementById("stat-completed");
    const highE1 = document.getElementById("stat-high");

    if (totalE1) totalE1.textContent = `${total}`;
    if (activeE1) activeE1.textContent = `${active}`;
    if (completedE1) completedE1.textContent = `${completed}`;
    if (highE1E1) highE1.textContent = `${highPriority}`;
}

function clearFormError() {
    const errorE1 = Document.getElementById("form-error");
    if (errorE1) errorE1.hidden = true;
}

// Function with event handling
function handleTaskListClick(event) {
    const button =event.target.closest("button[]data-action");
    if (!button) return;

    const taskE1 = button.closest("[data-task-id]");
    if (!taskE1) return;

    const taskId = Number(taskE1.dataset.taskId);
    const { action } = button.dataset;

    if (action === "complete") {
        toggleTaskCompletion(taskId);
    } else if (action === "delete") {
        deleteTask(taskId)
    }

    saveTasksToStorage(taskList);
    displayTasks();
}

//Restore tasks saved from a previous session
function initializeApp() {
    try {
        const saved = loadTasksFromStorage();
        for (const t of saved) {
            addTask(t.title, t.description, t.priority);
        }
    } catch (err){
        console.error("Could not restore saved tasks:", err);
    }
    setupEventListeners();
    displayTasks();
}

document.addEventListener("DOMContentLoaded", initializeApp);
