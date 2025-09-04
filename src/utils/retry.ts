import { AbortSignal } from './types';

interface RetryOptions {
  retries?: number;
  delay?: (attempt: number) => number;
  signal?: AbortSignal;
}

const defaultDelay = (attempt: number) => Math.pow(2, attempt) * 1000;

export async function retry<T>(func: (signal?: AbortSignal) => Promise<T>, options?: RetryOptions): Promise<T> {
  const { retries = 3, delay = defaultDelay, signal } = options || {};

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (signal?.aborted) {
        throw new Error("Request aborted");
      }
      return await func(signal);
    } catch (error: any) {
      if (signal?.aborted || attempt === retries) {
        throw error;
      }
      const waitTime = delay(attempt);
      console.warn(`Attempt ${attempt + 1} failed. Retrying in ${waitTime / 1000}s...`, error);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  // This line should technically be unreachable if retries are handled correctly.
  // However, TypeScript might complain, so we can throw a generic error here.
  throw new Error("Retry function failed after all attempts.");
}
