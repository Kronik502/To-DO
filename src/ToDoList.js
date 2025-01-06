import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Todo.css';

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
      console.error('User email not found!');
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:5000/todos?email=${userEmail}`)
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching todos, please try again later.');
      });
  }, [navigate]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'green';
      case 'medium': return 'orange';
      case 'high': return 'red';
      default: return 'black';
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

    const newTask = {
      email: userEmail,
      task,
      description,
      priority,
    };

    try {
      const response = await axios.post('http://localhost:5000/todos', newTask);
      setTodos([...todos, response.data]);
      setTask('');
      setDescription('');
      setPriority('low');
      setSuccess('Task added successfully!');
    } catch (error) {
      setError('Failed to add task. Please try again.');
    }
  };

  const handleMarkAsDone = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setSuccess('Task marked as done!');
      })
      .catch(() => setError('Failed to mark task as done.'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>To-Do List</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <form onSubmit={handleAddTask}>
        <div>
          <label htmlFor="task">Task:</label>
          <input
            id="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>

      <ul>
  {todos.map((todo) => (
    <li key={todo.id} style={{ marginBottom: '10px' }}>
      <div
        style={{
          backgroundColor: getPriorityColor(todo.priority),
          padding: '10px',
          borderRadius: '5px',
          color: 'white',
        }}
      >
        <strong>{todo.task}</strong>
        <p>{todo.description}</p>
        <p>Priority: {todo.priority}</p>
        <button onClick={() => handleMarkAsDone(todo.id)}>
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
