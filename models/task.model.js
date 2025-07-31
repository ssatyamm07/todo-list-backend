import pool from '../config/db.js';
export const getTasksByUserId = async (userId) => {
    const res = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return res.rows;
  };
  
  export const createTask = async (title, description, dueDate, userId) => {
    const res = await pool.query(
      'INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, dueDate, userId]
    );
    return res.rows[0];
  };
  
// ✅ UPDATED: Now includes status and userId check
export const updateTask = async (taskId, userId, title, description, status, dueDate) => {
    const res = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, status = $3, due_date = $4 
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [title, description, status, dueDate, taskId, userId]
    );
    return res.rows[0];
  };
  

// ✅ UPDATED: userId check to ensure only task owner can delete
export const deleteTask = async (taskId, userId) => {
    const res = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [taskId, userId]
    );
    return res.rows[0];
  };
  
  