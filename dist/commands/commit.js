import { generateCommitMessage, generateCommitMessageByDescription } from "../utils/generateCommit.js";
import { execa } from "execa";
export const commitFunction = async ({ description, message, messageTemplate }) => {
    console.log("Staging changes...");
    execa("git", ["add", "."], { stdio: "inherit" });
    if (message) {
        console.log("Using provided commit message:", message);
        execa("git", ["commit", "-m", message], { stdio: "inherit" });
        return;
    }
    else if (messageTemplate) {
        console.log("Using provided message template:", messageTemplate);
        execa("git", ["commit", "-m", messageTemplate], { stdio: "inherit" });
        return;
    }
    else if (description) {
        console.log("Generating commit message based on description...");
        const generatedMessage = await generateCommitMessageByDescription(description);
        console.log("Generated commit message:", generatedMessage);
        execa("git", ["commit", "-m", generatedMessage], { stdio: "inherit" });
        return;
    }
    else {
        console.log("No description or message provided. Generating commit message based on git diff...");
        const { stdout: diff } = await execa("git", ["diff", "--cached"]);
        const generatedMessage = await generateCommitMessage(diff);
        console.log("Generated commit message:", generatedMessage);
        execa("git", ["commit", "-m", generatedMessage], { stdio: "inherit" });
    }
};
//# sourceMappingURL=commit.js.map