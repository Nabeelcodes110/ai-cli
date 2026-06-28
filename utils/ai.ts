import OpenAI from "openai";

const MODEL = "gpt-4o-mini";
const DEFAULT_MAX_TOKENS = 300;

function getClient(): OpenAI {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    return new OpenAI({
        apiKey,
        baseURL: apiKey.startsWith("sk-or-")
            ? "https://openrouter.ai/api/v1"
            : "https://api.openai.com/v1",
    });
}

export async function generateWithAI(
    prompt: string,
    maxTokens = DEFAULT_MAX_TOKENS,
): Promise<string> {
    const client = getClient();
    const response = await client.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        max_completion_tokens: maxTokens,
        temperature: 0.3,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
        throw new Error("No response from AI");
    }
    return text.trim();
}
