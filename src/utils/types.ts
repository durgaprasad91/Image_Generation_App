export {};

declare global {
  interface AbortSignal {
    aborted: boolean;
    onabort: ((this: AbortSignal, ev: Event) => any) | null;
    addEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void;
    dispatchEvent(event: Event): boolean;
  }

  interface AbortSignalEventMap {
    abort: Event;
  }

  interface AbortController {
    signal: AbortSignal;
    abort(): void;
  }
}
