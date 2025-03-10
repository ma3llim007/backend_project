import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAIContent } from "../services/aiService.js";
import natural from "natural";

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

// Generate Resume
const generateResume = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;

        // Validate required fields
        const validationError = validateUserData(userData);
        if (validationError) {
            return res.status(400).json(new ApiError(400, validationError));
        }

        // Generate AI-enhanced content
        const aiReadme = await generateAIContent(`
            Generate a **detailed and well-structured README file** for a developer's resume in Markdown format.  
            The README should be **professionally formatted** with the following sections:
            ## User Data:
            - **Name:** ${userData.name}
            - **Job Title:** ${userData.title}
            - **Experience:** ${JSON.stringify(userData.experience)}
            - **Skills:** ${userData.skills}
            - **Education:** ${JSON.stringify(userData.education)}
            - **Contact Information:** ${JSON.stringify(userData.contact)}

            ## **Formatting Guidelines:**
            - Use **Markdown** for professional formatting.
            - Use **headings ( #, ##, ### )** for clear structure.
            - Expand on **each experience point** to make it more descriptive.
            - **Categorize skills** into sections (Front-End, Back-End, Databases, etc.).
            - Include **clickable links** for email, LinkedIn, and GitHub.
            - Provide **an engaging summary** that reflects enthusiasm and expertise.
            - Ensure **bullet points are detailed and action-oriented**.

            ## **Expected Output Format:**
            \`# ${userData.name} - ${userData.title}\`
            
            \`## 📄 Summary\`
            ${userData.summary}
            
            \`## 💼 Experience\`
            ${JSON.stringify(userData.experience).replace(/"/g, "").replace(/\\n/g, "\n")}

            \`## 🚀 Skills\`
            ${userData.skills.replace(/\\n/g, "\n")}

            \`## 🎓 Education\`
            - ${userData.education}

            \`## 📬 Contact\`
            - **Email:** [${userData.contact.email}](mailto:${userData.contact.email})
            - **Phone:** ${userData.contact.phone}
            - **LinkedIn:** [LinkedIn Profile](https://linkedin.com/in/${userData.contact.linkedin})
            - **GitHub:** [GitHub Profile](https://github.com/${userData.contact.github})
        `);

        // Set response headers for file download
        res.setHeader("Content-Type", "text/markdown");
        res.setHeader("Content-Disposition", "attachment; filename=`README.md`");

        return res.send(aiReadme);
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

// Analyze The Resume to calculate ATS Score
const analyzeResume = (req, res) => {
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;
    const JOB_KEYWORDS = ["JavaScript", "React.js", "Node.js", "MongoDB", "Express.js", "REST API", "Redux", "Hooks"];

    try {
        const { experience, skills, summary } = req.body;

        if (!experience || !skills || !summary) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let atsScore = 0;
        const feedback = [];

        // Convert text to lowercase and tokenize
        const experienceTokens = tokenizer.tokenize(experience.toLowerCase());
        const summaryTokens = tokenizer.tokenize(summary.toLowerCase());

        // Flatten skills object into an array of skill names
        const skillsTokens = Object.values(skills)
            .flat()
            .map((skill) => skill.toLowerCase());

        // Stem words
        const allText = [...experienceTokens, ...summaryTokens, ...skillsTokens].map((word) => stemmer.stem(word));

        // Check for keyword matches
        const matchedKeywords = JOB_KEYWORDS.filter((keyword) => allText.includes(stemmer.stem(keyword.toLowerCase()))).length;

        // Calculate keyword ATS Score (60% weight)
        const keywordScore = (matchedKeywords / JOB_KEYWORDS.length) * 100;
        atsScore += keywordScore * 0.6;

        // Experience Section Check (20% weight)
        if (experience.length > 50) atsScore += 20;
        else feedback.push("Experience section is too short. Add more details about your role and achievements.");

        // Summary Section Check (20% weight)
        if (summary.length > 50) atsScore += 20;
        else feedback.push("Summary is too short. Expand on your skills and experience.");
        return res.status(200).json(new ApiResponse(200, { atsScore: atsScore.toFixed(2), feedback }, "Your Resume ATS Fetched Successfully ✨✨"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
};

// Generate Cover Letter
const generateCoverLetter = asyncHandler(async (req, res) => {
    try {
        const { name, title, experience, skills, summary, jobDescription, companyName, hiringManager = "None" } = req.body;
        if (!name || !title || !experience || !skills || !summary || !jobDescription || !companyName) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const aiCoverLetter = await generateAIContent(`
            Generate a professional and ATS-optimized cover letter based on the following details:
            Candidate Information:
                - Name: ${name}
                - Job Title: ${title}
                - Experience: ${experience}
                - Skills: ${skills}
                - Summary: ${summary}
            Job Description: ${jobDescription}
            Company Information:
                - Company Name: ${companyName}
                - Hiring Manager (if available): ${hiringManager}
            Cover Letter Guidelines:
                - Personalized: Address the hiring manager if available; otherwise, use "Hiring Manager."
                - Concise & Professional: Keep it within 250-350 words.
                - Highlight Key Skills: Showcase the most relevant skills from the candidate's profile.
                - Showcase Achievements: Emphasize how the candidate’s experience aligns with the job role.
                - Express Enthusiasm: Communicate passion for the role and company.
                - Call to Action: Encourage further discussion by requesting an interview.
            Expected Cover Letter Structure:
                1. Introduction - Express enthusiasm for the role and mention the company name.
                2. Key Skills & Experience - Highlight relevant experience and achievements.
                3. Alignment with Job Role - Show how skills fit the job requirements.
                4. Closing Statement - Express eagerness to contribute and request an interview.
                5. Signature - End with a professional sign-off.
            Output Format:
            Format: Return only the structured cover letter with proper paragraphs. No extra text or explanations.
        `);

        return res.status(200).json(new ApiResponse(200, aiCoverLetter, "Generate Cover Letter Successfully With Gemini ✨✨"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

// Finding Missing keyword of Skill Suggestions
const findingMissingKeyword = asyncHandler(async (req, res) => {
    try {
        const { skills, jobDescription } = req.body;

        if (!skills || !jobDescription) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const aiMisingKeyword = await generateAIContent(`
            Analyze the following job description and candidate's existing skills. Identify only the missing keywords that are present in the job description but not in the candidate's resume.
            Candidate's Resume Information:
            - Current Skills: ${skills}
            Job Description:${jobDescription}
            Guidelines:
            - Extract technical skills, tools, frameworks, methodologies, or industry-relevant terms missing from the candidate's skill set.
            - Provide only the missing keywords without any explanation or extra formatting.
            Expected Output Format:
            Return a comma-separated list of missing keywords relevant to the job description.
        `);
        return res.status(200).json(new ApiResponse(200, aiMisingKeyword, "Missing Keywords Fetched Successfully ✨✨"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

// Grammar & Spell Checking
const grammarSpellCheck = asyncHandler(async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json(new ApiError(400, "Missing required field: content"));
        }
        const aiGrammarCheck = await generateAIContent(`
            Check the grammar and spelling of the following text:
            ${content}
            Guidelines:
            - Correct any grammatical errors, punctuation mistakes, and spelling errors.
            - Ensure the text is clear, concise, and professional.
            - Return the corrected text without any additional explanations or formatting.
            Expected Output Format:
            Return the corrected text with all the necessary corrections.
        `);

        return res.status(200).json(new ApiResponse(200, aiGrammarCheck, "Grammar & Spell Check Fetched Successfully ✨✨"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

export { generateResume, analyzeResume, generateCoverLetter, findingMissingKeyword, grammarSpellCheck };
