export function isValidCINumber(input: string): boolean {
    const s = String(input).replace(/\s+/g, "");
    return /^(?:\+225)?(01|05|07|21|25|27)\d{8}$/.test(s);
  }
  