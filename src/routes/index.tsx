import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Mail, Headphones, Facebook, Instagram, Twitter, Youtube,
  Plane, Building2, Palmtree, Train, Bus, Shield, Briefcase,
  MapPin, Calendar, Users, ArrowRightLeft, Search, ChevronDown,
  ArrowRight, ChevronLeft, ChevronRight, Star, Tag, Headset,
  Home as HomeIcon, ShieldCheck, UserCheck, Sparkles, Award, Globe,
  MessageCircle,
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top utility bar */}
      <div className="hidden md:block bg-white border-b border-border text-sm">
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
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 grid place-items-center text-white">
              <Plane className="h-6 w-6 -rotate-45" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg tracking-tight"><span className="text-sky-500">MALLICK</span> <span className="text-primary">TRAVELS</span></div>
              <div className="text-[10px] italic text-muted-foreground">Your Journey, Our Passion</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-[12px] font-semibold text-foreground/80">
            {navLinks.map((n, i) => (
              <a key={n} href="#" className={`hover:text-primary transition ${i === 0 ? "text-primary border-b-2 border-primary pb-1" : ""}`}>{n}</a>
            ))}
            <button className="flex items-center gap-1 hover:text-primary">MORE <ChevronDown className="h-3 w-3" /></button>
          </nav>
          <a href="tel:+919874567890" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold">
            <Phone className="h-4 w-4" />
            <div className="text-left leading-tight">
              <div className="text-[10px] font-medium">Call Us Now</div>
              <div className="text-sm">+91 98745 67890</div>
            </div>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[620px] overflow-hidden">
          <img src={heroImg} alt="Explore the world" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-6 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 text-white">
              <p className="text-primary text-3xl font-[Playfair_Display] italic">Discover The World</p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-3 leading-[1.05]">
                EXPLORE. DREAM.<br />
                <span className="text-primary">TRAVEL.</span>
              </h1>
              <p className="mt-5 text-lg text-white/90 max-w-lg">Book flights, hotels, holiday packages and create memories that last a lifetime.</p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                {[
                  { i: ShieldCheck, t: "Best Price", s: "Guarantee" },
                  { i: Award, t: "Instant", s: "Confirmation" },
                  { i: Shield, t: "Secure", s: "Payments" },
                  { i: Headphones, t: "24/7 Customer", s: "Support" },
                ].map(({ i: Ic, t, s }) => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full border-2 border-primary grid place-items-center"><Ic className="h-4 w-4 text-primary" /></div>
                    <div className="leading-tight"><div className="font-semibold">{t}</div><div className="text-white/80">{s}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer card */}
            <div className="bg-navy-deep/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-white h-fit max-w-sm justify-self-end relative overflow-hidden">
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
        <div className="relative -mt-16 max-w-6xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-wrap">
              {bookingTabs.map(({ icon: Ic, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm flex-1 justify-center ${
                    activeTab === label ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  <Ic className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6 mb-5 text-sm">
                {[["one", "One Way"], ["round", "Round Trip"]].map(([v, l]) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={tripType === v} onChange={() => setTripType(v)} className="accent-primary h-4 w-4" />
                    <span className={tripType === v ? "text-foreground font-medium" : "text-muted-foreground"}>{l}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <FieldBox className="md:col-span-3" label="From" icon={MapPin} placeholder="Select City" />
                <div className="hidden md:flex justify-center pb-3"><div className="h-10 w-10 rounded-full border border-border grid place-items-center"><ArrowRightLeft className="h-4 w-4 text-muted-foreground" /></div></div>
                <FieldBox className="md:col-span-3" label="To" icon={MapPin} placeholder="Select City" />
                <FieldBox className="md:col-span-2" label="Depart" icon={Calendar} placeholder="Select Date" />
                <FieldBox className="md:col-span-2" label="Travellers & Class" icon={Users} placeholder="1 Traveller, Economy" trailing={<ChevronDown className="h-4 w-4" />} />
                <button className="md:col-span-1 bg-primary text-primary-foreground font-bold py-3 px-5 rounded-lg flex items-center justify-center gap-2 h-full">
                  SEARCH <Plane className="h-4 w-4 -rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services row */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {services.map(({ icon: Ic, label, desc, color, bg }) => (
            <div key={label} className="text-center group cursor-pointer">
              <div className={`mx-auto h-16 w-16 rounded-full grid place-items-center ${bg} group-hover:scale-110 transition`}>
                <Ic className={`h-7 w-7 ${color}`} />
              </div>
              <div className="mt-3 font-semibold text-sm">{label}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-purple-brand p-8 text-white grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative overflow-hidden">
          <Plane className="absolute top-6 left-1/3 h-12 w-12 text-white/80 -rotate-12" />
          <div className="relative z-10">
            <h3 className="text-3xl font-[Playfair_Display] italic text-primary">Exclusive Deals &amp; Offers!</h3>
            <p className="mt-2 text-white/80 max-w-md text-sm">Grab amazing discounts on flights, hotels and holiday packages. Limited time only!</p>
            <button className="mt-5 bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold text-sm">VIEW ALL OFFERS</button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { i: Plane, t: "Domestic Flights", v: "Flat 15% OFF", c: "text-sky-400" },
              { i: Building2, t: "Hotel Bookings", v: "Up to 25% OFF", c: "text-pink-400" },
              { i: Briefcase, t: "Holiday Packages", v: "Up to 30% OFF", c: "text-primary" },
            ].map(({ i: Ic, t, v, c }) => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <Ic className={`h-7 w-7 ${c}`} />
                <div className="mt-3 text-white/80 text-xs">{t}</div>
                <div className="font-bold mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <Plane className="h-5 w-5 text-primary mt-1 -rotate-45" />
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-full bg-muted p-1">
              {(["Domestic", "International"] as const).map((d) => (
                <button key={d} onClick={() => setDestFilter(d)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${destFilter === d ? "bg-purple-brand text-white" : "text-foreground/70"}`}>{d}</button>
              ))}
            </div>
            <a href="#" className="text-sm text-purple-brand font-semibold flex items-center gap-1">View All Destinations <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="relative">
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md grid place-items-center z-10"><ChevronLeft className="h-5 w-5" /></button>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((d) => (
              <div key={d.name} className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[4/5]">
                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-lg">{d.name}</div>
                  <div className="text-xs text-white/80">{d.nights}</div>
                  <div className="font-bold text-primary mt-1">₹ {d.price}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md grid place-items-center z-10"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </section>

      {/* Why choose */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center">Why Choose <span className="text-purple-brand font-[Playfair_Display] italic">Mallick Travels</span>?</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {features.map(({ icon: Ic, label, desc, color, bg }) => (
            <div key={label} className="bg-white border border-border rounded-xl p-5 flex gap-3 items-start">
              <div className={`h-11 w-11 rounded-lg ${bg} grid place-items-center shrink-0`}><Ic className={`h-5 w-5 ${color}`} /></div>
              <div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <div className="flex items-center justify-center gap-3 mb-8"><span className="h-px w-12 bg-primary" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-px w-12 bg-primary" /></div>
        <div className="relative">
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md grid place-items-center z-10"><ChevronLeft className="h-5 w-5" /></button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-border rounded-xl p-5 flex gap-4">
                <img src={t.img} alt={t.name} loading="lazy" className="h-16 w-16 rounded-full object-cover shrink-0" />
                <div>
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
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md grid place-items-center z-10"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-purple-brand to-[oklch(0.4_0.2_295)] p-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-white">
          {stats.map(({ icon: Ic, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/15 grid place-items-center"><Ic className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="text-xs text-white/80">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="rounded-2xl bg-purple-50 p-6 flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/20 grid place-items-center"><Mail className="h-6 w-6 text-primary" /></div>
            <div>
              <div className="text-lg font-bold">Subscribe to Our Newsletter</div>
              <div className="text-sm text-muted-foreground">Get exclusive travel deals, offers and tips straight to your inbox.</div>
            </div>
          </div>
          <form className="flex flex-1 max-w-md min-w-[260px] gap-2">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-md border border-border bg-white text-sm" />
            <button className="bg-purple-brand text-white px-6 rounded-md font-semibold text-sm">SUBSCRIBE</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-white/80">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
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
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
          © 2025 Mallick Travels. All Rights Reserved.
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a href="#" className="fixed bottom-5 right-5 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-110 transition z-50" aria-label="WhatsApp">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

function FieldBox({ className = "", label, icon: Icon, placeholder, trailing }: { className?: string; label: string; icon: any; placeholder: string; trailing?: React.ReactNode }) {
  return (
    <div className={`border border-border rounded-lg px-3 py-2 ${className}`}>
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
        <input className="flex-1 outline-none text-sm bg-transparent" placeholder={placeholder} />
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
