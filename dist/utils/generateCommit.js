import { generateWithAI } from "./ai.js";
export const generateCommitMessage = async (diff) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following diff:\n\n${diff}\n\nCommit message:`;
    return generateWithAI(prompt, 100);
};
export const generateCommitMessageByDescription = async (description) => {
    const prompt = `Generate a concise and descriptive git commit message based on the following description:\n\n${description}\n\nCommit message:`;
    return generateWithAI(prompt, 100);
};
//# sourceMappingURL=generateCommit.js.map