# **AI Resume Builder**

## **Overview**

This API provides AI-powered functionalities for creating professional resumes, cover letters, and analyzing job applications. It includes ATS (Applicant Tracking System) scoring, missing keyword identification, and grammar/spell checking to optimize job applications.

## **Features**

- **AI-Generated Resumes** – Automatically create ATS-friendly resumes in Markdown format.
- **ATS Score Analysis** – Evaluate resumes based on industry keyword relevance.
- **Cover Letter Generation** – Craft personalized and professional cover letters.
- **Missing Keyword Identification** – Find missing skills and keywords from job descriptions.
- **Grammar & Spell Check** – Enhance resume and cover letter quality with AI-powered corrections.

## **Technologies Used**

- **Backend:** Node.js, Express.js
- **AI/ML:** Gemini
- **Environment Variables:** dotenv

## Installation

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

## **Usage**

### **1. Generate Resume**

**Endpoint:** `POST /generate-resume`  
**Description:** Generates a well-structured, ATS-friendly resume in Markdown format.

#### **📥 Request Body:**

```json
{
    "name": "John Doe",
    "title": "Software Engineer",
    "experience": "[...Experience details...]",
    "skills": "JavaScript, React.js, Node.js",
    "education": "B.Sc. Computer Science",
    "contact": {
        "email": "john@example.com",
        "phone": "123-456-7890",
        "linkedin": "johndoe",
        "github": "johndoe"
    }
}
```

#### **📤 Response:**

Returns a Markdown file (`README.md`) containing the AI-generated resume.

---

### **2. Analyze Resume for ATS Score**

**Endpoint:** `POST /resume-analyze`  
**Description:** Calculates an ATS score based on keyword matching and content quality.

#### **📥 Request Body:**

```json
{
    "experience": "[...Experience details...]",
    "skills": {
        "Front-End": ["React.js", "JavaScript"],
        "Back-End": ["Node.js", "Express.js"]
    },
    "summary": "Experienced in developing scalable web applications..."
}
```

#### **📤 Response:**

```json
{
    "atsScore": "85.00",
    "feedback": ["Your experience section could include more details."]
}
```

---

### **3. Generate Cover Letter**

**Endpoint:** `POST /generate-cover-letter`  
**Description:** Generates a professional, personalized cover letter.

#### **📥 Request Body:**

```json
{
    "name": "John Doe",
    "title": "Software Engineer",
    "experience": "[...Experience details...]",
    "skills": "JavaScript, React.js, Node.js",
    "summary": "Passionate about building scalable applications...",
    "jobDescription": "[...Job details...]",
    "companyName": "TechCorp",
    "hiringManager": "Jane Smith"
}
```

#### **📤 Response:**

Returns a professionally structured cover letter.

---

### **4. Find Missing Keywords for ATS Optimization**

**Endpoint:** `POST /finding-missing-keyword`  
**Description:** Identifies missing keywords from a job description that are not present in the candidate’s resume.

#### **📥 Request Body:**

```json
{
    "skills": "JavaScript, React.js, Node.js",
    "jobDescription": "[...Job details...]"
}
```

#### **📤 Response:**

```json
{
    "missingKeywords": ["TypeScript", "GraphQL", "CI/CD"]
}
```

---

### **5. Grammar & Spell Checking**

**Endpoint:** `POST /grammar-spell-check`  
**Description:** Checks and corrects grammar, spelling, and punctuation in professional documents.

#### **📥 Request Body:**

```json
{
    "content": "I am a software engenier who loves coding."
}
```

#### **📤 Response:**

```json
{
    "correctedText": "I am a software engineer who loves coding."
}
```

---

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
- **Node.js & Express.js** – For building the backend.  
- **Gemini API / NLP Libraries** – For AI-driven resume and cover letter generation.  
- **dotenv** for managing environment variables  