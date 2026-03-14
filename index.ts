#!/usr/bin/env node
import 'dotenv/config';
import { Command } from "commander"
import { commitFunction } from "./commands/commit.js"

const program = new Command()

export type CommitOptions = {
    description: string;
    message: string;
    messageTemplate: string;
}

program
  .name('ai-cli')
    .description('A CLI tool for automating tasks using AI')
    .version('1.0.0')

program.command("commit")
.description("Generate a commit message using AI")
.option("-d, --description <string>", "Description of the changes")
.option("-m, --message <string>", "Commit message")
.option("--mt, --message-template <string>", "Template for the commit message")
.action(async ({description, message, messageTemplate}: CommitOptions) => {
    await commitFunction({description, message, messageTemplate});
})

program.parse()