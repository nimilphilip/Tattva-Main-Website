import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Logo } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";
import { login, isAuthenticated } from "@/lib/admin-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Login — Tattva Fincorp" },
      { name: "description", content: "Secure administrative login for Tattva Fincorp investor relations." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("tattva@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/admin/investor-relations" });
    }
  }, [navigate]);

  function handleAutofill() {
    setUsername("admin");
    setPassword("tattva@2026");
    setError(null);
    toast.info("Demo credentials filled: admin / tattva@2026");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password, rememberMe);
      setLoading(false);

      if (res.success) {
        toast.success("Logged in successfully. Welcome to Document Management!");
        navigate({ to: "/admin/investor-relations" });
      } else {
        setError(res.error || "Authentication failed.");
      }
    }, 400);
  }

  return (
    <div className="min-h-screen bg-navy-deep relative flex flex-col justify-center items-center px-4 py-12">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/25 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/investor-relations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-gold transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Investor Relations</span>
          </Link>
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-white/60">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>Secure Admin Portal</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-elevated p-8 text-card-foreground">
          <div className="text-center mb-6">
            <div className="inline-flex justify-center mb-3">
              <Logo className="h-20 w-20" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-foreground">
              Document Portal Login
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to add, update, and manage Investor Relations documents.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs leading-relaxed font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Username or Staff ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="pl-10 h-11 rounded-xl bg-background border-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 h-11 rounded-xl bg-background border-input text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={handleAutofill}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
              >
                <KeyRound className="h-3 w-3" />
                <span>Fill Demo Login</span>
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-brand text-white font-semibold shadow-soft mt-2"
            >
              {loading ? "Verifying Credentials..." : "Sign In to Admin Portal"}
            </Button>
          </form>

          {/* Quick Demo Credentials Info Pill */}
          <div className="mt-6 pt-5 border-t border-border/80 text-center">
            <div className="text-[11px] text-muted-foreground">
              Demo Credentials: <span className="font-semibold text-foreground">admin</span> / <span className="font-semibold text-foreground">tattva@2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
