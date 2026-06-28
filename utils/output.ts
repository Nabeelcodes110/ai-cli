import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import chalk from "chalk";

const OUTPUT_DIR = ".ai-cli";

type WriteReportOptions = {
    filename: string;
    title: string;
    body: string;
};

export async function writeReport({
    filename,
    title,
    body,
}: WriteReportOptions): Promise<string> {
    await mkdir(OUTPUT_DIR, { recursive: true });

    const filePath = join(OUTPUT_DIR, filename);
    const content = `# ${title}\n\n${body.trim()}\n`;
    await writeFile(filePath, content, "utf-8");

    console.log(chalk.green(`Report saved to ${filePath}`));

    return filePath;
}

export function printToStdout(body: string): void {
    process.stdout.write(`${body.trim()}\n`);
}
