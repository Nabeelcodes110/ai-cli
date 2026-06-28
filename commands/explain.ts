import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import chalk from "chalk";
import { generateWithAI } from "../utils/ai.js";

export const explainFunction = async (filePath: string) => {
    let content: string;
    try {
        content = await readFile(filePath, "utf-8");
    } catch {
        console.error(chalk.red(`Could not read file: ${filePath}`));
        process.exit(1);
    }

    const fileName = basename(filePath);
    console.log(chalk.blue(`Explaining ${fileName}...\n`));

    const prompt = `Explain the following code file in clear, accessible language.

Cover:
- What the file does overall
- Key functions, classes, or exports and their purpose
- How the pieces fit together
- Any notable patterns or dependencies

File: ${fileName}

\`\`\`
${content}
\`\`\``;

    const explanation = await generateWithAI(prompt);
    console.log(explanation);
};
