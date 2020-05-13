import { randomFillSync } from 'crypto';

export function generateRandomString(length: number) {
  const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const array = randomFillSync(new Uint8Array(length));
  return String.fromCharCode(
    ...array.map((x) => validChars.charCodeAt(x % validChars.length))
  );
}
