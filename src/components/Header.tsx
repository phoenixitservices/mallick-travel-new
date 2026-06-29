import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone, Mail, Headphones, Facebook, Instagram, Twitter, Youtube, Linkedin,
  Plane, Menu, X, User as UserIcon, ChevronDown
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "./UserDropdown";
import { supabase } from "@/integrations/supabase/client";

type MenuItem = {
  id: number;
  title: string;
  url: string;
  sort_order: number;
  is_active: boolean;
};

// Define the type for your company settings
type CompanySettings = {
  phone?: string;
  email?: string;
  // add other fields if necessary
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Added missing state for companyData
  const [companyData, setCompanyData] = useState<CompanySettings | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Combined fetch logic to prevent loading state race conditions
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch both company settings and menu items simultaneously
        const [companyRes, menuRes] = await Promise.all([
          supabase.from('company_settings').select('*'),
          supabase.from('menu_items').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        ]);

        if (companyRes.error) console.error("Company settings fetch failed:", companyRes.error);
        if (menuRes.error) console.error("Menu fetch failed:", menuRes.error);

        if (companyRes.data && companyRes.data.length > 0) {
          setCompanyData(companyRes.data[0]);
        }
        
        if (menuRes.data) {
          setMenuItems(menuRes.data);
        }
      } catch (error) {
        console.error("Header data fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  const MAX_ITEMS = 6;
  const visibleItems = menuItems.length > MAX_ITEMS ? menuItems.slice(0, MAX_ITEMS - 1) : menuItems;
  const moreItems = menuItems.length > MAX_ITEMS ? menuItems.slice(MAX_ITEMS - 1) : [];
  const hasMore = moreItems.length > 0;

  return (
    <div className="w-full font-sans sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-navy-deep/90 border-b border-border text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" />{companyData?.phone || "Loading..."}</span>
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" />{companyData?.email || "Loading..."}</span>
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

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[12px] font-bold text-[#1a103c]">
            {isLoading ? (
              <div className="text-gray-400 animate-pulse">Loading menu...</div>
            ) : (
              <>
                {visibleItems.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.url as any} 
                    className="hover:text-[#FFB700] transition uppercase tracking-wide [&.active]:text-[#FFB700] [&.active]:border-b-2 [&.active]:border-[#FFB700] [&.active]:pb-1"
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* MORE Dropdown Menu */}
                {hasMore && (
                  <div className="relative group cursor-pointer">
                    <div className="flex items-center gap-1 hover:text-[#FFB700] transition uppercase tracking-wide py-2">
                      MORE <ChevronDown className="h-4 w-4" />
                    </div>
                    <div className="absolute top-[100%] left-0 min-w-[200px] bg-white shadow-lg border border-gray-100 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                      {moreItems.map((item) => (
                        <Link 
                          key={item.id} 
                          to={item.url as any} 
                          className="px-4 py-2 hover:bg-gray-50 hover:text-[#FFB700] transition uppercase tracking-wide text-[12px]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Applied dynamic phone number mapping here as well */}
          <div className="flex items-center bg-[#FFB700] rounded-md px-4 py-2 gap-3 cursor-pointer hover:bg-yellow-500 transition shadow-sm">
            <Phone className="w-4 h-4 text-[#1a103c] fill-[#1a103c]" />
            <div className="flex flex-col text-[#1a103c] leading-none">
              <span className="text-[10px] font-bold">Call Us Now</span>
              <span className="text-[13px] font-extrabold tracking-wide mt-[2px]">{companyData?.phone || "Loading..."}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserDropdown />
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

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="xl:hidden mt-3 pb-3 border-t border-gray-100 pt-3 flex flex-col gap-3 text-[13px] font-bold text-[#1a103c] max-w-7xl mx-auto">
            {isLoading ? (
              <div className="text-gray-400 animate-pulse text-center">Loading menu...</div>
            ) : (
              menuItems.map((item) => (
                <Link key={item.id} to={item.url as any} className="uppercase">
                  {item.title}
                </Link>
              ))
            )}
          </div>
        )}
      </header>
    </div>
  );
}
