import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, ChevronRight, Mail, Lock, Phone, User, KeyRound, ArrowLeft } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  
  // Modes: "login" or "signup"
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  // Login Specific States
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [loginOtpStep, setLoginOtpStep] = useState<"request" | "verify">("request");
  
  // Signup Specific States
  const [signupStep, setSignupStep] = useState<"details" | "otp" | "password">("details");
  
  // Form Data
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // ==============================
  //       LOGIN LOGIC
  // ==============================
  
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate({ to: "/" });
    }
    setLoading(false);
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

      if (error) throw error;
      toast.success("OTP sent to your email!");
      
      // 🔴 FIXED: UI কে verify স্টেপে পাঠানোর জন্য State আপডেট করা হলো
      setLoginOtpStep("verify"); 
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
        token: otp,
        type: 'email',
      });
      if (error) throw error;
      
      toast.success("Successfully verified! Welcome.");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  //       SIGNUP LOGIC
  // ==============================

  const handleSignupDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.functions.invoke("email-otp", {
      body: { action: "send", email },
    });
    
    if (error) {
      toast.error(error.message);
    } else { 
      setSignupStep("otp"); 
      toast.success("OTP sent to your email."); 
    }
    setLoading(false);
  };

  const handleSignupVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("email-otp", {
      body: { action: "verify", email, otp },
    });
    
    if (error || !data?.success) {
      toast.error("Invalid OTP");
    } else { 
      setSignupStep("password"); 
      toast.success("OTP Verified! Set your password."); 
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName, phone: phone } }
    });
    
    if (error) {
      toast.error(error.message);
    } else { 
      toast.success("Account created successfully!"); 
      navigate({ to: "/" }); 
    }
    setLoading(false);
  };

  // ==============================
  //       HELPERS
  // ==============================
  
  const resetStates = () => {
    setLoginOtpStep("request");
    setSignupStep("details");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setOtpSent(false);
  };

  // ==============================
  //       UI RENDERING
  // ==============================

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
      
      {/* Full Page Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/50 z-10 backdrop-blur-[2px]" />
        <img 
          src={authBg} 
          alt="Travel Background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Floating Auth Card Container */}
      <div className="relative z-20 w-full max-w-[440px] flex flex-col items-center">
        
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-white">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg mb-4 border border-white/20">
            <Plane className="h-8 w-8 text-[#FFB700]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Mallick Travels</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100/50"
        >
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-slate-500 text-sm">
              {mode === "login" 
                ? "Enter your details to access your account." 
                : "Join us to unlock exclusive travel deals."}
            </p>
          </div>

          {/* Login Method Toggle (Only for Login Mode) */}
          {mode === "login" && loginOtpStep === "request" && (
            <div className="flex p-1 bg-slate-100 rounded-lg mb-8">
              <button
                type="button"
                onClick={() => { setLoginMethod("password"); setOtp(""); }}
                className={`flex-1 text-sm font-medium py-2.5 rounded-md transition-all duration-200 ${
                  loginMethod === "password" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => { setLoginMethod("otp"); setPassword(""); }}
                className={`flex-1 text-sm font-medium py-2.5 rounded-md transition-all duration-200 ${
                  loginMethod === "otp" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Email OTP
              </button>
            </div>
          )}

          {/* Signup Progress Bar */}
          {mode === "signup" && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 px-1">
                <span className={signupStep === "details" ? "text-slate-900" : ""}>Details</span>
                <span className={signupStep === "otp" ? "text-slate-900" : ""}>Verify</span>
                <span className={signupStep === "password" ? "text-slate-900" : ""}>Security</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className={`h-full bg-slate-900 transition-all duration-500 ${signupStep === "details" ? "w-1/3" : signupStep === "otp" ? "w-2/3" : "w-full"}`} />
              </div>
            </div>
          )}

          {/* Form Area */}
          <AnimatePresence mode="wait">
            <motion.form 
              key={mode + (mode === "login" ? loginMethod + loginOtpStep : signupStep)}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={
                mode === "login"
                  ? (loginMethod === "password" ? handlePasswordLogin : (loginOtpStep === "request" ? handleSendOtp : handleVerifyOtp))
                  : (signupStep === "details" ? handleSignupDetails : signupStep === "otp" ? handleSignupVerifyOtp : handleSetPassword)
              }
              className="space-y-4"
            >
              
              {/* --- LOGIN FORMS --- */}
              {mode === "login" && loginMethod === "password" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white mt-2 font-medium" disabled={loading}>
                    Sign In
                  </Button>
                </div>
              )}

              {mode === "login" && loginMethod === "otp" && loginOtpStep === "request" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp-email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input id="otp-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white mt-2 font-medium" disabled={loading}>
                    Send One-Time Password
                  </Button>
                </div>
              )}

              {mode === "login" && loginMethod === "otp" && loginOtpStep === "verify" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button type="button" onClick={() => setLoginOtpStep("request")} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                      <ArrowLeft className="h-4 w-4 text-slate-500" />
                    </button>
                    <Label>Enter Verification Code</Label>
                  </div>
                  <p className="text-sm text-slate-500 pb-2">We sent a 6-digit code to <span className="font-medium text-slate-900">{email}</span></p>
                  <Input placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} className="h-12 text-center text-xl tracking-[0.5em] font-medium" maxLength={6} required />
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white mt-2 font-medium" disabled={loading}>
                    Verify & Login
                  </Button>
                </div>
              )}


              {/* --- SIGNUP FORMS --- */}
              {mode === "signup" && signupStep === "details" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 h-12" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input placeholder="+880..." value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 h-12" required />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white mt-4 font-medium" disabled={loading}>
                    Continue <ChevronRight className="ml-2 h-4 w-4"/>
                  </Button>
                </div>
              )}

              {mode === "signup" && signupStep === "otp" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button type="button" onClick={() => setSignupStep("details")} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                      <ArrowLeft className="h-4 w-4 text-slate-500" />
                    </button>
                    <Label>Verify Email</Label>
                  </div>
                  <p className="text-sm text-slate-500 pb-2">Enter the 6-digit code sent to <span className="font-medium text-slate-900">{email}</span></p>
                  <Input placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} className="h-12 text-center text-xl tracking-[0.5em] font-medium" maxLength={6} required />
                  <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white mt-2 font-medium" disabled={loading}>
                    Verify Code
                  </Button>
                </div>
              )}

              {mode === "signup" && signupStep === "password" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button type="button" onClick={() => setSignupStep("otp")} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                      <ArrowLeft className="h-4 w-4 text-slate-500" />
                    </button>
                    <Label>Secure your account</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required minLength={6} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-12" required minLength={6} />
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white mt-4 font-medium" disabled={loading}>
                    Create Account
                  </Button>
                </div>
              )}
            </motion.form>
          </AnimatePresence>

          {/* Bottom Toggle Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => { 
                  setMode(mode === "login" ? "signup" : "login"); 
                  resetStates();
                }} 
                className="font-semibold text-slate-900 hover:underline transition-all"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
