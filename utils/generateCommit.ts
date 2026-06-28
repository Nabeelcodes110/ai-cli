import { generateWithAI } from "./ai.js";

export const generateCommitMessage = async (diff: string) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following diff:\n\n${diff}\n\nCommit message:`;
    return generateWithAI(prompt);
};

export const generateCommitMessageByDescription = async (description: string) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following description:\n\n${description}\n\nCommit message:`;
    return generateWithAI(prompt);
};
