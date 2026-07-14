// Jest Tests

import {
    Task, SubTask, TaskManager, addTask, deleteTask, toggleTaskCompletion,
    findTaskByTitle, updateTaskPriority, getTaskDetails, mergeTasks,
    countCompletedTasks, calculateAveragePriority, getHighPriorityTasks,
    taskList,
} from "./app.js";

beforeEach(() => {
    taskList.length = 0;
});

describe("Task Class", () => {
    test("should create a task with the given properties", () => {
        const task = new Task(1, "Test Task", "Description", 3);
        expect(task.title).toBe("Test Task");
        expect(task.description).toBe("Description");
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
    });

    // Test for getInfo method
    test("getInfo should return a formatted string", () => {
        const task = new Task(1, "Test Task", "Description", 3);
        expect(task.getInfo()).toBe("Task: Test Task - Priority: 3 - Status: Pending");
    });
    // Test for toggle completion
    test("toggleCompletion should flip completed status", () => {
        const task = new Task(1, "Test Task", "Description", 3);
        expect(task.toggleCompletion()).toBe(true);
        expect(task.completed).toBe(true);
        expect(task.toggleCompletion()).toBe(false);
        expect(task.completed).toBe(false);
    });

    //Edge case
    test("should throw when created with an empty title", () => {
        expect(() => new Task(1, "", "Description", 3)).toThrow(
            "Task title must be a non-empty string"
        );
    });
});

describe("SubTask class (inheritance)", () => {
    test("should be an instance of Task", () => {
        const sub = new SubTask(1, "Sub", "Desc", 2, "Parent Task");
        expect(sub instanceof Task).toBe(true);
        expect(sub.parentTask).toBe("Parent Task");
    });

    test("getInfo should extend the parent implementation via super()", () => {
        const sub = new SubTask(1, "Sub", "Desc", 2, "Parent Task");
        expect(sub.getInfo()).toBe(
            "Task: Sub - Priority: 2 - Status: Pending [SubTask of: Parent Task]"
        );
    });
});

describe("Task list function", () => {
    test("addTask should add task to the task list", () => {
        const task = addTask("New Task", "Test", 2);
        expect(task).toBeInstanceOf(Task);
        expect(taskList).toHaveLength(1);
        expect(taskList[0].title).toBe("New Task");
    });

    test("addTask should return undefined and not throw for an invalid property", () => {
        const task = addTask("Bad Task", "Test", -1);
        expect(task).toBeUndefined();
        expect(taskList).toHaveLength(0);
    });

    test("deleteTask should remove a task by id", () => {
        const task = addTask("Removable", "Test", 1);
        expect(deleteTask(task.id)).toBe(true);
        expect(taskList).toHaveLength(0);
    });

    test("deleteTask should return false for an id that does not exist", () => {
        expect(deleteTask(999)).toBe(false);
    });

    test("toggleTaskCompletion should toggle a task found by id", () => {
        const task = addTask("Toggle Me", "Test", 1);
        expect(toggleTaskCompletion(task.id)).toBe(true);
        expect(task.completed).toBe(true)
    });

    // Test for findTaskByTitle
    test("findTaskByTitle should find an existing task", () => {
        addTask("Find Me", "Test", 1);
        const found = findTaskByTitle("Find Me");
        expect(found).toBeDefined()
        expect(found.title).toBe("Find Me")
    });

    test("findTaskByTitle should return undefined for missing task", () => {
        expect(findTaskByTitle("Nope")).toBeUndefined();
    });

    // Test for updateTaskPriority
    test("updateTaskPriority should update a task's priority", () => {
        const task = addTask("Priority Task", "Test", 1);
        expect(updateTaskPriority(task.id, 5)).toBe(true);
        expect(task.priority).toBe(5)
    });

    test("updateTaskPriority should return false for an invalid priority", () => {
        const task = addTask("Priority Task", "Test", 1);
        expect(updateTaskPriority(task.id, -5)).toBe(false);
        expect(task.priority).toBe(1)
    });
});

describe("Destructuring", () => {
    test("getTaskDetails should destructure task properties", () => {
        const task = addTask("Read", "Book", 2);
        const details = getTaskDetails(task);
        expect(details).toEqual({
            title: "Read",
            description: "Book",
            priority: 2,
            completed: false
        });
    });
});

describe("Array Operations(spread/rest)", () => {
    test("mergeTasks should combine multiple arrays using spread and rest)", () => {
        const a = [addTask("A", "d", 1)];
        const b = [addTask("B", "d", 2)];
        const merged = mergeTasks(a, b);
        expect(merged).toHaveLength(2);
        expect(merged.map((t) => t.title)).toEqual(["A", "B"]);
    });

    // Tests for getHighPriorityTasks
    test("getHighPriorityTasks should filter tasks above a threshold", () => {
        addTask("Low", "d", 1);
        addTask("High", "d", 4);
        addTask("Medium", "d", 3);
        const result = getHighPriorityTasks(2);
        expect(result.map((t) => t.title)).toEqual(["High", "Medium"]);
    });

    // Test for calculateAveragePriority
    test("calculateAveragePriority should compute the average", () => {
        addTask("A", "d", 2);
        addTask("B", "d", 4);
        expect(calculateAveragePriority()).toBe(3)
    });

    test("calculateAveragePriority should return 0 for empty list", () => {
        expect(calculateAveragePriority()).toBe(0);
    });
});

describe("Recursive function", () => {
    // Tests for recursive function
    test("countCompletedTasks should count completed tasks recursively", () => {
        const tasks = [new Task(1, "A", "d", 1), new Task(2, "B", "d", 2)];
        tasks[0].toggleCompletion();
        expect(countcompleted(tasks)).toBe(1)
    });

    test("countCompletedTasks should return 0 for empty array", () => {
        expect(countCompletedTasks([])).toBe(0);
    });

    test("countCompletedTasks should return 0 for an empty array", () => {
        expect(countCompletedTasks(null)).toBe(0);
        expect(countCompletedTasks(undefined)).toBe(0);
    });
});

describe("TaskManager", () => {
    test("getTotalTasks and getCompletedTasks should reflect the current task list", () => {
        const t1 = addTask("A", "d", 1);
        addTask("B", "d", 2);
        toggleTaskCompletion(t1.id);

        expect(TaskManager.getTotalTasks()).toBe(2);
        expect(TaskManager.getCompletedTasks()).toHaveLength(1);
    });

    test("getAveragePriority should computes the average across all tasks", () => {
        addTask("A", "d", );
        addTask("B", "d", 6);
        expect(TaskManager.getAveragePriority()).toBe(4);
    });

    test("getSummary should describe completion progress", () => {
        const t1 = addTask("A", "d", 1);
        addTask("B", "d", 2);
        toggleTaskCompletion(t1.id);
        expect(TaskManager.getSummary()).toBe("1/2 tasks completed");
    });
});


