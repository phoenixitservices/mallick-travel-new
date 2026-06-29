import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone, Mail, Headphones, Facebook, Instagram, Twitter, Youtube, Linkedin,
  Plane, Menu, X, User as UserIcon, ChevronDown
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "./UserDropdown";

// Menu item er jnno type definition
type MenuItem = {
  id: string;
  title: string;
  url: string;
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Dynamic menu items store korar jonno state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Ekhane apni apnar actual API ba database theke data fetch korben.
    // Ami ekhane dummy data diyeci check korar jonno (8 ta item ache).
    const fetchMenuData = async () => {
      try {
        // const response = await fetch('/api/menus');
        // const data = await response.json();
        const dummyDbData = [
          { id: "1", title: "HOME", url: "/" },
          { id: "2", title: "FLIGHTS", url: "/flights" },
          { id: "3", title: "HOTELS", url: "/hotels" },
          { id: "4", title: "HOLIDAY PACKAGES", url: "/packages" },
          { id: "5", title: "DOMESTIC TOURS", url: "/domestic" },
          { id: "6", title: "INTERNATIONAL TOURS", url: "/international" },
          { id: "7", title: "CRUISES", url: "/cruises" },
          { id: "8", title: "VISA OFFERS", url: "/visa" },
        ];
        setMenuItems(dummyDbData);
      } catch (error) {
        console.error("Menu fetch failed:", error);
      }
    };

    fetchMenuData();
  }, []);

  // 6 tar besi hole logic
  const MAX_ITEMS = 6;
  // Jodi total items 6 er besi hoy, tahole prothom 5 ta alada korchi
  const visibleItems = menuItems.length > MAX_ITEMS ? menuItems.slice(0, MAX_ITEMS - 1) : menuItems;
  // Baki item gulo "More" dropdown er jonno rakhchi
  const moreItems = menuItems.length > MAX_ITEMS ? menuItems.slice(MAX_ITEMS - 1) : [];
  const hasMore = moreItems.length > 0;

  return (
    <div className="w-full font-sans sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-navy-deep/90 border-b border-border text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-white">
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

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[12px] font-bold text-[#1a103c]">
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
            {menuItems.map((item) => (
              <Link key={item.id} to={item.url as any} className="uppercase">
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
