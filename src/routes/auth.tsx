import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Mail, Lock, User, Phone, KeyRound, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"form" | "otp" | "password">("form");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  // Logic Handlers (Unchanged)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else { toast.success("Welcome back!"); navigate({ to: "/" }); }
    setLoading(false);
  };

  const handleSignupDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.functions.invoke("email-otp", {
      body: { action: "send", email },
    });
    if (error) toast.error(error.message);
    else { setStep("otp"); toast.success("OTP sent to your email."); }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("email-otp", {
      body: { action: "verify", email, otp },
    });
    if (error || !data.success) toast.error("Invalid OTP");
    else { setStep("password"); toast.success("OTP Verified!"); }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords don't match");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName, phone: phone } }
    });
    if (error) toast.error(error.message);
    else { toast.success("Account created!"); navigate({ to: "/auth" }); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px]"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-3 bg-[#1a103c] rounded-xl shadow-lg mb-4">
            <Plane className="h-8 w-8 text-[#FFB700]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mallick Travels</h1>
        </div>

        {/* Auth Card */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-900">
              {isLogin ? "Sign In" : step === "otp" ? "Verification" : step === "password" ? "Security" : "Create Account"}
            </h2>
            <div className="text-xs font-medium text-slate-500">
              {isLogin ? "1/1" : step === "form" ? "1/3" : step === "otp" ? "2/3" : "3/3"}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? "login" : step}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              onSubmit={isLogin ? handleLogin : (step === "form" ? handleSignupDetails : step === "otp" ? handleVerifyOtp : handleSetPassword)}
              className="space-y-4"
            >
              {isLogin ? (
                <>
                  <Input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" required />
                  <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" required />
                  <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" disabled={loading}>Sign In</Button>
                </>
              ) : (
                <>
                  {step === "form" && (
                    <>
                      <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11" required />
                      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11" required />
                      <Input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" required />
                      <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" disabled={loading}>Continue <ChevronRight className="ml-2 h-4 w-4"/></Button>
                    </>
                  )}
                  {step === "otp" && (
                    <>
                      <Input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="h-11 text-center tracking-widest" required />
                      <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>Verify</Button>
                    </>
                  )}
                  {step === "password" && (
                    <>
                      <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" required />
                      <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11" required />
                      <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white" disabled={loading}>Complete</Button>
                    </>
                  )}
                </>
              )}
            </motion.form>
          </AnimatePresence>

          {/* Toggle Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setStep("form"); }} 
              className="text-sm text-slate-500 hover:text-slate-900 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
