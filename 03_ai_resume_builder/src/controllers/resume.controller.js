import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAIContent } from "../services/aiService.js";

// Function to validate user input
function validateUserData(userData) {
    const requiredFields = ["name", "title", "experience", "skills", "education", "contact"];

    for (const field of requiredFields) {
        if (!userData[field] || (Array.isArray(userData[field]) && userData[field].length === 0)) {
            return `Missing required field: ${field}`;
        }
    }

    // Validate contact details separately
    const contactFields = ["email", "phone", "linkedin", "github"];
    for (const field of contactFields) {
        if (!userData.contact[field]) {
            return `Missing required contact detail: ${field}`;
        }
    }

    return null;
}

const generateResume = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields
        const validationError = validateUserData(userData);
        if (validationError) {
            return res.status(400).json(new ApiError(400, validationError));
        }

        // Generate AI-enhanced content
        const aiSummary = await generateAIContent(`
            Generate a **single-paragraph** professional resume summary based on these details:
            - Name: ${userData.name}
            - Job Title: ${userData.title}
            - Experience: ${JSON.stringify(userData.experience)}
            - Skills: ${userData.skills}
            - Education: ${JSON.stringify(userData.education)}
            ### **Requirements:**
            - **Concise and impactful** (3-5 sentences).
            - **Highlight key skills and strengths**.
            - **Show enthusiasm and career goals**.
            - **No extra formatting or explanations**—just the summary.
            Return **only the summary text**.
        `);
        // Generate AI-enhanced experience, skills, and project descriptions
        const aiExperience = await generateAIContent(`
            Rewrite the following **experience section** in a **professional resume format**.
            ### **Experience Details:**  
            ${JSON.stringify(userData.experience)}
            ### **Formatting Requirements:**  
            - **Use bullet points** for responsibilities and achievements.
            - **Start each point with a strong action verb** (e.g., Developed, Managed, Implemented).
            - **Include quantifiable results** if applicable (e.g., "Increased efficiency by 20%").
            - **Keep each bullet point concise and impactful** (max 1-2 sentences).
            ### **Expected Output Format:**  
            Return the response **as plain text** in the following format:
            [Job Title] | [Company] | [Dates]  
            - Key responsibility or achievement 1  
            - Key responsibility or achievement 2  
            - Key responsibility or achievement 3  
            **Do not include any extra text, explanations, or formatting symbols (e.g., triple backticks).** 
        `);
        // Generate AI-enhanced Skills
        const aiSkills = await generateAIContent(`
            Enhance and structure the **skills section** for a professional resume.
            ### **User Input Skills:**  
            ${userData.skills}
            ### **Formatting Requirements:**  
            - Categorize skills into **relevant sections** (e.g., Front-End, Back-End, Databases, DevOps).  
            - Use **professional terminology** (e.g., "MongoDB - NoSQL Database" instead of "mongodb").  
            - Ensure **clear, concise, and readable** bullet points.  
            - No extra formatting or explanations—just return the skills in this format:
            ### **Expected Output Format:**  
            **Front-End Development:**
            - React.js (Hooks, Context API, Redux)
            **Back-End Development:**
            - Node.js, Express.js (RESTful APIs, Middleware)
            **Databases:**
            - MongoDB (Mongoose, Aggregation Pipeline)
            **DevOps & Deployment:**
            - Docker, CI/CD (GitHub Actions)
            **Additional Tools & Technologies:**
            - Git, Postman, WebSockets (Socket.io)
            Return **only the structured skills section**.
            **Do not include any extra text, explanations, or formatting symbols (e.g., triple backticks).** 
        `);

        userData.summary = aiSummary;
        userData.experience = aiExperience;
        userData.skills = aiSkills;

        return res.status(200).json(new ApiResponse(200, userData, "Generate Resume Successfully With Gemini ✨✨"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

export { generateResume };
