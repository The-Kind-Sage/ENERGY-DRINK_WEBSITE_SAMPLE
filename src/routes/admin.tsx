import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { adminLoginFn, adminSignupFn } from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("admin_token");
  });

  const [status, setStatus] = useState<"guest" | "authed">(() => (token ? "authed" : "guest"));

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const res = await adminSignupFn({ data: { email, password } });
        if (!res.ok) {
          setError(res.reason);
          return;
        }
        if (res.token) {
          window.localStorage.setItem("admin_token", res.token);
          setToken(res.token);
        }
        setStatus("authed");
        return;
      }

      const res = await adminLoginFn({ data: { email, password } });
      if (!res.ok) {
        setError(res.reason);
        return;
      }
      window.localStorage.setItem("admin_token", res.token);
      setToken(res.token);
      setStatus("authed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Signup/login for admin. First signup bootstraps the first admin.</p>

        {status === "authed" ? (
          <div className="mt-6 rounded-lg border border-border bg-card/40 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Signed in</div>
            <div className="mt-2">{email ? email : "admin"}</div>
            <div className="mt-4 flex gap-3">
              <button
                className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold"
                onClick={() => {
                  window.localStorage.removeItem("admin_token");
                  setToken(null);
                  setStatus("guest");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-border bg-card/40 p-5">
            <div className="flex gap-2 mb-4">
              <button
                className={
                  mode === "signup"
                    ? "px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold"
                    : "px-3 py-2 rounded-md border border-border text-sm"
                }
                onClick={() => setMode("signup")}
              >
                Signup
              </button>
              <button
                className={
                  mode === "login"
                    ? "px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold"
                    : "px-3 py-2 rounded-md border border-border text-sm"
                }
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
              />

              <label className="block text-sm font-medium">Password</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />

              {error && <div className="text-sm text-red-500">{error}</div>}

              <button
                disabled={busy || !email || !password}
                onClick={handleSubmit}
                className="w-full rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold disabled:opacity-50"
              >
                {busy ? "Please wait..." : mode === "signup" ? "Signup" : "Login"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

