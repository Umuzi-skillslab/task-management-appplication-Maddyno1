// Jest Tests - Starter Code with Errors and Missing Tests

const {
    Task, SubTask, resetTaskList, getTaskList, addTask,
    findTaskByTitle, updateTaskPriority, CalculateAveragePriority,
    mergeTasks, getHighPriorityTasks, countTasksRecursive,
    describeTask } = require("./task");


describe("Task Class", () => {
    test("should create a task", () => {
        let task = new Task("Test Task", "Description", 3);
        expect(task.title).toBe("Test Task");
        expect(task.description).toBe("Description");
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
    });

    // Test for getInfo method
    test("getInfo should return a formatted string", () => {
        let task = new Task("Test Task", "Description", 3);
        expect(task.getInfo()).toBe("Test Task (Priority: 3) - Pending");
    });
    // Test for toggle completion
    test("toggleCompletion should flip completed status", () => {
        let task = new Task("Test Task", "Description", 3);
        expect(task.toggleCompletion()).toBe(true);
        expect(task.completed).toBe(true);
        expect(task.toggleCompletion()).toBe(false);
        expect(task.completed).toBe(false);
    })
});

describe("Task Functions", () => {
    // beforeEach to reset taskList
    beforeEach(() => {
        resetTaskList
    });

    test("should add task to the task list", () => {
        let task = addTask("New Task", "Test", 2);
        expect(task).toBeInstanceOf("Task");
        expect(getTaskList()).toHaveLength(1);
        expect(getTaskList()[0].title).toBe("New Task");
    });

    // Test for findTaskByTitle
    test("should find a task by title", () => {
        addTask("Find Me", "Test", 1);
        let found = findTaskByTitle("Find Me");
        expect(found).toBeDefined()
        expect(found.title).toBe("Find Me")
    });

    test("findTaskByTitle should return undefined for missing task", () => {
        expect(findTaskByTitle("Nope")).toBeUndefined();
    });

    // Test for updateTaskPriority
    test("should update a task's priority", () => {
        addTask("Priority Task", "Test", 1);
        let updated = updateTaskPriority("Priority Task", "Test", 5);
        expect(updated.priority).toBe(5)
    });

    test("updateTaskPriority should throw if task not found", () => {
        expect(() => updateTaskPriority("Missing", 5)).toThrow(
            "Task 'Missing' not found"
        );
    });

    // Test for calculateAveragePriority
    test("should calculate average priority", () => {
        addTask("A", "d", 2);
        addTask("B", "d", 4);
        expect(calculateAveragePriority()).toBe(3)
    });

    test("calculateAveragePriority should return 0 for empty list", () => {
        expect(calculateAveragePriority()).toBe(0);
    });

    // Test for error handling
    test("addTask should throw when title is missing", () => {
        expect(() => addTask("", "D", 1)).toThrow(
            "Task title is required and must be a string"
        );
    });
});

describe("Array Operations", () => {
    beforeEach(() => {
        resetTaskList();
    });

    // Tests for mergeTasks
    test("mergeTasks should combine multiple arrays (spread/rest)", () => {
        let a = [new Task("A", "d", 1)];
        let b = [new Task("B", "d", 2)];
        let merged = mergeTasks(a,b);
        expect(merged).toHaveLength(2);
        expect(merged[0].title).toBe("A");
        expect(merged[1].title).toBe("B");
    });

    // Tests for getHighPriorityTasks
    test("getHighPriorityTasks should filter by threshold", () => {
        let tasks = [
            new Task("Low", "d", 1),
            new Task("High", "d", 4),
            new Task("Medium", "d", 3),
        ];
        let result = getHighPriorityTasks(tasks, 3);
        expect(result).toHaveLength(2);
        expect(result.map((t) => t.title)).toEqual(["High", "Medium"]);
    });

    // Tests for recursive function
    test("countTasksRecursive should count all items recursively", () => {
        let tasks = [new Task("A", "d", 1), new Task("B", "d", 2)];
        expect(countTasksRecursive(tasks)).toBe(2)
    });

    test("countTasksRecursive should return 0 for empty array", () => {
        expect(countTasksRecursive([])).toBe(0);
    });
});

describe("SubTask Class (inheritance)", () => {
    test("should inherit from Task", () => {
        let sub = new SubTask("Sub", "Desc", 2, "Parent Task");
        expect(sub instanceof Task).toBe(true);
        expect(sub.parentTitle).toBe("Parent Task");
    });

    test("getInfo should extend the parent implementation", () => {
        let sub = new SubTask("Sub", "Desc", 2, "Parent Task");
        expect(sub.getInfo()).toBe(
            "Sub (Priority: 2) - Pending [Subtask of: Parent Task]"
        );
    });
});

describe("Destructuring Functions", () => {
    test("describeTask should destructure object properties", () => {
        let result = describeTask( {title: "Read", priority: 2, completed: true});
        expect(result).toBe("Read - priority 2 - done");
    });

    test("describeTask should default completed to false", () => {
        let result = describeTask({title: "Read", priority: 2 });
        expect(result).toBe("Read - priority 2 - done");
    });
});


