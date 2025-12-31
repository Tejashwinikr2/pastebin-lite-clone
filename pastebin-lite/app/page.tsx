"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createPaste() {
    setError(null);
    setResult(null);

    if (!content.trim()) {
      setError("Please enter some text");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/paste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(`${window.location.origin}/p/${data.id}`);
      setContent("");
    } catch {
      setError("Failed to create paste");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          height: "250px",
          padding: "12px",
          fontSize: "16px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={createPaste}
        disabled={loading}
        style={{
          marginTop: "16px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
      )}

      {result && (
        <p style={{ marginTop: "12px" }}>
          Paste created:{" "}
          <a href={result} target="_blank">
            {result}
          </a>
        </p>
      )}
    </main>
  );
}
