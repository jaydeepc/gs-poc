const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation. ${retries} attempts remaining...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(operation, retries - 1, delay);
    }
    throw error;
  }
}

interface OpenAIErrorResponse {
  response?: {
    status: number;
    data: {
      error: {
        message: string;
      };
    };
  };
  message?: string;
}

export function isOpenAIError(error: unknown): boolean {
  const apiError = error as OpenAIErrorResponse;
  return !!apiError?.response?.status && apiError.response.status >= 400 && !!apiError?.response?.data?.error;
}

export function getOpenAIErrorMessage(error: unknown): string {
  if (isOpenAIError(error)) {
    const apiError = error as OpenAIErrorResponse;
    return `OpenAI API Error: ${apiError.response?.data.error.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
