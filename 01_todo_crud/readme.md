# **TO-DO REST API**

## Overview

This is a RESTful API built with Express.js for managing a To-Do list. It allows users to create, read, update, and delete tasks efficiently while ensuring a structured and scalable backend.

## Features

- Create, update, delete, and fetch To-Do tasks
- Mark tasks as completed or pending
- Structured error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose ORM
- dotenv for environment variables

## Installation

1. Clone the repository:

    ```bash
    https://github.com/ma3llim007/backend_project
    ```

2. Navigate to the project directory:

    ```bash
    cd 01_todo_crud
    ```

3. Install dependencies:

    ```bash
    yarn
    ```

4. Set up environment variables:

    ```bash
    cp .env.sample .env
    ```

    Update `.env` file with database URI and other configurations.

5. Start the frontend server:
    ```bash
    yarn start
    ```
    This will start the development server and open the project in your default browser at `http://localhost:8000`.

## Usage

### 1. Get All Tasks

- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieves a list of all tasks.
- **Response:**
    ```json
    {
        "success": true,
        "tasks": [
            {
                "_id": "123",
                "todoTitle": "Buy groceries",
                "todoDescription": "Purchase fruits and vegetables",
                "todoStatus": "Not Started"
            }
        ]
    }
    ```

### 2. Get Task by ID

- **Endpoint:** `GET /api/tasks/:id`
- **Description:** Retrieves a single task by ID.
- **Response:**
    ```json
    {
        "success": true,
        "task": {
            "_id": "123",
            "todoTitle": "Buy groceries",
            "todoDescription": "Purchase fruits and vegetables",
            "todoStatus": "Not Started"
        }
    }
    ```

### 3. Create a New Task

- **Endpoint:** `POST /api/tasks`
- **Description:** Adds a new task to the database.
- **Request Body:**
    ```json
    {
        "todoTitle": "Finish project",
        "todoDescription": "Complete the backend for the to-do app",
        "todoStatus": "In Progress"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "task": {
            "_id": "456",
            "todoTitle": "Finish project",
            "todoDescription": "Complete the backend for the to-do app",
            "todoStatus": "In Progress"
        }
    }
    ```

### 4. Update a Task

- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Updates an existing task.
- **Request Body:**
    ```json
    {
        "todoTitle": "Complete the report",
        "todoDescription": "Finalize and submit the quarterly report",
        "todoStatus": "Done"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "task": {
            "_id": "456",
            "todoTitle": "Complete the report",
            "todoDescription": "Finalize and submit the quarterly report",
            "todoStatus": "Done"
        }
    }
    ```

### 5. Delete a Task

- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Deletes a task by ID.
- **Response:**
    ```json
    {
        "success": true,
        "message": "Task deleted successfully"
    }
    ```

## Development

To contribute to this project:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ma3llim007/backend_project/
    ```

2. **Create a new branch** for your feature or fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes** and **commit** them:

    ```bash
    git add .
    git commit -m "Describe your changes here"
    ```

4. **Push your changes** to GitHub:

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Open a pull request** on GitHub and describe your changes.

## Contribution Guidelines

- Ensure code follows best practices and project structure.
- Provide clear documentation for new features or updates.
- Submit detailed pull requests with clear descriptions.
- Report bugs and suggest improvements via GitHub Issues.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions, please [open an issue](https://github.com/ma3llim007/backend_project/issues) or [submit a pull request](https://github.com/ma3llim007/backend_project/pulls).


## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Acknowledgements

- **Node.js & Express.js:** For building the backend.
- **MongoDB & Mongoose:** For a structured database.
- **dotenv:** For managing environment variables.