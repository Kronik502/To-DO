import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ToDoList() {
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('Medium');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); // Track the index of the task being edited

    const handleTaskChange = (event) => {
        setSelectedTask(event.target.value);
    };

    const handlePrioritySelect = (event) => {
        setSelectedPriority(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        if (selectedTask && taskDescription) {
            const newTask = {
                id: Date.now(), // Unique ID for each task
                task: selectedTask,
                priority: selectedPriority,
                description: taskDescription
            };
            if (editingIndex !== null) {
                // Update existing task if in editing mode
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = newTask;
                setTasks(updatedTasks);
                setEditingIndex(null); // Exit editing mode
            } else {
                // Add new task
                setTasks([...tasks, newTask]);
            }
            // Clear input fields
            setSelectedTask('');
            setSelectedPriority('Medium');
            setTaskDescription('');
        }
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        // Exit editing mode if removing the currently edited task
        if (index === editingIndex) {
            setEditingIndex(null);
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setSelectedTask(taskToEdit.task);
        setSelectedPriority(taskToEdit.priority);
        setTaskDescription(taskToEdit.description);
        setEditingIndex(index);
    };

    const handleCancelEdit = () => {
        setSelectedTask('');
        setSelectedPriority('Medium');
        setTaskDescription('');
        setEditingIndex(null);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        return task.task.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'high-priority';
            case 'Medium':
                return 'medium-priority';
            case 'Low':
                return 'low-priority';
            default:
                return '';
        }
    };

    return (
        
        <form className='all-content' onSubmit={handleAddTask}>
            <div className='des label-input'>
              
              
            <div className='addtask label-input'>
                <label className='Task'     htmlFor='task'>Add Task:</label>
                <input
                    type='text'
                    id='task'
                    name='task'
                    value={selectedTask}
                    onChange={handleTaskChange}
                    placeholder='Enter task...'
                />
            </div> 
             <label className='des' htmlFor='description'>Description:</label>
                <textarea
                    id='description'
                    name='description'
                    value={taskDescription}
                    onChange={handleDescriptionChange}
                    placeholder='Enter task description...'
                />
            </div>

            

            <div className='priority-select label-input'>
                <label htmlFor='priority'>Priority:</label>
                <select id='priority' name='priority' value={selectedPriority} onChange={handlePrioritySelect}>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
            </div>

            {editingIndex !== null ? (
                <div>
                    <button type='submit'>Update</button>
                    <button type='button' onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <button type='submit'>Add</button>
            )}

            <div className='task-list'>
                <h2>Task List:</h2>
                <input
                    type='text'
                    placeholder='Search tasks...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <ul>
                    {filteredTasks.map((task, index) => (
                        <li key={task.id} className={getPriorityClass(task.priority)}>
                            <div>
                                <strong>{task.task}</strong> - Priority: {task.priority}
                            </div>
                            <div>
                                <p>Description: {task.description}</p>
                            </div>
                            <div>
                                <button type='button' onClick={() => handleEditTask(index)}>Edit</button>
                                <button type='button' onClick={() => handleRemoveTask(index)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='create-account'>
                <p>Have an account? <Link to='/login'>Login</Link></p>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </form>
    );
}

export default ToDoList;
 