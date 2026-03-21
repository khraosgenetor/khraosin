const lc_alphabet = "abcdefghijklmnopqrstuvwxyz";
const uc_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

function seedShift(key: number, seed: string, i: number): number {
  if (!seed) return key;
  const sc = seed[i % seed.length];
  const lj = lc_alphabet.indexOf(sc);
  if (lj !== -1) return key * lj;
  const uj = uc_alphabet.indexOf(sc);
  if (uj !== -1) return key * uj;
  return key;
}

export function encryptor(message: string, key: number, seed: string = ""): string {
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

    const magnitude = seedShift(key, seed, i);
    const shift = word_pos % 2 === 0 ? magnitude : -magnitude;
    word_pos++;

    if (val === 1) result[i] = lc_alphabet[((j + shift) % 26 + 26) % 26];
    else if (val === 2) result[i] = uc_alphabet[((j + shift) % 26 + 26) % 26];
    else result[i] = digits[((j + shift) % 10 + 10) % 10];
  }

  return result.join("");
}

export function decryptor(message: string, key: number, seed: string = ""): string {
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

    const magnitude = seedShift(key, seed, i);
    const shift = word_pos % 2 === 0 ? -magnitude : magnitude;
    word_pos++;

    if (val === 1) result[i] = lc_alphabet[((j + shift) % 26 + 26) % 26];
    else if (val === 2) result[i] = uc_alphabet[((j + shift) % 26 + 26) % 26];
    else result[i] = digits[((j + shift) % 10 + 10) % 10];
  }

  return result.join("");
}