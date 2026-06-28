import chalk from "chalk";
import { execa } from "execa";
import { generateWithAI } from "../utils/ai.js";
import { printToStdout, writeReport } from "../utils/output.js";

export type ReviewOptions = {
    staged?: boolean;
    print?: boolean;
};

export const reviewFunction = async ({ staged, print }: ReviewOptions) => {
    const diffArgs = staged ? ["diff", "--cached"] : ["diff", "HEAD"];
    const { stdout: diff } = await execa("git", diffArgs);

    if (!diff.trim()) {
        console.log(chalk.yellow("No changes found to review."));
        return;
    }

    console.log(chalk.blue("Reviewing changes..."));

    const prompt = `You are an expert code reviewer. Review the following git diff.

Focus on the most important issues only:
- Bugs and logic errors
- Security issues
- Performance concerns
- Missing edge cases

Respond in concise bullet points grouped under short headings. Be direct and actionable. Avoid filler or vague praise.

Git diff:
${diff}`;

    const review = await generateWithAI(prompt, 300);

    if (print) {
        printToStdout(review);
        return;
    }

    await writeReport({
        filename: "review.md",
        title: "Code Review",
        body: review,
    });
};
