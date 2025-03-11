# **URL Shortener API**

## **Overview**

🚀 This **URL Shortener API** is a lightweight service that allows users to shorten long URLs, track their usage, and redirect visitors seamlessly. Built with **Node.js**, **Express**, and **MongoDB**, this API efficiently handles URL shortening and analytics tracking.

### **Key Features**

-   **Shorten Long URLs** – Instantly generate short links for any website.
-   **Fast Redirection** – Redirect users from the short URL to the original website.
-   **Analytics Tracking** – Monitor click counts and timestamps for each short URL.

## **Technologies Used**

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (Mongoose for schema modeling)
-   **ID Generation:** Nanoid (for creating unique short IDs)
-   **Environment Variables:** dotenv

## **Installation**

1. Clone the repository:

    ```bash
    https://github.com/ma3llim007/backend_project
    ```

2. Navigate to the project directory:

    ```bash
    cd 03_ai_resume_builder
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

## **API Endpoints**

### **1. Generate a Short URL**

🔹 **Endpoint:** `POST /api/url/generate`  
🔹 **Description:** Shortens a long URL and returns a unique short ID.
📥 **Request Body:**
```json
{
    "websiteUrl": "https://example.com"
}
```
📤 **Response:**

```json
{
    "status": 201,
    "data": {
        "shortId": "abcd1234"
    },
    "message": "Short link generated successfully"
}
```

---

### **2. Redirect to the Original URL**

🔹 **Endpoint:** `GET /:shortID`  
🔹 **Description:** Redirects to the original URL based on the short ID.

📤 **Response:** Redirects the user to the original website.

---

### **3. Get Analytics for a Short URL**

🔹 **Endpoint:** `GET /api/url/analytics/:shortID`  
🔹 **Description:** Fetches usage statistics for a given short URL, including total clicks and timestamps.

📤 **Response:**

```json
{
    "status": 200,
    "data": {
        "totalClicks": 5,
        "analytics": [{ "timestamp": 1700000000000 }, { "timestamp": 1700000005000 }]
    },
    "message": "Analytics fetched successfully"
}
```

---

## **Development**

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



## **License**
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## **Acknowledgements**

- **Node.js & Express.js** – For backend development.  
- **MongoDB & Mongoose** – For efficient data storage.  
- **Nanoid** – For generating unique short IDs.  
- **dotenv** – For managing environment variables.