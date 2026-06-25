import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Headphones, Plane, ChevronRight, ChevronLeft, MapPin, Globe,
  Target, Eye, UserCircle2, IndianRupee, ShieldCheck, Headset, Briefcase,
  Award, Calendar, Users, ThumbsUp, Building2, FileText, BadgeIndianRupee,
  Star, Quote,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";
import aboutPlane from "@/assets/about-plane.jpg";
import aboutBeach from "@/assets/about-beach.jpg";
import aboutFamily from "@/assets/about-family.jpg";
import aboutTrain from "@/assets/about-train.jpg";
import aboutCouple from "@/assets/about-couple.jpg";
import founder from "@/assets/founder.jpg";
import team1 from "@/assets/team1.jpg";
import team2 from "@/assets/team2.jpg";
import team3 from "@/assets/team3.jpg";
import team4 from "@/assets/team4.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mallick Travels" },
      { name: "description", content: "Mallick Travels is a Kolkata-based travel company offering end-to-end travel solutions for domestic and international travellers." },
      { property: "og:title", content: "About Us — Mallick Travels" },
      { property: "og:description", content: "Crafting Journeys. Creating Memories. Learn about our story, mission and team." },
    ],
  }),
  component: AboutPage,
});

const whyChoose = [
  { icon: UserCircle2, label: "Personalized Solutions", desc: "Customized itineraries as per your needs and budget.", color: "text-orange-500", bg: "bg-orange-100" },
  { icon: IndianRupee, label: "Best Price Guarantee", desc: "Competitive pricing and exclusive deals on every booking.", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: ShieldCheck, label: "Trusted & Reliable", desc: "Years of experience and thousands of satisfied travellers.", color: "text-purple-brand", bg: "bg-purple-100" },
  { icon: Headset, label: "Expert Support", desc: "Our team is available 24/7 to assist you anytime, anywhere.", color: "text-sky-500", bg: "bg-sky-100" },
  { icon: Briefcase, label: "End-to-End Services", desc: "All travel services under one roof for a hassle-free journey.", color: "text-rose-500", bg: "bg-rose-100" },
  { icon: Globe, label: "Global Network", desc: "Strong partnerships with airlines, hotels and tour operators worldwide.", color: "text-sky-500", bg: "bg-sky-100" },
];

const quickStats = [
  { icon: Award, value: "15+", label: "Years of Experience", color: "text-[#FFB700]", bg: "bg-[#FFB700]/15" },
  { icon: Users, value: "10,000+", label: "Happy Customers", color: "text-emerald-500", bg: "bg-emerald-100" },
  { icon: Calendar, value: "500+", label: "Tour Packages", color: "text-purple-brand", bg: "bg-purple-100" },
  { icon: Headphones, value: "24/7", label: "Customer Support", color: "text-sky-500", bg: "bg-sky-100" },
];

const bottomStats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Briefcase, value: "500+", label: "Tour Packages" },
  { icon: Globe, value: "50+", label: "Countries Covered" },
  { icon: ThumbsUp, value: "100%", label: "Customer Satisfaction" },
];

const leaders = [
  { name: "Ritika Mallick", role: "Co-Founder & Director", desc: "Oversees operations and ensures exceptional customer experiences.", img: team1 },
  { name: "Arindam Dutta", role: "Head - Operations", desc: "Expert in tour planning and vendor relations with 10+ years of experience.", img: team2 },
  { name: "Pooja Sharma", role: "Head - Sales & Marketing", desc: "Leads our sales team and builds strong relationships with our clients.", img: team3 },
  { name: "Debashis Roy", role: "Head - Support", desc: "Ensures smooth travel support and 24/7 customer assistance.", img: team4 },
];

const reviews = [
  { name: "Anirban Sen", city: "Kolkata", text: "Excellent service and very professional team. Our trip to Bali was perfectly organized. Highly recommended!" },
  { name: "Priyanka Dutta", city: "Kolkata", text: "Mallick Travels made our honeymoon so special. Everything was smooth and well-planned." },
  { name: "Soumyajit Paul", city: "Kolkata", text: "Best travel agency in Kolkata. Great support 24/7 and very competitive pricing." },
];

const companyDetails = [
  { icon: Building2, label: "Company Name", value: "Mallick Travels" },
  { icon: MapPin, label: "Registered Office", value: "123, R. N. Mukherjee Road,\nKolkata - 700001, West Bengal, India" },
  { icon: Calendar, label: "Established", value: "2010" },
  { icon: BadgeIndianRupee, label: "GST Number", value: "19ABCDE1234F1Z5" },
  { icon: FileText, label: "PAN Number", value: "ABCDE1234F" },
  { icon: FileText, label: "Company Type", value: "Proprietorship Firm" },
];

function AboutPage() {
  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* About Hero */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1a103c] mb-4">
            <Link to="/">HOME</Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[#FFB700]">ABOUT US</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a103c]">
                About <span className="text-[#FFB700]">Mallick Travels</span>
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-[#1a103c]/70 font-medium font-[Playfair_Display] italic">
                Crafting Journeys. Creating Memories.
              </p>
              <div className="mt-3 h-1 w-24 bg-[#FFB700] rounded-full" />
              <p className="mt-5 text-[#1a103c]/80 text-sm sm:text-base leading-relaxed max-w-xl">
                At Mallick Travels, we believe that travel is more than visiting new places —
                it's about creating unforgettable experiences that stay with you forever.
                We are here to make every journey smooth, safe, comfortable,
                and truly memorable.
              </p>
            </div>
            <div className="relative">
              <img src={aboutHero} alt="About Mallick Travels" className="w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#1a103c] mb-3">
              OUR STORY <Plane className="h-4 w-4 text-[#FFB700] -rotate-45" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a103c]">Your Trusted Travel Partner</h2>
            <div className="mt-5 space-y-4 text-sm sm:text-base text-[#1a103c]/80 leading-relaxed">
              <p>Mallick Travels is a Kolkata-based travel company offering end-to-end travel solutions for domestic and international travellers.</p>
              <p>With a passion for travel and a commitment to excellence, we provide personalized services, best prices, and 24/7 support to make every journey smooth, safe and unforgettable.</p>
              <p>From flights, hotels and holiday packages to visa assistance and corporate travel, we handle everything so you can travel worry-free.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 row-span-2">
              <img src={aboutPlane} alt="Plane at sunset" loading="lazy" className="w-full h-full rounded-xl object-cover" />
            </div>
            <img src={aboutBeach} alt="Tropical resort" loading="lazy" className="w-full h-full rounded-xl object-cover" />
            <img src={aboutFamily} alt="Family at airport" loading="lazy" className="w-full h-full rounded-xl object-cover" />
            <img src={aboutTrain} alt="Mountain train" loading="lazy" className="w-full h-full rounded-xl object-cover" />
            <img src={aboutCouple} alt="Couple exploring city" loading="lazy" className="w-full h-full rounded-xl object-cover" />
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          {quickStats.map(({ icon: Ic, value, label, color, bg }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full grid place-items-center ${bg}`}>
                <Ic className={`h-6 w-6 ${color}`} />
              </div>
              <div>
                <div className="font-extrabold text-[#1a103c] text-lg leading-none">{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-navy-deep text-white rounded-xl px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-white/10">
          <div className="flex gap-5 md:pr-6">
            <div className="h-14 w-14 shrink-0 rounded-full bg-white grid place-items-center">
              <Target className="h-7 w-7 text-[#FFB700]" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide">OUR MISSION</h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                To provide seamless travel solutions with integrity, transparency and professionalism.
                We aim to deliver memorable experiences and build long-term relationships based on
                trust and customer satisfaction.
              </p>
            </div>
          </div>
          <div className="flex gap-5 md:pl-10">
            <div className="h-14 w-14 shrink-0 rounded-full bg-white grid place-items-center">
              <Eye className="h-7 w-7 text-[#FFB700]" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide">OUR VISION</h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                To be one of India's most preferred travel companies by offering innovative solutions,
                exceptional service and unforgettable travel experiences worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1a103c]">
          WHY CHOOSE <span className="text-[#FFB700]">MALLICK TRAVELS?</span>
        </h2>
        <div className="mx-auto h-1 w-20 bg-[#FFB700] rounded-full mt-2" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {whyChoose.map(({ icon: Ic, label, desc, color, bg }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
              <div className={`mx-auto h-14 w-14 rounded-full grid place-items-center ${bg}`}>
                <Ic className={`h-7 w-7 ${color}`} />
              </div>
              <div className="mt-4 font-bold text-[#1a103c] text-sm">{label}</div>
              <p className="mt-2 text-xs text-gray-500 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder + Company details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Founder */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <img src={founder} alt="Prasenjit Mallick" loading="lazy" className="w-full h-full object-cover min-h-[280px]" />
              </div>
              <div className="sm:col-span-3 p-6">
                <p className="text-xs font-bold tracking-widest text-[#1a103c]">OUR FOUNDER</p>
                <h3 className="text-2xl font-extrabold text-[#1a103c] mt-1">Prasenjit Mallick</h3>
                <p className="text-[#FFB700] font-semibold text-sm mt-0.5">Founder &amp; CEO, Mallick Travels</p>
                <p className="mt-3 text-sm text-[#1a103c]/80 leading-relaxed">
                  With a vision to make travel easy, accessible and enriching for everyone,
                  Mr. Prasenjit Mallick founded Mallick Travels. His extensive industry knowledge,
                  customer-first approach and commitment to excellence continue to drive the company forward.
                </p>
                <div className="mt-4 bg-gray-50 border-l-4 border-[#FFB700] rounded p-3 text-sm text-[#1a103c]/80 italic relative">
                  <Quote className="h-4 w-4 text-[#FFB700] inline -mt-1 mr-1" />
                  Travel opens the heart, broadens the mind and creates stories to cherish forever.
                </div>
              </div>
            </div>
          </div>

          {/* Company details */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <p className="text-xs font-bold tracking-widest text-[#1a103c]">COMPANY DETAILS</p>
            <div className="mt-1 h-1 w-16 bg-[#FFB700] rounded-full" />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {companyDetails.map(({ icon: Ic, label, value }) => (
                <div key={label} className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-md bg-sky-50 grid place-items-center">
                    <Ic className="h-5 w-5 text-[#1a103c]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">{label}</div>
                    <div className="text-sm font-bold text-[#1a103c] whitespace-pre-line leading-snug">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom stats bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-navy-deep text-white rounded-xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-white/10">
          {bottomStats.map(({ icon: Ic, value, label }, i) => (
            <div key={label} className={`flex items-center gap-3 ${i > 0 ? 'md:pl-6' : ''}`}>
              <Ic className="h-8 w-8 text-[#FFB700]" />
              <div>
                <div className="font-extrabold text-xl">{value}</div>
                <div className="text-xs text-white/70">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1a103c]">OUR LEADERSHIP TEAM</h2>
        <div className="mx-auto h-1 w-20 bg-[#FFB700] rounded-full mt-2" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((l) => (
            <div key={l.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition flex gap-4 items-start">
              <img src={l.img} alt={l.name} loading="lazy" className="h-16 w-16 rounded-full object-cover shrink-0" />
              <div>
                <div className="font-bold text-[#1a103c]">{l.name}</div>
                <div className="text-xs font-semibold text-[#FFB700]">{l.role}</div>
                <p className="text-xs text-gray-500 mt-2 leading-snug">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#1a103c]">WHAT OUR CUSTOMERS SAY</h2>
        <div className="mx-auto h-1 w-20 bg-[#FFB700] rounded-full mt-2 mb-8" />

        <div className="relative">
          <button
            onClick={() => setReviewIdx((reviewIdx - 1 + reviews.length) % reviews.length)}
            className="hidden md:grid absolute -left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 place-items-center shadow-sm hover:bg-gray-50 z-10"
            aria-label="prev"
          >
            <ChevronLeft className="h-5 w-5 text-[#1a103c]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <Quote className="h-5 w-5 text-[#FFB700]" />
                <p className="mt-3 text-sm text-[#1a103c]/80 leading-relaxed">{r.text}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-bold text-[#1a103c]">— {r.name}, <span className="font-medium text-gray-500">{r.city}</span></div>
                  <div className="flex text-[#FFB700]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setReviewIdx((reviewIdx + 1) % reviews.length)}
            className="hidden md:grid absolute -right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-gray-200 place-items-center shadow-sm hover:bg-gray-50 z-10"
            aria-label="next"
          >
            <ChevronRight className="h-5 w-5 text-[#1a103c]" />
          </button>
        </div>
      </section>

      <Footer />

      <a href="#" className="fixed bottom-5 right-5 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl hover:scale-110 transition z-50" aria-label="WhatsApp">
        <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
