const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token-based authentication
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// File paths
const USERS_FILE = path.join(__dirname, 'users.json');
const TODOS_FILE = path.join(__dirname, 'todos.json');

// Utility functions for file handling
const readFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data ? JSON.parse(data) : []);
    });
  });

const writeFile = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });

// Routes

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do App');
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readFile(USERS_FILE);
    
    if (users.some((user) => user.email === email)) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);  // Hash the password
    users.push({ email, password: hashedPassword });
    await writeFile(USERS_FILE, users);
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error processing registration');
  }
});

// Login a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readFile(USERS_FILE);
    const user = users.find((u) => u.email === email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error processing login');
  }
});

// Create a new to-do
app.post('/todos', async (req, res) => {
  try {
    const { email, task, description, priority } = req.body;
    if (!task || !description || !priority) {
      return res.status(400).send("Task, description, and priority are required.");
    }

    const todos = await readFile(TODOS_FILE);
    todos.push({ id: Date.now(), email, task, description, priority });
    await writeFile(TODOS_FILE, todos);
    res.status(201).send('To-Do added successfully');
  } catch (error) {
    res.status(500).send('Error creating to-do');
  }
});

// Get all to-dos for a specific user
app.get('/todos', async (req, res) => {
  try {
    const { email } = req.query;
    const todos = await readFile(TODOS_FILE);
    const userTodos = todos.filter((todo) => todo.email === email);
    res.status(200).json(userTodos);
  } catch (error) {
    res.status(500).send('Error fetching to-dos');
  }
});

// Delete a to-do
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readFile(TODOS_FILE);
    const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id));

    if (updatedTodos.length === todos.length) {
      return res.status(404).send('To-Do not found');
    }

    await writeFile(TODOS_FILE, updatedTodos);
    res.status(200).send('To-Do deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting to-do');
  }
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
