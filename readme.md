# ai-cli

A command-line tool that brings AI-assisted developer workflows into your terminal. Built with TypeScript and powered by OpenAI, ai-cli helps you review code, understand unfamiliar files, generate tests, and write commit messages — without leaving the shell.

## Features

| Command | Description |
|---|---|
| `ai-cli review` | AI code review on your git diff |
| `ai-cli explain <file>` | Explain what a source file does |
| `ai-cli test [file]` | Generate unit tests from a file or git diff |
| `ai-cli commit` | Generate and apply a git commit message |

## Use cases

- **Pre-commit review** — Run `ai-cli review` before pushing to catch bugs, security issues, and style problems in your uncommitted changes.
- **Onboarding & code exploration** — Use `ai-cli explain` on an unfamiliar file to quickly understand its purpose, structure, and key exports.
- **Test scaffolding** — Use `ai-cli test` to generate a starting point for unit tests when adding new code or refactoring existing logic.
- **Faster commits** — Use `ai-cli commit` to auto-generate a concise commit message from your staged diff or a short description.

## Installation

```bash
git clone <repo-url>
cd ai-cli
npm install
npm run build
npm link   # optional — installs `ai-cli` globally
```

## Setup

Create a `.env` file in the project root (or export the variable in your shell):

```env
OPENAI_API_KEY=your_api_key_here
```

Get an API key from the [OpenAI platform](https://platform.openai.com/api-keys).

## Usage

### Review changes

Saves a markdown report to `.ai-cli/review.md`.

```bash
re# Review all uncommitted changes
ai-cli review

# Review only staged changes
ai-cli review --staged

# Print to stdout instead of saving a report
ai-cli review --print
```

### Explain a file

Saves a markdown report to `.ai-cli/explain-<filename>.md`.

```bash
ai-cli explain src/utils/parser.ts

# Print to stdout instead
ai-cli explain src/utils/parser.ts --print
```

### Generate unit tests

```bash
# From uncommitted git diff
ai-cli test

# From a specific file
ai-cli test src/utils/parser.ts

# Write output to a file
ai-cli test src/utils/parser.ts -o src/utils/parser.test.ts
```

### Generate a commit message

```bash
# From staged diff
ai-cli commit

# From a description
ai-cli commit -d "fix login redirect loop"

# With an explicit message (skips AI)
ai-cli commit -m "fix: resolve login redirect loop"
```

## Requirements

- Node.js 18+
- Git (for `review`, `test`, and `commit` commands)
- A valid `OPENAI_API_KEY`
