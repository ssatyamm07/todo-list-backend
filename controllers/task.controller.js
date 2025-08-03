import { Task } from '../models/index.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.create({ title, description, dueDate, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate } = req.body;
  try {
    const [updated] = await Task.update(
      { title, description, status, dueDate },
      { where: { id: taskId, userId: req.user.id } }
    );
    if (!updated) return res.status(404).json({ error: 'Task not found' });

    const task = await Task.findByPk(taskId);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deleted = await Task.destroy({ where: { id: taskId, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

