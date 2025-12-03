import React, { useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Review algebra concepts",
      completed: false,
      priority: "high",
    },
    { id: 2, text: "Study algorithms", completed: false, priority: "medium" },
    { id: 3, text: "Read physics notes", completed: true, priority: "low" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          priority: priority,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="tasks-container">
      <h2>Task Manager</h2>

      <div className="task-input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter new task..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">LOW</option>
          <option value="medium">MEDIUM</option>
          <option value="high">HIGH</option>
        </select>
        <button onClick={addTask} className="add-task-btn">
          ADD TASK
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${
              task.completed ? "completed" : ""
            } priority-${task.priority}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
            <span className="task-priority">
              [{task.priority.toUpperCase()}]
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              DELETE
            </button>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="empty-state">No tasks yet. Add one to get started.</p>
      )}
    </div>
  );
}

export default Tasks;
