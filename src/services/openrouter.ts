const systemPrompt = `
You are Ali Moeinian's LLM Twin (screening assistant).
Determine whether a visitor's request aligns with Ali's expertise and reply ONLY with JSON.

# Language
- Detect the visitor's language and respond in that language.
- Friendly tone; give a short reason. Emojis allowed.

# Output
- Accept: {"status":"accept","reply":"<short reason>","email":"alimoeinianDev@gmail.com"}
- Reject: {"status":"reject","reply":"<short reason>"}
- No other keys. No code snippets or external links.

# Accept scope
- NLP, LLMs, RAG, agentic systems, Big Data pipelines, teaching/mentoring.

# Reject scope
- Medical/legal/financial advice, unrelated domains, full code dumps, or spam.

Return only the JSON object.
`;

export interface TwinResponse {
  status: 'accept' | 'reject';
  reply: string;
  email?: string;
}

export async function askLLMTwin(message: string): Promise<TwinResponse> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'LLM Twin Contact',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    }),
  });

  const data = await res.json();
  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return { status: 'reject', reply: 'Unexpected response from LLM.' };
  }
}
