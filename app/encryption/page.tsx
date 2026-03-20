"use client";

import { useState } from "react";
import { encryptor, decryptor } from "./lib/encryption";
import styles from "./page.module.css";

export default function EncryptionPage() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [copied, setCopied] = useState(false);

  function handleRun() {
    const k = parseInt(key);
    if (!message.trim() || isNaN(k)) return;
    const result = mode === "encrypt" ? encryptor(message, k) : decryptor(message, k);
    setOutput(result);
    setCopied(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className={styles.main}>
      <div className={styles.noise} />

      <div className={styles.wrapper}>
        <header className={styles.header}>
          <span className={styles.tag}>KHRAOSGENETOR / ENCRYPTION</span>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>CIPHER</span>
            <span className={styles.titleAccent}>MACHINE</span>
          </h1>
          <p className={styles.desc}>
            Alternating +/− key shifts per word. Odd positions add, even positions subtract.
            Wraps mod 26 for letters, mod 10 for digits.
          </p>
        </header>

        <div className={styles.modeRow}>
          <button
            className={`${styles.modeBtn} ${mode === "encrypt" ? styles.modeBtnActive : ""}`}
            onClick={() => { setMode("encrypt"); setOutput(""); }}
          >
            ENCRYPT
          </button>
          <button
            className={`${styles.modeBtn} ${mode === "decrypt" ? styles.modeBtnActive : ""}`}
            onClick={() => { setMode("decrypt"); setOutput(""); }}
          >
            DECRYPT
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>MESSAGE</label>
            <textarea
              className={styles.textarea}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={mode === "encrypt" ? "Enter plaintext..." : "Enter ciphertext..."}
              rows={4}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>KEY</label>
            <input
              className={styles.input}
              type="number"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="e.g. 7"
            />
          </div>

          <button className={styles.runBtn} onClick={handleRun}>
            <span>{mode === "encrypt" ? "ENCRYPT" : "DECRYPT"}</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>

        {output && (
          <div className={styles.output}>
            <div className={styles.outputHeader}>
              <span className={styles.label}>OUTPUT</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? "COPIED ✓" : "COPY"}
              </button>
            </div>
            <p className={styles.outputText}>{output}</p>
          </div>
        )}

        <footer className={styles.footer}>
          <a href="https://github.com/khraosgenetor/Encryption" target="_blank" rel="noopener noreferrer">
            VIEW SOURCE ON GITHUB
          </a>
        </footer>
      </div>
    </main>
  );
}