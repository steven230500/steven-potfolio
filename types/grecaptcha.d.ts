export {};

declare global {
  interface Grecaptcha {
    ready?(cb: () => void): void;
    execute?(siteKey: string, opts?: { action?: string }): Promise<string>;
  }

  interface Window {
    grecaptcha?: Grecaptcha;
  }
}
