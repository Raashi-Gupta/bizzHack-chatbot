declare module 'google-translate-api-browser' {
  interface TranslateResult {
    text: string;
    from: { language: { iso: string } };
    raw: string;
  }

  interface TranslateOptions {
    from?: string;
    to?: string;
  }

  function translate(text: string, options?: TranslateOptions): Promise<TranslateResult>;

  export default translate;
}
