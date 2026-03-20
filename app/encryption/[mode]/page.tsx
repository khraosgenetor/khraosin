"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { encryptor, decryptor } from "./lib/encryption";
import styles from "./page.module.css";

export default function EncryptionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const modeParam = params.mode as string;
  const mode = modeParam === "2" ? "decrypt" : "encrypt";

  const [message, setMessage] = useState(searchParams.get("m") ?? "");
  const [key, setKey] = useState(searchParams.get("k") ?? "");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOutput("");
  }, [mode]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowShare(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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

  function handleOpenShare() {
    const base = window.location.origin;
    const targetMode = mode === "encrypt" ? "1" : "2";
    const url = `${base}/encryption/${targetMode}?m=${encodeURIComponent(message)}&k=${encodeURIComponent(key)}`;
    setShareUrl(url);
    setLinkCopied(false);
    setShowShare(true);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function switchMode(m: "encrypt" | "decrypt") {
    const target = m === "encrypt" ? "1" : "2";
    router.push(`/encryption/${target}`);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) setShowShare(false);
  }

  return (
    <main className={styles.main}>
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
            onClick={() => switchMode("encrypt")}
          >
            ENCRYPT
          </button>
          <button
            className={`${styles.modeBtn} ${mode === "decrypt" ? styles.modeBtnActive : ""}`}
            onClick={() => switchMode("decrypt")}
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

          <div className={styles.btnRow}>
            <button className={styles.runBtn} onClick={handleRun}>
              <span>{mode === "encrypt" ? "ENCRYPT" : "DECRYPT"}</span>
              <span className={styles.arrow}>→</span>
            </button>
            <button className={styles.shareBtn} onClick={handleOpenShare}>
              ⬡ SHARE LINK
            </button>
          </div>
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

      {showShare && (
        <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>SHARE LINK</span>
              <button className={styles.closeBtn} onClick={() => setShowShare(false)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalField}>
                <span className={styles.label}>MODE</span>
                <span className={styles.modalValue}>{mode.toUpperCase()}</span>
              </div>

              <div className={styles.modalField}>
                <span className={styles.label}>MESSAGE</span>
                <span className={styles.modalValue}>
                  {message.trim()
                    ? message.length > 40 ? message.slice(0, 40) + "…" : message
                    : <span className={styles.modalEmpty}>— empty —</span>}
                </span>
              </div>

              <div className={styles.modalField}>
                <span className={styles.label}>KEY</span>
                <span className={styles.modalValue}>
                  {key.trim() ? key : <span className={styles.modalEmpty}>— empty —</span>}
                </span>
              </div>

              <div className={styles.modalUrlBlock}>
                <span className={styles.label}>URL</span>
                <p className={styles.modalUrl}>{shareUrl}</p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.copyLinkBtn} onClick={handleCopyLink}>
                {linkCopied ? "COPIED ✓" : "COPY LINK"}
                <span className={styles.arrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}