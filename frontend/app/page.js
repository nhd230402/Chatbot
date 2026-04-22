"use client";

import { useEffect, useState } from "react";
import AuthCard from "../components/AuthCard";
import ChatShell from "../components/ChatShell";

const STORAGE_KEY = "chatbot_demo_auth";

export default function HomePage() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAuth(JSON.parse(saved));
    }
  }, []);

  function handleAuthenticated(payload) {
    const authState = {
      token: payload.token,
      userId: payload.user_id,
      email: payload.email,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
    setAuth(authState);
  }

  function handleLogout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center p-4 md:p-8">
      {auth ? (
        <ChatShell auth={auth} onLogout={handleLogout} />
      ) : (
        <AuthCard onAuthenticated={handleAuthenticated} />
      )}
    </main>
  );
}
