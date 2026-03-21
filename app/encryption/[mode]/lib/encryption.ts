const lc_alphabet = "abcdefghijklmnopqrstuvwxyz";
const uc_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

function shiftMagnitude(key: number, seed: string, i: number): number {
  if (!seed) return key;
  const sc = seed[i];
  const lj = lc_alphabet.indexOf(sc);
  if (lj !== -1) return (lj + 1) + key;
  const uj = uc_alphabet.indexOf(sc);
  if (uj !== -1) return (uj + 1) + key;
  return key;
}

function applyPass(message: string, key: number, seedChunk: string, encrypt: boolean): string {
  const result = message.split("");
  let word_pos = 0;

  for (let i = 0; i < message.length; i++) {
    const c = message[i];
    let j = lc_alphabet.indexOf(c);
    let val = 0;

    if (j !== -1) {
      val = 1;
    } else {
      j = uc_alphabet.indexOf(c);
      if (j !== -1) {
        val = 2;
      } else {
        j = digits.indexOf(c);
        if (j !== -1) val = 3;
      }
    }

    if (val === 0) { word_pos = 0; continue; }

    const magnitude = shiftMagnitude(key, seedChunk, i);
    const direction = encrypt ? 1 : -1;
    const shift = (word_pos % 2 === 0 ? magnitude : -magnitude) * direction;
    word_pos++;

    if (val === 1) result[i] = lc_alphabet[((j + shift) % 26 + 26) % 26];
    else if (val === 2) result[i] = uc_alphabet[((j + shift) % 26 + 26) % 26];
    else result[i] = digits[((j + shift) % 10 + 10) % 10];
  }

  return result.join("");
}

function buildPasses(message: string, seed: string): string[] {
  const len = message.length;
  const passes: string[] = [];
  for (let i = 0; i < seed.length; i += len) {
    passes.push(seed.slice(i, i + len));
  }
  return passes;
}

export function encryptor(message: string, key: number, seed: string = ""): string {
  if (!seed) return applyPass(message, key, "", true);
  const passes = buildPasses(message, seed);
  let result = message;
  for (const chunk of passes) {
    const partial = chunk.length < message.length;
    if (partial) {
      const reencrypted = applyPass(result.slice(0, chunk.length), key, chunk, true);
      result = reencrypted + result.slice(chunk.length);
    } else {
      result = applyPass(result, key, chunk, true);
    }
  }
  return result;
}

export function decryptor(message: string, key: number, seed: string = ""): string {
  if (!seed) return applyPass(message, key, "", false);
  const passes = buildPasses(message, seed);
  let result = message;
  for (let p = passes.length - 1; p >= 0; p--) {
    const chunk = passes[p];
    const partial = chunk.length < message.length;
    if (partial) {
      const redecrypted = applyPass(result.slice(0, chunk.length), key, chunk, false);
      result = redecrypted + result.slice(chunk.length);
    } else {
      result = applyPass(result, key, chunk, false);
    }
  }
  return result;
}