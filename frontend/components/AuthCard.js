"use client";

import { useState } from "react";
import { login, register } from "../lib/api";

export default function AuthCard({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const action = mode === "login" ? login : register;
      const response = await action(email, password);
      onAuthenticated(response);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md animate-reveal rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_20px_80px_rgba(18,36,94,0.16)] backdrop-blur-sm">
      <h1 className="font-display text-3xl font-bold text-ink">AI Chatbot Demo</h1>
      <p className="mt-2 text-sm text-slate-600">Simple email/password auth for demo use.</p>

      <div className="mt-6 grid grid-cols-2 rounded-xl bg-mist p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "login" ? "bg-white text-ink shadow" : "text-slate-500"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "register" ? "bg-white text-ink shadow" : "text-slate-500"
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-tide/30 transition focus:ring"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-tide/30 transition focus:ring"
            placeholder="********"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-ink px-4 py-2.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </section>
  );
}
