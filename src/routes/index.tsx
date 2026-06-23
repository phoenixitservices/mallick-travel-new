import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone, Mail, Headphones, Facebook, Instagram, Twitter, Youtube,
  Plane, Building2, Palmtree, Train, Bus, Shield, Briefcase,
  MapPin, Calendar, Users, ArrowRightLeft, ChevronDown,
  ArrowRight, ChevronLeft, ChevronRight, Star, Tag, Headset,
  ShieldCheck, UserCheck, Sparkles, Award, Globe,
  MessageCircle, Menu, X,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import goa from "@/assets/goa.jpg";
import kerala from "@/assets/kerala.jpg";
import kashmir from "@/assets/kashmir.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import darjeeling from "@/assets/darjeeling.jpg";
import andaman from "@/assets/andaman.jpg";
import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.jpg";
import t3 from "@/assets/t3.jpg";
import { FaWhatsapp } from "react-icons/fa";

// Import Auth Context and UserDropdown
import { useAuth } from "@/contexts/AuthContext";
import { UserDropdown } from "@/components/UserDropdown";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = ["HOME", "FLIGHTS", "HOTELS", "HOLIDAY PACKAGES", "DOMESTIC TOURS", "INTERNATIONAL TOURS", "VISA SERVICES"];

const services = [
  { icon: Plane, label: "Flight Booking", desc: "Domestic & International flight tickets", color: "text-sky-500", bg: "bg-sky-100" },
  { icon: Building2, label: "Hotel Booking", desc: "Wide range of hotels at best prices", color: "text-blue-400", bg: "bg-blue-100" },
  { icon: Palmtree, label: "Holiday Packages", desc: "Customized packages for all budgets", color: "text-emerald-500", bg: "bg-emerald-100" },
  { icon: Train, label: "Train Tickets", desc: "Book train tickets across India", color: "text-rose-500", bg: "bg-rose-100" },
  { icon: Bus, label: "Bus Booking", desc: "Affordable bus tickets across India", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: Shield, label: "Visa Assistance", desc: "Hassle-free visa support", color: "text-rose-500", bg: "bg-rose-100" },
  { icon: Briefcase, label: "Travel Insurance", desc: "Complete protection for your journey", color: "text-purple-brand", bg: "bg-purple-100" },
];

const destinations = [
  { name: "Goa", nights: "3N / 4D", price: "12,999", img: goa },
  { name: "Kerala", nights: "4N / 5D", price: "18,999", img: kerala },
  { name: "Kashmir", nights: "5N / 6D", price: "24,999", img: kashmir },
  { name: "Rajasthan", nights: "4N / 5D", price: "15,999", img: rajasthan },
  { name: "Darjeeling", nights: "3N / 4D", price: "13,999", img: darjeeling },
  { name: "Andaman", nights: "4N / 5D", price: "19,999", img: andaman },
];

const features = [
  { icon: Tag, label: "Best Prices", desc: "We offer the best prices and exclusive deals", color: "text-orange-500", bg: "bg-orange-100" },
  { icon: ShieldCheck, label: "Trusted Services", desc: "Reliable & safe travel solutions", color: "text-purple-brand", bg: "bg-purple-100" },
  { icon: UserCheck, label: "Expert Team", desc: "Experienced travel consultants", color: "text-rose-500", bg: "bg-rose-100" },
  { icon: Sparkles, label: "Customized Tours", desc: "Personalized itineraries as per your needs", color: "text-emerald-500", bg: "bg-emerald-100" },
  { icon: Headset, label: "24/7 Support", desc: "We are always here to help you", color: "text-sky-500", bg: "bg-sky-100" },
];

const testimonials = [
  { name: "Arijit Sen", city: "Kolkata", img: t1, text: "Excellent service and very professional team. Our trip to Bali was perfectly organized. Highly recommended!" },
  { name: "Priyanka Dutta", city: "Kolkata", img: t2, text: "Mallick Travels made our honeymoon so special. Everything was smooth and well-planned." },
  { name: "Soumyajit Paul", city: "Kolkata", img: t3, text: "Best travel agency in Kolkata. Great support 24/7 and very competitive pricing." },
];

const stats = [
  { icon: UserCheck, value: "15+", label: "Years of Experience" },
  { icon: Sparkles, value: "10,000+", label: "Happy Customers" },
  { icon: Calendar, value: "500+", label: "Tour Packages" },
  { icon: Headphones, value: "24/7", label: "Customer Support" },
  { icon: Globe, value: "100+", label: "Destinations" },
];

const bookingTabs = [
  { icon: Plane, label: "FLIGHTS" },
  { icon: Building2, label: "HOTELS" },
  { icon: Users, label: "HOLIDAYS" },
  { icon: Train, label: "TRAINS" },
  { icon: Bus, label: "BUSES" },
];

function Index() {
  const [activeTab, setActiveTab] = useState("FLIGHTS");
  const [tripType, setTripType] = useState("one");
  const [destFilter, setDestFilter] = useState<"Domestic" | "International">("Domestic");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Bring in the Authentication state & functions
  const { isAuthenticated, login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
          </div>
        </div>
      </div>

      <header className="w-full font-sans sticky top-0 z-50">

        {/* 2. Main Navbar */}
        <div className="bg-white shadow-sm px-4 sm:px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Logo & Company Name */}
            <div className="flex items-center gap-3 cursor-pointer">
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
            </div>

            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-[12px] font-bold text-[#1a103c]">
              <Link to="/" className="text-[#FFB700] border-b-2 border-[#FFB700] pb-1 uppercase tracking-wide [&.active]:text-[#FFB700]">HOME</Link>
              <Link to="/flight-booking" className="hover:text-[#FFB700] transition uppercase tracking-wide [&.active]:text-[#FFB700] [&.active]:border-b-2 [&.active]:border-[#FFB700] [&.active]:pb-1">FLIGHTS</Link>
              <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">HOTELS</a>
              <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">HOLIDAY PACKAGES</a>
              <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">DOMESTIC TOURS</a>
              <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">INTERNATIONAL TOURS</a>
              <a href="#" className="hover:text-[#FFB700] transition uppercase tracking-wide">VISA SERVICES</a>
              <a href="#" className="hover:text-[#FFB700] transition uppercase flex items-center gap-1 tracking-wide">
                MORE <ChevronDown className="w-3 h-3 stroke-[3]" />
              </a>
            </nav>

            {/* Right Side: Call Us & Auth */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Call Us Button */}
              <div className="flex items-center bg-[#FFB700] rounded-md px-4 py-2 gap-3 cursor-pointer hover:bg-yellow-500 transition shadow-sm">
                <Phone className="w-4 h-4 text-[#1a103c] fill-[#1a103c]" />
                <div className="flex flex-col text-[#1a103c] leading-none">
                  <span className="text-[10px] font-bold">Call Us Now</span>
                  <span className="text-[13px] font-extrabold tracking-wide mt-[2px]">+91 98745 67890</span>
                </div>
              </div>

              {/* AUTHENTICATION SECTION */}
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <button 
                  onClick={() => login("user@example.com", "password123")} 
                  disabled={isLoading}
                  className="bg-[#1a103c] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Login / Signup"}
                </button>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-[#1a103c]">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Mobile Menu Content */}
          {mobileOpen && (
            <div className="xl:hidden mt-3 pb-3 border-t border-gray-100 pt-3 flex flex-col gap-3 text-[13px] font-bold text-[#1a103c]">
              <Link to="/" className="uppercase">HOME</Link>
              <Link to="/flight-booking" className="uppercase">FLIGHTS</Link>
              <a href="#" className="uppercase">HOTELS</a>
              <a href="#" className="uppercase">HOLIDAY PACKAGES</a>
              <a href="#" className="uppercase">DOMESTIC TOURS</a>
              <a href="#" className="uppercase">INTERNATIONAL TOURS</a>
              <a href="#" className="uppercase">VISA SERVICES</a>
              
              {/* Mobile Auth Button */}
              <div className="pt-3 mt-3 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <span>Logged In Profile</span>
                    <UserDropdown />
                  </div>
                ) : (
                  <button 
                    onClick={() => login("user@example.com", "password123")} 
                    disabled={isLoading}
                    className="w-full bg-[#1a103c] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {isLoading ? "Logging in..." : "Login / Signup"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative min-h-[520px] sm:h-[620px] overflow-hidden">
          <img src={heroImg} alt="Explore the world" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 sm:to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-white">
              <p className="text-primary text-xl sm:text-3xl font-[Playfair_Display] italic">Discover The World</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mt-3 leading-[1.05]">
                EXPLORE. DREAM.<br />
                <span className="text-primary">TRAVEL.</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 max-w-lg">Book flights, hotels, holiday packages and create memories that last a lifetime.</p>
              <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 text-sm">
                {[
                  { i: ShieldCheck, t: "Best Price", s: "Guarantee" },
                  { i: Award, t: "Instant", s: "Confirmation" },
                  { i: Shield, t: "Secure", s: "Payments" },
                  { i: Headphones, t: "24/7 Customer", s: "Support" },
                ].map(({ i: Ic, t, s }) => (
                  <div key={t} className="flex items-center gap-2 min-w-0">
                    <div className="h-9 w-9 shrink-0 rounded-full border-2 border-primary grid place-items-center"><Ic className="h-4 w-4 text-primary" /></div>
                    <div className="leading-tight min-w-0"><div className="font-semibold truncate">{t}</div><div className="text-white/80 truncate">{s}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer card */}
            <div className="hidden lg:block bg-navy-deep/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white h-fit max-w-sm justify-self-end relative overflow-hidden">
              <div className="text-xs tracking-widest text-white/70">LIMITED <span className="text-primary">TIME OFFER</span></div>
              <div className="mt-2 font-semibold">GET UP TO</div>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-6xl font-extrabold text-primary leading-none">25%</span>
                <span className="text-2xl font-bold mb-1">OFF</span>
              </div>
              <Plane className="absolute right-6 top-16 h-6 w-6 text-primary -rotate-12" />
              <p className="mt-3 text-sm text-white/80">On Domestic & International Holiday Packages</p>
              <button className="mt-5 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-md text-sm">EXPLORE PACKAGES</button>
            </div>
          </div>
        </div>

        {/* Booking widget */}
        <div className="relative -mt-16 sm:-mt-24 max-w-7xl mx-auto px-4 sm:px-6 pb-12 z-20">
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 sm:p-8">

            {/* Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 border-b border-gray-200 pb-5 mb-6 overflow-x-auto no-scrollbar">
              {bookingTabs.map(({ icon: Ic, label }, idx) => (
                <React.Fragment key={label}>
                  <button
                    onClick={() => setActiveTab(label)}
                    className={`flex items-center gap-2 font-extrabold text-[13px] sm:text-sm whitespace-nowrap transition-all shrink-0 ${activeTab === label
                        ? "bg-[#FFB700] text-[#1a103c] px-6 py-3 rounded-lg shadow-sm"
                        : "text-gray-600 px-3 py-3 hover:text-[#1a103c]"
                      }`}
                  >
                    <Ic className="h-5 w-5" /> {label}
                  </button>
                  {/* Vertical Separator between inactive tabs */}
                  {idx < bookingTabs.length - 1 && activeTab !== label && activeTab !== bookingTabs[idx + 1].label && (
                    <div className="hidden sm:block w-px h-6 bg-gray-200 shrink-0"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Form Container */}
            <div className="w-full">
              {activeTab === "FLIGHTS" && <FlightForm tripType={tripType} setTripType={setTripType} />}
              {activeTab === "HOTELS" && <HotelForm />}
              {activeTab === "HOLIDAYS" && <HolidayForm />}
              {activeTab === "TRAINS" && <TrainForm />}
              {activeTab === "BUSES" && <BusForm />}
            </div>
          </div>
        </div>
      </section>

      {/* Services row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {services.map(({ icon: Ic, label, desc, color, bg }) => (
            <div key={label} className="text-center group cursor-pointer">
              <div className={`mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full grid place-items-center ${bg} group-hover:scale-110 transition`}>
                <Ic className={`h-6 w-6 sm:h-7 sm:w-7 ${color}`} />
              </div>
              <div className="mt-3 font-semibold text-sm">{label}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-purple-brand p-6 sm:p-8 text-white grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative overflow-hidden">
          <Plane className="absolute top-6 left-1/3 h-12 w-12 text-white/10 -rotate-12" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-[Playfair_Display] italic text-primary">Exclusive Deals &amp; Offers!</h3>
            <p className="mt-2 text-white/80 max-w-md text-sm">Grab amazing discounts on flights, hotels and holiday packages. Limited time only!</p>
            <button className="mt-5 bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold text-sm">VIEW ALL OFFERS</button>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm">
            {[
              { i: Plane, t: "Domestic Flights", v: "Flat 15% OFF", c: "text-sky-400" },
              { i: Building2, t: "Hotel Bookings", v: "Up to 25% OFF", c: "text-pink-400" },
              { i: Briefcase, t: "Holiday Packages", v: "Up to 30% OFF", c: "text-primary" },
            ].map(({ i: Ic, t, v, c }) => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <Ic className={`h-6 w-6 sm:h-7 sm:w-7 ${c}`} />
                <div className="mt-2 sm:mt-3 text-white/80 text-[11px] sm:text-xs">{t}</div>
                <div className="font-bold mt-1 text-xs sm:text-sm">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Popular Destinations</h2>
            <Plane className="h-5 w-5 text-primary mt-1 -rotate-45" />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="inline-flex rounded-full bg-muted p-1">
              {(["Domestic", "International"] as const).map((d) => (
                <button key={d} onClick={() => setDestFilter(d)} className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium ${destFilter === d ? "bg-purple-brand text-white" : "text-foreground/70"}`}>{d}</button>
              ))}
            </div>
            <a href="#" className="text-xs sm:text-sm text-purple-brand font-semibold flex items-center gap-1">View All <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="relative">
          <button className="hidden md:grid absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md place-items-center z-10"><ChevronLeft className="h-5 w-5" /></button>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {destinations.map((d) => (
              <div key={d.name} className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[4/5]">
                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <div className="font-bold text-base sm:text-lg">{d.name}</div>
                  <div className="text-[11px] sm:text-xs text-white/80">{d.nights}</div>
                  <div className="font-bold text-primary mt-1 text-sm sm:text-base">₹ {d.price}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="hidden md:grid absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md place-items-center z-10"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </section>

      {/* Why choose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Choose <span className="text-purple-brand font-[Playfair_Display] italic">Mallick Travels</span>?</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {features.map(({ icon: Ic, label, desc, color, bg }) => (
            <div key={label} className="bg-white border border-border rounded-xl p-5 flex gap-3 items-start">
              <div className={`h-11 w-11 rounded-lg ${bg} grid place-items-center shrink-0`}><Ic className={`h-5 w-5 ${color}`} /></div>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <div className="flex items-center justify-center gap-3 mb-8"><span className="h-px w-12 bg-primary" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-px w-12 bg-primary" /></div>
        <div className="relative">
          <button className="hidden md:grid absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md place-items-center z-10"><ChevronLeft className="h-5 w-5" /></button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-border rounded-xl p-5 flex gap-4">
                <img src={t.img} alt={t.name} loading="lazy" className="h-16 w-16 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="flex gap-0.5 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                  <p className="mt-2 text-sm text-foreground/80">{t.text}</p>
                  <div className="mt-3">
                    <div className="font-semibold text-sm text-purple-brand">– {t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="hidden md:grid absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md place-items-center z-10"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-purple-brand to-[oklch(0.4_0.2_295)] p-6 sm:p-8 grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6 text-white">
          {stats.map(({ icon: Ic, value, label }) => (
            <div key={label} className="flex items-center gap-3 min-w-0">
              <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-white/15 grid place-items-center"><Ic className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-extrabold">{value}</div>
                <div className="text-[11px] sm:text-xs text-white/80 truncate">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="rounded-2xl bg-purple-50 p-5 sm:p-6 flex flex-col lg:flex-row flex-wrap items-start lg:items-center gap-5 lg:gap-6 lg:justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full bg-primary/20 grid place-items-center"><Mail className="h-6 w-6 text-primary" /></div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-bold">Subscribe to Our Newsletter</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Get exclusive travel deals, offers and tips straight to your inbox.</div>
            </div>
          </div>
          <form className="flex w-full lg:w-auto lg:flex-1 lg:max-w-md gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 min-w-0 px-3 sm:px-4 py-3 rounded-md border border-border bg-white text-sm" />
            <button className="bg-purple-brand text-white px-4 sm:px-6 rounded-md font-semibold text-sm shrink-0">SUBSCRIBE</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 grid place-items-center text-white"><Plane className="h-5 w-5 -rotate-45" /></div>
              <div className="leading-tight">
                <div className="font-extrabold"><span className="text-sky-400">MALLICK</span> <span className="text-primary">TRAVELS</span></div>
                <div className="text-[10px] italic text-white/60">Your Journey, Our Passion</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/60 leading-relaxed">Mallick Travels is a trusted travel agency in Kolkata offering complete travel solutions for domestic and international travellers.</p>
            <div className="mt-4 flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube, MessageCircle].map((Ic, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded-full bg-white/10 grid place-items-center hover:bg-primary hover:text-primary-foreground transition"><Ic className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <FooterCol title="QUICK LINKS" items={["About Us", "Blog", "Payment Options", "Terms & Conditions", "Privacy Policy", "Refund Policy"]} />
          <FooterCol title="OUR SERVICES" items={["Flight Booking", "Hotel Booking", "Holiday Packages", "Train Tickets", "Bus Booking", "Visa Assistance", "Travel Insurance"]} />
          <FooterCol title="POPULAR DESTINATIONS" items={["Goa Packages", "Kashmir Packages", "Kerala Packages", "Rajasthan Packages", "Thailand Packages", "Dubai Packages"]} />
          <div>
            <h4 className="text-white font-bold mb-4">CONTACT US</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /> 123, R. N. Mukherjee Road, Kolkata - 700001, West Bengal, India</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /> +91 98745 67890</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-primary shrink-0" /> info@mallicktravels.com</li>
              <li className="flex gap-2"><Globe className="h-4 w-4 text-primary shrink-0" /> www.mallicktravels.com</li>
            </ul>
          </div>
        </div>

        {/* Updated Bottom Footer with Online Original Logos */}
        <div className="border-t border-white/10 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/60 text-center md:text-left">
              © 2025 Mallick Travels. All Rights Reserved.
            </div>

            {/* Payment Methods Logos using Public CDN links */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {/* Visa */}
              <div className="bg-white h-7 w-12 rounded flex items-center justify-center shadow-sm p-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Visa_Inc._logo_%282005%E2%80%932014%29.png"
                  alt="Visa"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* MasterCard */}
              <div className="bg-white h-7 w-12 rounded flex items-center justify-center shadow-sm p-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="MasterCard"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* RuPay */}
              <div className="bg-white h-7 w-12 rounded flex items-center justify-center shadow-sm p-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png"
                  alt="RuPay"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* UPI */}
              <div className="bg-white h-7 w-12 rounded flex items-center justify-center shadow-sm p-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png"
                  alt="UPI"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a href="#" className="fixed bottom-5 right-5 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-110 transition z-50" aria-label="WhatsApp">
        <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}

/* ---------- Booking forms ---------- */

function FlightForm({ tripType, setTripType }: { tripType: string; setTripType: (v: string) => void }) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 w-full">
      {/* Radios */}
      <div className="flex flex-row lg:flex-col gap-4 lg:pr-6 lg:border-r border-gray-200 shrink-0 w-full lg:w-auto">
        <label className="flex items-center gap-3 cursor-pointer text-[14px] font-extrabold text-[#1a103c]">
          <input type="radio" checked={tripType === "one"} onChange={() => setTripType("one")} className="w-4 h-4 accent-[#1a103c]" />
          One Way
        </label>
        <label className="flex items-center gap-3 cursor-pointer text-[14px] font-bold text-gray-500 hover:text-[#1a103c] transition">
          <input type="radio" checked={tripType === "round"} onChange={() => setTripType("round")} className="w-4 h-4 accent-[#1a103c]" />
          Round Trip
        </label>
      </div>

      {/* Inputs */}
      <div className="flex-1 flex flex-col lg:flex-row items-center w-full">
        <FieldBox label="From" icon={MapPin} placeholder="Select City" />

        {/* Exchange Icon */}
        <div className="hidden lg:flex w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center shrink-0 -mx-4 z-10 shadow-sm cursor-pointer hover:bg-gray-50 transition">
          <ArrowRightLeft className="w-4 h-4 text-[#1a103c]" />
        </div>

        <FieldBox className="lg:pl-8" label="To" icon={MapPin} placeholder="Select City" />
        <FieldBox label="Depart" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Travellers & Class" icon={null} placeholder="1 Traveller, Economy" trailing={<ChevronDown className="w-5 h-5 text-gray-500" />} noBorder />
      </div>

      <SearchButton label="SEARCH FLIGHTS" />
    </div>
  );
}

function HotelForm() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
      <div className="flex-1 flex flex-col lg:flex-row items-center w-full">
        <FieldBox label="City / Hotel / Area" icon={MapPin} placeholder="Enter destination" />
        <FieldBox label="Check-In" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Check-Out" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Rooms & Guests" icon={null} placeholder="1 Room, 2 Adults" trailing={<ChevronDown className="w-5 h-5 text-gray-500" />} noBorder />
      </div>
      <SearchButton label="SEARCH HOTELS" />
    </div>
  );
}

function HolidayForm() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
      <div className="flex-1 flex flex-col lg:flex-row items-center w-full">
        <FieldBox label="Destination" icon={MapPin} placeholder="Where do you want to go?" />
        <FieldBox label="Departure Date" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Duration" icon={null} placeholder="Nights" trailing={<ChevronDown className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Travellers" icon={null} placeholder="2 Adults" trailing={<ChevronDown className="w-5 h-5 text-gray-500" />} noBorder />
      </div>
      <SearchButton label="SEARCH HOLIDAYS" />
    </div>
  );
}

function TrainForm() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
      <div className="flex-1 flex flex-col lg:flex-row items-center w-full">
        <FieldBox label="From Station" icon={MapPin} placeholder="Origin station" />
        <div className="hidden lg:flex w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center shrink-0 -mx-4 z-10 shadow-sm cursor-pointer hover:bg-gray-50 transition">
          <ArrowRightLeft className="w-4 h-4 text-[#1a103c]" />
        </div>
        <FieldBox className="lg:pl-8" label="To Station" icon={MapPin} placeholder="Destination station" />
        <FieldBox label="Journey Date" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} />
        <FieldBox label="Class" icon={Train} placeholder="All Classes" trailing={<ChevronDown className="w-5 h-5 text-gray-500" />} noBorder />
      </div>
      <SearchButton label="SEARCH TRAINS" />
    </div>
  );
}

function BusForm() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
      <div className="flex-1 flex flex-col lg:flex-row items-center w-full">
        <FieldBox label="From" icon={MapPin} placeholder="Leaving from" />
        <div className="hidden lg:flex w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center shrink-0 -mx-4 z-10 shadow-sm cursor-pointer hover:bg-gray-50 transition">
          <ArrowRightLeft className="w-4 h-4 text-[#1a103c]" />
        </div>
        <FieldBox className="lg:pl-8" label="To" icon={MapPin} placeholder="Going to" />
        <FieldBox label="Travel Date" icon={null} placeholder="Select Date" trailing={<Calendar className="w-5 h-5 text-gray-500" />} noBorder />
      </div>
      <SearchButton label="SEARCH BUSES" />
    </div>
  );
}

function SearchButton({ label = "SEARCH" }: { label?: string }) {
  // Add the link wrapping for "SEARCH FLIGHTS" explicitly so it routes correctly
  const isFlights = label.toUpperCase().includes("FLIGHT");
  if (isFlights) {
    return (
      <Link
        to="/flight-booking"
        search={{ from: "DEL", to: "BOM", date: new Date().toISOString().slice(0, 10), pax: 1 }}
        className="bg-[#FFB700] text-[#1a103c] font-extrabold text-[15px] px-8 py-4 rounded-xl flex items-center justify-center gap-2 w-full lg:w-auto shrink-0 shadow-md hover:bg-yellow-500 transition-all"
      >
        {label}
      </Link>
    );
  }
  return (
    <button className="bg-[#FFB700] text-[#1a103c] font-extrabold text-[15px] px-8 py-4 rounded-xl flex items-center justify-center gap-2 w-full lg:w-auto shrink-0 shadow-md hover:bg-yellow-500 transition-all">
      {label}
    </button>
  );
}

function FieldBox({ className = "", label, icon: Icon, placeholder, trailing, noBorder = false }: { className?: string; label: string; icon: any; placeholder: string; trailing?: React.ReactNode; noBorder?: boolean }) {
  return (
    <div className={`flex-1 w-full px-4 py-3 border-b lg:border-b-0 ${!noBorder ? 'lg:border-r border-gray-200' : ''} ${className}`}>
      <p className="text-[12px] text-gray-500 font-bold mb-1">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 w-full">
          {Icon && <Icon className="w-5 h-5 text-gray-600 shrink-0" />}
          <input
            className="font-extrabold text-[#1a103c] text-[15px] outline-none w-full bg-transparent placeholder:text-[#1a103c] truncate cursor-pointer"
            placeholder={placeholder}
            readOnly={!!trailing}
          />
        </div>
        {trailing}
      </div>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-4">{title}</h4>
      <ul className="space-y-2 text-xs">
        {items.map((i) => <li key={i}><a href="#" className="hover:text-primary">{i}</a></li>)}
      </ul>
    </div>
  );
}
