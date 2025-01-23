import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    apiClient
      .get(`/todos?email=${userEmail}`)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError('Error fetching todos, please try again later.');
      });
  }, [navigate]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '#4caf50';
      case 'medium':
        return '#ff9800';
      case 'high':
        return '#f44336';
      default:
        return '';
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      setError('Please log in first!');
      return;
    }

    const newTask = { email: userEmail, task, description, priority };

    try {
      await apiClient.post('/todos', newTask);
      window.location.reload(); // Refresh the page after adding the task
    } catch (error) {
      console.error(error);
      setError('Failed to add task. Please try again.');
    }
  };

  const handleMarkAsDone = (id) => {
    apiClient
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setSuccess('Task marked as done!');
      })
      .catch(() => setError('Failed to mark task as done.'));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!loading && todos.length === 0) {
    return <div className="empty-state">No tasks available. Add a new task to get started!</div>;
  }

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      {error && <div className="todo-error">{error}</div>}
      {success && <div className="todo-success">{success}</div>}

      <form className="todo-form" onSubmit={handleAddTask}>
        <div className="form-group">
          <label htmlFor="task" className="form-label">Task:</label>
          <input
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button className="todo-submit-btn" type="submit">Add Task</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div
              className={`todo-card ${todo.priority}-priority`}
              style={{ backgroundColor: getPriorityColor(todo.priority) }}
            >
              <h2 className="todo-task">{todo.task}</h2>
              <p className="todo-description">{todo.description}</p>
              <p className="todo-priority">Priority: {todo.priority}</p>
              <button
                className="todo-done-btn"
                onClick={() => handleMarkAsDone(todo.id)}
              >
                Mark as Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
