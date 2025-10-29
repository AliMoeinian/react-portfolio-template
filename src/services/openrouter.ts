export interface TwinResponse {
  status: 'accept' | 'reject';
  reply: string;
  email?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://react-portfolio-template-abr8.onrender.com:5000';

export async function askLLMTwin(
  message: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<TwinResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in askLLMTwin:', error);
    return {
      status: 'reject',
      reply: 'متاسفانه مشکلی در پردازش درخواست رخ داد. لطفاً دوباره امتحان کنید.',
    };
  }
}
