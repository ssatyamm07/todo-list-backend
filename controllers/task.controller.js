import * as Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getTasksByUserId(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.createTask(title, description, dueDate, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    console.log(req.params);
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id;
  
    try {
      const updatedTask = await Task.updateTask(taskId, userId, title, description, status, dueDate);
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found or unauthorized" });
      }
      res.json(updatedTask);
    } catch (err) {
      console.error('Update Task Error:', err);
      res.status(500).json({ error: err.message });
    }
  };

  export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user.id;  // ✅ Get authenticated user ID
    console.log(req.params);
  
    try {
      const task = await Task.deleteTask(taskId, userId);  // ✅ Pass userId
      if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Uncomment the following methods if you need to implement them
// export const getTaskById = async (req, res) => {
//   const { taskId } = req.params;
//   try {
//     const task = await Task.getTaskById(taskId);
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// export const getTasksByDueDate = async (req, res) => {
//   const { dueDate } = req.query;
//   try {
//     const tasks = await Task.getTasksByDueDate(req.user.id, dueDate);
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getTasksByStatus = async (req, res) => {
//   const { status } = req.query;
//   try {
//     const tasks = await Task.getTasksByStatus(req.user.id, status);
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

