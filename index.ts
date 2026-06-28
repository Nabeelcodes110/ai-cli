#!/usr/bin/env node
import 'dotenv/config';
import { Command } from "commander";
import { commitFunction } from "./commands/commit.js";
import { reviewFunction } from "./commands/review.js";
import { explainFunction } from "./commands/explain.js";
import { testFunction } from "./commands/test.js";

const program = new Command();

export type CommitOptions = {
    description: string;
    message: string;
    messageTemplate: string;
};

program
    .name('ai-cli')
    .description('A CLI tool for automating tasks using AI')
    .version('1.0.0');

program.command("commit")
    .description("Generate a commit message using AI")
    .option("-d, --description <string>", "Description of the changes")
    .option("-m, --message <string>", "Commit message")
    .option("--mt, --message-template <string>", "Template for the commit message")
    .action(async ({ description, message, messageTemplate }: CommitOptions) => {
        await commitFunction({ description, message, messageTemplate });
    });

program.command("review")
    .description("AI code review on git diff")
    .option("-s, --staged", "Review only staged changes")
    .option("-p, --print", "Print review to stdout instead of saving a report")
    .action(async (options: { staged?: boolean; print?: boolean }) => {
        await reviewFunction(options);
    });

program.command("explain")
    .description("Explain a source file using AI")
    .argument("<file>", "Path to the file to explain")
    .option("-p, --print", "Print explanation to stdout instead of saving a report")
    .action(async (file: string, options: { print?: boolean }) => {
        await explainFunction(file, options);
    });

program.command("test")
    .description("Generate unit tests using AI")
    .argument("[file]", "Path to the source file (defaults to git diff)")
    .option("-o, --output <path>", "Write tests to a file instead of stdout")
    .action(async (file: string | undefined, options: { output?: string }) => {
        await testFunction({ file, output: options.output });
    });

program.parse();
