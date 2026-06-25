import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Phone, Mail, Headphones, Facebook, Instagram, Twitter, Youtube, Linkedin,
  Plane, ChevronDown, Menu, X, LogOut, User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    setUserMenuOpen(false);
    navigate({ to: "/" });
  };

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Account";

  return (
    <div className="w-full font-sans sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-navy-deep/90 border-b border-border text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> +91 98745 67890</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> info@mallicktravels.com</span>
            <span className="flex items-center gap-2"><Headphones className="h-3.5 w-3.5 text-primary" /> 24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs">Follow Us:</span>
            <a href="#" className="h-7 w-7 rounded-full bg-[#1877F2] text-white grid place-items-center"><Facebook className="h-3.5 w-3.5" /></a>
            <a href="#" className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white grid place-items-center"><Instagram className="h-3.5 w-3.5" /></a>
            <a href="#" className="h-7 w-7 rounded-full bg-sky-400 text-white grid place-items-center"><Twitter className="h-3.5 w-3.5" /></a>
            <a href="#" className="h-7 w-7 rounded-full bg-red-600 text-white grid place-items-center"><Youtube className="h-3.5 w-3.5" /></a>
            <a href="#" className="h-7 w-7 rounded-full bg-[#0A66C2] text-white grid place-items-center"><Linkedin className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#1a103c] flex items-center justify-center text-white shadow-sm">
              <Plane className="h-6 w-6 -rotate-45" fill="currentColor" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-extrabold text-[20px] sm:text-[22px] leading-[1.1] tracking-tight">
                <div className="text-[#1a103c]">MALLICK</div>
                <div className="text-[#FFB700]">TRAVELS</div>
              </div>
              <div className="text-[9px] sm:text-[10px] italic text-gray-500 font-medium tracking-tight mt-[1px]">
                Your Journey, Our Passion
              </div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[12px] font-bold text-[#1a103c]">
            <Link to="/" className="hover:text-[#FFB700] transition uppercase tracking-wide [&.active]:text-[#FFB700] [&.active]:border-b-2 [&.active]:border-[#FFB700] [&.active]:pb-1">HOME</Link>
            <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">FLIGHTS</a>
            <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">HOTELS</a>
            <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">HOLIDAY PACKAGES</a>
            <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">DOMESTIC TOURS</a>
            <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">INTERNATIONAL TOURS</a>
          </nav>

          <div className="flex items-center bg-[#FFB700] rounded-md px-4 py-2 gap-3 cursor-pointer hover:bg-yellow-500 transition shadow-sm">
            <Phone className="w-4 h-4 text-[#1a103c] fill-[#1a103c]" />
            <div className="flex flex-col text-[#1a103c] leading-none">
              <span className="text-[10px] font-bold">Call Us Now</span>
              <span className="text-[13px] font-extrabold tracking-wide mt-[2px]">+91 98745 67890</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FFB700] to-orange-500 grid place-items-center text-white font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-[13px] font-bold text-[#1a103c] max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown className="h-4 w-4 text-[#1a103c] hidden sm:inline" />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="font-bold text-sm text-[#1a103c] truncate">{displayName}</div>
                        <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                      </div>
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-[#1a103c] hover:bg-gray-50 flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 bg-[#1a103c] text-white text-[13px] font-bold px-4 py-2 rounded-md hover:bg-[#2a1f5c] transition"
              >
                <UserIcon className="h-4 w-4" /> Sign In
              </Link>
            )}

            <button onClick={() => setMobileOpen(v => !v)} className="xl:hidden p-2 text-[#1a103c]" aria-label="menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="xl:hidden mt-3 pb-3 border-t border-gray-100 pt-3 flex flex-col gap-3 text-[13px] font-bold text-[#1a103c] max-w-7xl mx-auto">
            <Link to="/" className="uppercase">HOME</Link>
            <a href="#" className="uppercase">FLIGHTS</a>
            <a href="#" className="uppercase">HOTELS</a>
            <a href="#" className="uppercase">HOLIDAY PACKAGES</a>
            <a href="#" className="uppercase">DOMESTIC TOURS</a>
            <a href="#" className="uppercase">INTERNATIONAL TOURS</a>
          </div>
        )}
      </header>
    </div>
  );
}
