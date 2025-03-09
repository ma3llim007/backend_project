# **User Authentication & CRUD App**

## **Overview**

This project is a **full-stack web application** built using **Node.js, Express.js, MongoDB, EJS, and TailwindCSS**. It provides **user authentication (register, login, logout)** along with **CRUD functionality** for managing user-related data.

## **Features**

- **User Authentication** (Register, Login, Logout) with hashed passwords
- **Session-based authentication** with **JWT or Passport.js**
- **EJS templating** for dynamic frontend pages
- **TailwindCSS for responsive UI design**
- **Form validation & error handling**
- **Secure password hashing with bcrypt.js**
- **Flash messages for user notifications**

## **Technologies Used**

- **Frontend:** EJS, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT or Passport.js, bcrypt.js
- **Environment Variables:** dotenv

## Installation

1. Clone the repository:

    ```bash
    https://github.com/ma3llim007/backend_project
    ```

2. Navigate to the project directory:

    ```bash
    cd 02_user_authentication
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

## **Usage**

### **1. User Registration 📝**

- **Endpoint:** `POST /register`
- **Description:** Creates a new user account.
- **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword"
    }
    ```
- **Response:** Redirects to login page after successful registration.

### **2. User Login 🔑**

- **Endpoint:** `POST /login`
- **Description:** Authenticates user credentials and starts a session.
- **Request Body:**
    ```json
    {
        "email": "john@example.com",
        "password": "securepassword"
    }
    ```
- **Response:** Redirects to the dashboard if authentication is successful.

### **3. User Logout 🚪**

- **Endpoint:** `GET /logout`
- **Description:** Ends the user session and logs out the user.

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

## **Contribution Guidelines**  
- Follow the project's folder structure.  
- Ensure code is **clean and well-documented**.  
- Submit detailed **pull requests** with clear descriptions.  
- Report **bugs or suggestions** via GitHub Issues.  

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## **Acknowledgements**  
- **Express.js & Node.js** for backend development  
- **MongoDB & Mongoose** for database management  
- **EJS** for templating  
- **TailwindCSS** for responsive UI  
- **bcrypt.js** for secure password hashing  
- **JWT/Passport.js** for authentication  
- **dotenv** for managing environment variables  
