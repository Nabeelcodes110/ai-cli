import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import chalk from "chalk";
import { generateWithAI } from "../utils/ai.js";
import { printToStdout, writeReport } from "../utils/output.js";

export type ExplainOptions = {
    print?: boolean;
};

export const explainFunction = async (
    filePath: string,
    { print }: ExplainOptions = {},
) => {
    let content: string;
    try {
        content = await readFile(filePath, "utf-8");
    } catch {
        console.error(chalk.red(`Could not read file: ${filePath}`));
        process.exit(1);
    }

    const fileName = basename(filePath);
    console.log(chalk.blue(`Explaining ${fileName}...`));

    const prompt = `Explain the following code file briefly and clearly.

Cover only:
- What the file does
- Key functions, classes, or exports
- How the main pieces connect

Use short paragraphs and bullet points. Be specific, not vague.

File: ${fileName}

\`\`\`
${content}
\`\`\``;

    const explanation = await generateWithAI(prompt, 300);

    if (print) {
        printToStdout(explanation);
        return;
    }

    const safeName = fileName.replace(/[^\w.-]+/g, "-");
    await writeReport({
        filename: `explain-${safeName}.md`,
        title: `Explanation: ${fileName}`,
        body: explanation,
    });
};
