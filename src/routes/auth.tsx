import { useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Plane, Mail, Lock, User as UserIcon, Loader2, ArrowRight, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import authBg from "@/assets/auth-bg.jpg";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: (s.redirect as string) || "/",
    mode: (s.mode as "signin" | "signup" | "otp") || "signin",
  }),
  head: () => ({
    meta: [
      { title: "Authentication — Mallick Travels" },
      { name: "description", content: "Sign in or create an account to access bookings and exclusive deals." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();

  // Added "otp" to the available modes
  const [mode, setMode] = useState<"signin" | "signup" | "otp">(search.mode as "signin" | "signup" | "otp" || "signin");

  // Standard auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP specific state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const onPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created! You're signed in.");
        navigate({ to: search.redirect as any });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: search.redirect as any });
      }
    } catch (err: any) {
      toast.error(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: undefined,
        },
      });

      console.log(data);
      console.log(error);
      if (error) throw error;
      toast.success("OTP sent to your email!");
      setOtpSent(true);
    } catch (err: any) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email',
      });
      if (error) throw error;
      toast.success("Successfully verified! Welcome.");
      navigate({ to: search.redirect as any });
    } catch (err: any) {
      toast.error(err?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + search.redirect,
      });
      if (result.error) {
        toast.error(result.error.message || "Google sign-in failed");
        return;
      }
      if (result.redirected) return;
      toast.success("Welcome!");
      navigate({ to: search.redirect as any });
    } catch (err: any) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 bg-[#1a103c]">
      <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a103c]/85 via-[#1a103c]/70 to-purple-900/80" />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="bg-gradient-to-br from-[#1a103c] to-purple-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <Plane className="absolute right-4 top-1/3 h-64 w-64 text-white/5 -rotate-12" />
          <div className="relative">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#1a103c] grid place-items-center shadow-md">
                <Plane className="h-6 w-6 -rotate-45 text-white" fill="currentColor" />
              </div>
              <div>
                <div className="font-extrabold text-white leading-none">MALLICK</div>
                <div className="font-extrabold text-[#FFB700] leading-none mt-0.5">TRAVELS</div>
              </div>
            </Link>
          </div>
          <div className="relative mt-12 lg:mt-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[Playfair_Display] italic text-[#FFB700]">
              Welcome {mode === "signup" ? "Aboard!" : "Back!"}
            </h2>
            <p className="mt-3 text-white/80 text-sm sm:text-base max-w-xs">
              {mode === "signup"
                ? "Create your account to start booking flights, hotels and exclusive holiday packages."
                : "Sign in to access your bookings, saved trips, and exclusive member discounts."}
            </p>
          </div>
          <div className="relative text-xs text-white/60 mt-12 lg:mt-0">
            © {new Date().getFullYear()} Mallick Travels. All Rights Reserved.
          </div>
        </div>

        {/* Right form panel */}
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-[#1a103c]">
            {mode === "signup" ? "Create Account" : mode === "otp" ? "Login with Code" : "Sign In"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "signup" ? "Enter your details to get started." : "Enter your details to access your account."}
          </p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-bold text-[#1a103c] hover:bg-gray-50 transition disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5c-2 1.4-4.6 2.4-7.5 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.5c-.5.4 6.8-4.9 6.8-15.1 0-1.3-.1-2.6-.4-3.5z" /></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* OTP FORM */}
          {mode === "otp" ? (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1a103c]">Email Address</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-[#FFB700]">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" required disabled={otpSent}
                    className="flex-1 outline-none text-sm bg-transparent disabled:opacity-50"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="text-xs font-bold text-[#1a103c]">6-Digit Code</label>
                  <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-[#FFB700]">
                    <KeyRound className="h-4 w-4 text-gray-400" />
                    <input
                      type="text" value={otpCode} onChange={e => setOtpCode(e.target.value)}
                      placeholder="123456" required maxLength={6}
                      className="flex-1 outline-none text-sm bg-transparent tracking-widest"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#FFB700] text-[#1a103c] font-extrabold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>
                  {otpSent ? "Verify Code" : "Send OTP Code"} <ArrowRight className="h-4 w-4" />
                </>}
              </button>
            </form>
          ) : (
            /* STANDARD EMAIL/PASSWORD FORM */
            <form onSubmit={onPasswordSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-bold text-[#1a103c]">Full Name</label>
                  <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-[#FFB700]">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <input
                      type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                      placeholder="Your name" required
                      className="flex-1 outline-none text-sm bg-transparent"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-[#1a103c]">Email Address</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-[#FFB700]">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" required
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1a103c]">Password</label>
                  {mode === "signin" && <a href="#" className="text-xs font-bold text-[#FFB700]">Forgot Password?</a>}
                </div>
                <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 focus-within:border-[#FFB700]">
                  <Lock className="h-4 w-4 text-gray-400" />
                  <input
                    type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required minLength={6}
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#FFB700] text-[#1a103c] font-extrabold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>
                  {mode === "signup" ? "Create Account" : "Sign In"} <ArrowRight className="h-4 w-4" />
                </>}
              </button>
            </form>
          )}

          {/* MODE TOGGLES */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-gray-500 text-center">
              {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signup" ? "signin" : "signup");
                  setOtpSent(false); // Reset OTP state if they switch
                }}
                className="font-bold text-[#1a103c] hover:underline"
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </p>

            {/* Toggle for Magic Link / OTP */}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "otp" ? "signin" : "otp");
                setOtpSent(false);
              }}
              className="text-sm font-bold text-purple-700 hover:text-purple-900 transition underline decoration-purple-300 underline-offset-4"
            >
              {mode === "otp" ? "Sign in with Password instead" : "Sign in with Email Code (OTP)"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
