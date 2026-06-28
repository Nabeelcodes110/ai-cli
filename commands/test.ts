import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import chalk from "chalk";
import { execa } from "execa";
import { generateWithAI } from "../utils/ai.js";

export type TestOptions = {
    file?: string;
    output?: string;
};

export const testFunction = async ({ file, output }: TestOptions) => {
    let sourceLabel: string;
    let sourceContent: string;

    if (file) {
        try {
            sourceContent = await readFile(file, "utf-8");
        } catch {
            console.error(chalk.red(`Could not read file: ${file}`));
            process.exit(1);
        }
        sourceLabel = file;
    } else {
        const { stdout: diff } = await execa("git", ["diff", "HEAD"]);
        if (!diff.trim()) {
            console.log(chalk.yellow("No changes found. Provide a file path or make some changes first."));
            return;
        }
        sourceContent = diff;
        sourceLabel = "git diff (uncommitted changes)";
    }

    console.log(chalk.blue(`Generating unit tests for ${sourceLabel}...\n`));

    const prompt = `Generate comprehensive unit tests for the following source.

Requirements:
- Use a popular testing framework appropriate for the language (e.g. Jest/Vitest for JS/TS, pytest for Python)
- Cover happy paths, edge cases, and error conditions
- Include only the test code, no explanatory prose before or after
- Add brief comments only where test intent is non-obvious

Source (${sourceLabel}):
${file ? `\`\`\`\n${sourceContent}\n\`\`\`` : sourceContent}`;

    const tests = await generateWithAI(prompt);

    if (output) {
        await writeFile(output, tests, "utf-8");
        console.log(chalk.green(`Tests written to ${output}`));
    } else {
        console.log(tests);
    }
};
