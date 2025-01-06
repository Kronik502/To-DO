To-Do List Application
Overview
This To-Do List application allows users to manage their tasks efficiently. Users can log in, add, edit, and remove tasks, and filter tasks by name. Each task can have a description and priority level, which is visually represented by different colors.

Features
User authentication (mock login)
Add, edit, and remove tasks
Assign priority levels to tasks (High, Medium, Low)
Search functionality to filter tasks
Responsive design
Technologies Used
React
React Router
CSS for styling
Installation
To run the application locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/todo-list-app.git
Navigate to the project directory:

bash
Copy code
cd todo-list-app
Install dependencies:

bash
Copy code
npm install
Start the application:

bash
Copy code
npm start
Open your browser and go to:

arduino
Copy code
http://localhost:3000
Usage
Login: Click on the "Login" link to mock log in as a user. A username will be assigned automatically.

Add Task: Enter the task name, description, and select a priority level. Click "Add Task" to add it to your list.

Edit Task: Click "Edit" on a task to modify it. You can change the task name, description, or priority.

Remove Task: Click "Remove" to delete a task from the list.

Search Tasks: Use the search bar to filter tasks by name.

Logout: Click the "Logout" button to log out and clear your tasks.

CSS Styles
The application uses CSS classes to assign different colors to tasks based on their priority level:

High Priority: Light red background
Medium Priority: Light yellow background
Low Priority: Light green background