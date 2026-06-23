import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import heroImg from "@/assets/hero.jpg"; // Reusing your hero image for the background

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Call the login function from our AuthContext
    await login(email, password);
    
    // Redirect back to the home page after successful login
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Travel Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a103c]/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 h-[600px]">
        
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#1a103c] to-purple-950 p-12 text-white relative overflow-hidden">
          <Plane className="absolute -top-10 -right-10 w-64 h-64 text-white/5 -rotate-45" />
          
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#1a103c] flex items-center justify-center text-white shadow-lg border border-white/10">
                <Plane className="h-6 w-6 -rotate-45" fill="currentColor" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-extrabold text-2xl leading-[1.1] tracking-tight">
                  <div className="text-white">MALLICK</div>
                  <div className="text-[#FFB700]">TRAVELS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="z-10 mt-12">
            <h1 className="text-4xl font-bold mb-4 font-[Playfair_Display] italic text-[#FFB700]">
              Welcome Back!
            </h1>
            <p className="text-white/80 text-lg">
              Sign in to access your bookings, saved trips, and exclusive member discounts.
            </p>
          </div>

          <div className="text-sm text-white/50">
            © 2025 Mallick Travels. All Rights Reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-extrabold text-[#1a103c] mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-gray-500 mb-8">
              {isLogin 
                ? "Enter your details to access your account." 
                : "Join us to start planning your dream vacations."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a103c] focus:ring-1 focus:ring-[#1a103c] outline-none transition"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a103c] focus:ring-1 focus:ring-[#1a103c] outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700">Password</label>
                  {isLogin && (
                    <a href="#" className="text-sm font-semibold text-[#FFB700] hover:text-yellow-600">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a103c] focus:ring-1 focus:ring-[#1a103c] outline-none transition"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#FFB700] hover:bg-yellow-500 text-[#1a103c] font-extrabold py-3.5 rounded-lg flex justify-center items-center gap-2 transition shadow-md disabled:opacity-70 mt-6"
              >
                {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#1a103c] font-extrabold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
