import chalk from "chalk";
import { execa } from "execa";
import { generateWithAI } from "../utils/ai.js";

export type ReviewOptions = {
    staged?: boolean;
};

export const reviewFunction = async ({ staged }: ReviewOptions) => {
    const diffArgs = staged ? ["diff", "--cached"] : ["diff", "HEAD"];
    const { stdout: diff } = await execa("git", diffArgs);

    if (!diff.trim()) {
        console.log(chalk.yellow("No changes found to review."));
        return;
    }

    console.log(chalk.blue("Reviewing changes...\n"));

    const prompt = `You are an expert code reviewer. Review the following git diff and provide actionable feedback.

Focus on:
- Bugs and logic errors
- Security issues
- Performance concerns
- Code style and maintainability
- Missing edge cases

Format your response with clear sections. Be concise but thorough.

Git diff:
${diff}`;

    const review = await generateWithAI(prompt);
    console.log(review);
};
