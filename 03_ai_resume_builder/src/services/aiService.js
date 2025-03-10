import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateAIContent = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return response.trim();
    } catch (_error) {
        return "Unable to generate content at this time.";
    }
};

export { generateAIContent };
