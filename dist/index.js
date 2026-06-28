#!/usr/bin/env node
import 'dotenv/config';
import { Command } from "commander";
import { commitFunction } from "./commands/commit.js";
import { reviewFunction } from "./commands/review.js";
import { explainFunction } from "./commands/explain.js";
import { testFunction } from "./commands/test.js";
const program = new Command();
program
    .name('ai-cli')
    .description('A CLI tool for automating tasks using AI')
    .version('1.0.0');
program.command("commit")
    .description("Generate a commit message using AI")
    .option("-d, --description <string>", "Description of the changes")
    .option("-m, --message <string>", "Commit message")
    .option("--mt, --message-template <string>", "Template for the commit message")
    .action(async ({ description, message, messageTemplate }) => {
    await commitFunction({ description, message, messageTemplate });
});
program.command("review")
    .description("AI code review on git diff")
    .option("-s, --staged", "Review only staged changes")
    .action(async (options) => {
    await reviewFunction(options);
});
program.command("explain")
    .description("Explain a source file using AI")
    .argument("<file>", "Path to the file to explain")
    .action(async (file) => {
    await explainFunction(file);
});
program.command("test")
    .description("Generate unit tests using AI")
    .argument("[file]", "Path to the source file (defaults to git diff)")
    .option("-o, --output <path>", "Write tests to a file instead of stdout")
    .action(async (file, options) => {
    await testFunction({ file, output: options.output });
});
program.parse();
//# sourceMappingURL=index.js.map