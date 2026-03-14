import { GoogleGenAI } from "@google/genai";
const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });
export const generateCommitMessage = async (diff) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following diff:\n\n${diff}\n\nCommit message:`;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    if (!response.text) {
        throw new Error("No response from AI");
    }
    return response.text.trim();
};
export const generateCommitMessageByDescription = async (description) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following description:\n\n${description}\n\nCommit message:`;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    if (!response.text) {
        throw new Error("No response from AI");
    }
    return response.text.trim();
};
//# sourceMappingURL=generateCommit.js.map