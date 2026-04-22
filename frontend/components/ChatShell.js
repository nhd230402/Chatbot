"use client";

import { useMemo, useState } from "react";
import { sendChat } from "../lib/api";

export default function ChatShell({ auth, onLogout }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome! This is a demo chat UI. Ask anything to test the flow.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const userLabel = useMemo(() => auth.email.split("@")[0], [auth.email]);

  async function handleSend(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const response = await sendChat(text, auth.token);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.message,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Chat not implemented yet",
        },
      ]);
    } finally {
      setSending(false);
    }

    // TODO: save messages to database
    // TODO: implement streaming
  }

  return (
    <section className="mx-auto flex h-[92vh] w-full max-w-5xl animate-reveal flex-col rounded-3xl border border-white/70 bg-white/85 shadow-[0_24px_90px_rgba(15,35,96,0.18)] backdrop-blur-sm">
      <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <p className="font-display text-xl font-semibold text-ink">Chatbot Demo</p>
          <p className="text-sm text-slate-500">Signed in as {userLabel}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Logout
        </button>
      </header>

      <div className="message-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`animate-reveal rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
              message.role === "user"
                ? "ml-auto max-w-[80%] bg-tide text-white"
                : "mr-auto max-w-[80%] bg-card-muted text-slate-800"
            }`}
            style={{ animationDelay: `${Math.min(index * 50, 250)}ms` }}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-3 py-2 shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="rounded-xl bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
