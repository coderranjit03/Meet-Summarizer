import React, { useState, useEffect } from "react";
import { useAuthModal } from "@/lib/authModalContext.jsx";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AuthModal() {
  const { open, mode, closeModal, setMode, signIn } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setConfirm("");
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!open) return null;

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate auth success
    // mark user authenticated and close modal
    if (typeof window !== 'undefined') {
      // call signIn from context
    }
    if (typeof useAuthModal === 'function') {
      // noop
    }
    // In real app, call API here
    // mark user as signed in
    signIn();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-md mx-4">
        <div className="rounded-2xl bg-white/60 dark:bg-white/8 border border-border backdrop-blur-md p-6 shadow-2xl text-foreground dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{mode === "signin" ? "Sign in to Meet Summarizer" : "Create your account"}</h3>
            <button onClick={closeModal} className="rounded-md p-2 hover:bg-muted/10">
              <X />
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "signin" ? "bg-primary/10 text-primary" : "bg-muted/10"}`}>
              Sign in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "signup" ? "bg-primary/10 text-primary" : "bg-muted/10"}`}>
              Sign up
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-md bg-background/50 border border-input p-2 text-foreground placeholder:text-muted-foreground" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-md bg-background/50 border border-input p-2 text-foreground" placeholder="••••••••" />
            </div>
            {mode === "signup" && (
              <div>
                <label className="text-sm text-muted-foreground">Confirm password</label>
                <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-1 w-full rounded-md bg-background/50 border border-input p-2 text-foreground" placeholder="••••••••" />
              </div>
            )}

            {error && <div className="text-sm text-rose-600">{error}</div>}

            <div className="flex items-center gap-3">
              <Button type="submit" className="flex-1">{mode === "signin" ? "Sign in" : "Create account"}</Button>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">By continuing you agree to our Terms and Privacy.</div>
        </div>
      </div>
    </div>
  );
}
