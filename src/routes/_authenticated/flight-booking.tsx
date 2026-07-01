import React, { useMemo, useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Plane, ArrowRight, Check, CreditCard, Lock, Shield, ChevronLeft,
  CheckCircle2, Wallet, Building2, Smartphone, Loader2, Calendar, User,
  Filter, Search, PlaneTakeoff, X, Edit3, Briefcase, Utensils, Plus, Minus, Info
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_authenticated/flight-booking")({
  validateSearch: (s: Record<string, unknown>) => ({
    from: (s.from as string) || "DEL",
    to: (s.to as string) || "BOM",
    date: (s.date as string) || new Date().toISOString().slice(0, 10),
  }),
  head: () => ({
    meta: [{ title: "Flight Booking — Mallick Travels" }],
  }),
  component: FlightBooking,
});

type Flight = {
  id: string; airline: string; code: string; depart: string; arrive: string;
  duration: string; durationMins: number; stops: string; price: number;
  cabinClass: string; refundable: boolean;
};

// Mock Data
const sampleFlights: Flight[] = [
  { id: "AI101", airline: "Air India", code: "AI 101", depart: "06:15", arrive: "08:45", duration: "2h 30m", durationMins: 150, stops: "Non-stop", price: 4899, cabinClass: "Economy", refundable: true },
  { id: "6E202", airline: "IndiGo", code: "6E 202", depart: "09:00", arrive: "11:25", duration: "2h 25m", durationMins: 145, stops: "Non-stop", price: 5299, cabinClass: "Economy", refundable: false },
  { id: "UK303", airline: "Vistara", code: "UK 303", depart: "13:40", arrive: "16:20", duration: "2h 40m", durationMins: 160, stops: "Non-stop", price: 7799, cabinClass: "Premium Economy", refundable: true },
  { id: "SG404", airline: "SpiceJet", code: "SG 404", depart: "18:10", arrive: "20:55", duration: "2h 45m", durationMins: 165, stops: "1 Stop", price: 4199, cabinClass: "Economy", refundable: false },
  { id: "QP505", airline: "Akasa Air", code: "QP 505", depart: "21:25", arrive: "00:05", duration: "2h 40m", durationMins: 160, stops: "Non-stop", price: 5099, cabinClass: "Economy", refundable: true },
  { id: "AI102", airline: "Air India", code: "AI 102", depart: "11:15", arrive: "15:45", duration: "4h 30m", durationMins: 270, stops: "1 Stop", price: 12500, cabinClass: "Business", refundable: true },
];

type Passenger = {
  id: number; firstName: string; lastName: string; gender: string; dob: string;
  nationality: string; passportNo: string;
  baggage: number; meal: string;
};
type Step = 1 | 2 | 3 | 4;

// Add-on Pricing
const BAGGAGE_PRICES: Record<number, number> = { 0: 0, 5: 2500, 10: 4500, 15: 6000 };
const MEAL_PRICES: Record<string, number> = { "No Meal": 0, "Vegetarian (₹350)": 350, "Non-Vegetarian (₹450)": 450, "Gluten-Free (₹500)": 500 };

function FlightBooking() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<Flight | null>(null);

  // Modify Search State
  const [isModifying, setIsModifying] = useState(false);
  const [modSearch, setModSearch] = useState({
    from: search.from,
    to: search.to,
    date: search.date,
  });

  // Dynamic Passenger State
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: Date.now(), firstName: "", lastName: "", gender: "Male", dob: "", nationality: "Indian", passportNo: "", baggage: 0, meal: "No Meal" }
  ]);
  const [contact, setContact] = useState({ email: "", phone: "", address: "" });

  // Payment State
  const [payMethod, setPayMethod] = useState<"card" | "upi" | "netbanking" | "wallet">("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"cheapest" | "fastest" | "early_depart">("cheapest");
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedStops, setSelectedStops] = useState<string>("All");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<string[]>([]);

  const airlinesList = useMemo(() => Array.from(new Set(sampleFlights.map(f => f.airline))), []);
  const cabinList = ["Economy", "Premium Economy", "Business"];

  const processedFlights = useMemo(() => {
    let result = sampleFlights;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(f => f.airline.toLowerCase().includes(q) || f.code.toLowerCase().includes(q) || f.stops.toLowerCase().includes(q));
    }
    result = result.filter(f => f.price <= maxPrice);
    if (selectedStops !== "All") result = result.filter(f => f.stops === selectedStops);
    if (selectedAirlines.length > 0) result = result.filter(f => selectedAirlines.includes(f.airline));
    if (selectedCabin.length > 0) result = result.filter(f => selectedCabin.includes(f.cabinClass));

    result.sort((a, b) => {
      switch (sortBy) {
        case "cheapest": return a.price - b.price;
        case "fastest": return a.durationMins - b.durationMins;
        case "early_depart": return a.depart.localeCompare(b.depart);
        default: return 0;
      }
    });

    return result;
  }, [searchQuery, maxPrice, selectedStops, selectedAirlines, selectedCabin, sortBy]);

  // Enhanced Total Calculation
  const totals = useMemo(() => {
    if (!selected) return { base: 0, addons: 0, tax: 0, total: 0 };
    const base = selected.price * passengers.length;
    let addons = 0;
    passengers.forEach(p => {
      addons += BAGGAGE_PRICES[p.baggage] || 0;
      addons += MEAL_PRICES[p.meal] || 0;
    });
    const tax = Math.round((base + addons) * 0.18);
    return { base, addons, tax, total: base + addons + tax };
  }, [selected, passengers]);

  const goto = (s: Step) => { setStep(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const passengersValid = passengers.every(p => p.firstName && p.lastName && p.dob) && contact.email && contact.phone;
  const paymentValid = (payMethod === "card" && card.number.replace(/\s/g, "").length >= 12 && card.name && card.expiry && card.cvv.length >= 3) ||
    (payMethod === "upi" && /.+@.+/.test(upi)) || payMethod === "netbanking" || payMethod === "wallet";

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModifying(false);
    navigate({
      search: {
        from: modSearch.from.toUpperCase(),
        to: modSearch.to.toUpperCase(),
        date: modSearch.date,
      }
    });
  };

  const handlePay = async () => {
    setProcessing(true);
    try {
      const { data: customerData, error: custError } = await supabase.from('customers').insert({
        name: `${passengers[0].firstName} ${passengers[0].lastName}`, email: contact.email, phone: contact.phone, address: contact.address || null, status: 'prospect'
      }).select().single();

      if (custError) console.warn("Customer insert error:", custError);

      const { data: bookingData, error: bookError } = await supabase.from('bookings').insert({
        customer_id: customerData?.id || null, travel_start_date: search.date, travel_end_date: search.date, travellers: passengers.length, total_amount: totals.total, paid_amount: totals.total,
        payment_status: 'paid', status: 'confirmed', booking_type: 'flight', notes: `Flight: ${selected?.airline} ${selected?.code} | Route: ${search.from}-${search.to} | Class: ${selected?.cabinClass} | Addons: ₹${totals.addons}`
      }).select().single();

      if (bookError) throw bookError;
      setBookingRef(bookingData?.booking_ref || "BK-" + Math.random().toString(36).slice(2, 10).toUpperCase());
    } catch (error) {
      console.error("Booking Error:", error);
      setBookingRef("BK-" + Math.random().toString(36).slice(2, 10).toUpperCase());
    } finally {
      setProcessing(false); goto(4);
    }
  };

  const toggleArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { id: Date.now(), firstName: "", lastName: "", gender: "Male", dob: "", nationality: "Indian", passportNo: "", baggage: 0, meal: "No Meal" }]);
  };
  const removePassenger = (id: number) => {
    if (passengers.length > 1) setPassengers(passengers.filter(p => p.id !== id));
  };
  const updateP = (id: number, key: keyof Passenger, value: string | number) => {
    setPassengers(prev => prev.map(p => p.id === id ? { ...p, [key]: value } : p));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-700">
      <Header />

      {/* Hero Section - Light & Clean */}
      {step === 1 && (
        <div className="bg-[#1a103c] pt-10 pb-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8FF] opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB700] opacity-5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            {isModifying ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-in slide-in-from-top-4 duration-300 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#1a103c] flex items-center gap-2"><Edit3 className="h-5 w-5 text-[#00A8FF]" /> Modify Search</h2>
                  <button onClick={() => setIsModifying(false)} className="text-slate-400 hover:text-slate-600 transition"><X className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleModifySubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 items-end">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block tracking-wide">From</label>
                    <input type="text" value={modSearch.from} onChange={e => setModSearch({ ...modSearch, from: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-slate-800 focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none uppercase transition-colors" required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block tracking-wide">To</label>
                    <input type="text" value={modSearch.to} onChange={e => setModSearch({ ...modSearch, to: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-slate-800 focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none uppercase transition-colors" required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1.5 block tracking-wide">Departure Date</label>
                    <input type="date" value={modSearch.date} onChange={e => setModSearch({ ...modSearch, date: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-slate-800 focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none transition-colors" required />
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-[#FFB700] text-[#1a103c] font-semibold rounded-lg px-4 py-2.5 shadow-sm hover:bg-yellow-400 transition-colors">
                      Search Flights
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2">Select your flight</h1>
                  <p className="text-slate-300 font-normal text-sm">Experience seamless travel with Mallick Travels</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-wrap items-center gap-6 text-white w-full md:w-auto shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{search.from}</span>
                    <ArrowRight className="h-4 w-4 text-[#FFB700]" />
                    <span className="text-lg font-semibold">{search.to}</span>
                  </div>
                  <div className="h-6 w-px bg-white/20 hidden md:block"></div>
                  <div className="flex items-center gap-2 font-medium text-sm"><Calendar className="h-4 w-4 text-[#00A8FF]" /> {search.date}</div>
                  <button onClick={() => setIsModifying(true)} className="ml-auto bg-white text-[#1a103c] px-4 py-2 rounded-lg font-medium text-xs hover:bg-slate-50 transition-colors shadow-sm">
                    Modify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Clean Stepper */}
      {step > 1 && (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              {[{ n: 1, label: "Select Flight" }, { n: 2, label: "Travellers" }, { n: 3, label: "Payment" }, { n: 4, label: "Confirmation" }].map((s, i, arr) => (
                <React.Fragment key={s.n}>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${step >= s.n ? "bg-[#1a103c] text-white" : "bg-slate-100 text-slate-400"}`}>
                      {step > s.n ? <Check className="h-3.5 w-3.5" /> : s.n}
                    </div>
                    <span className={`hidden sm:block text-sm font-medium ${step >= s.n ? "text-[#1a103c]" : "text-slate-400"}`}>{s.label}</span>
                  </div>
                  {i < arr.length - 1 && <div className={`flex-1 h-px transition-all duration-500 ${step > s.n ? "bg-[#1a103c]" : "bg-slate-200"}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20 ${step === 1 ? '-mt-8 relative z-20' : 'pt-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Filters Sidebar */}
          {step === 1 && (
            <aside className={`lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit lg:block ${showFilters ? 'block fixed inset-0 z-50 overflow-y-auto rounded-none' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="text-base font-semibold text-[#1a103c] flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#00A8FF]" /> Filters
                </div>
                <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 bg-slate-50 rounded-full"><X className="h-5 w-5 text-slate-500" /></button>
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-3">Stops</label>
                <div className="flex flex-col gap-3">
                  {["All", "Non-stop", "1 Stop"].map(stop => (
                    <label key={stop} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-700">{stop}</span>
                      <input type="radio" name="stops" checked={selectedStops === stop} onChange={() => setSelectedStops(stop)} className="w-4 h-4 accent-[#00A8FF]" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Cabin Class */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-3">Cabin Class</label>
                <div className="space-y-3">
                  {cabinList.map(cabin => (
                    <label key={cabin} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                      <input type="checkbox" checked={selectedCabin.includes(cabin)} onChange={() => toggleArray(setSelectedCabin, cabin)} className="w-4 h-4 rounded border-slate-300 text-[#00A8FF] focus:ring-[#00A8FF]" />
                      {cabin}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Max Price</label>
                  <span className="text-sm font-semibold text-[#1a103c]">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input type="range" min="3000" max="20000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-[#00A8FF]" />
              </div>

              {/* Airlines Filter */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-3">Airlines</label>
                <div className="space-y-3">
                  {airlinesList.map(airline => (
                    <label key={airline} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                      <input type="checkbox" checked={selectedAirlines.includes(airline)} onChange={() => toggleArray(setSelectedAirlines, airline)} className="w-4 h-4 rounded border-slate-300 text-[#00A8FF] focus:ring-[#00A8FF]" />
                      {airline}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Main Content Area */}
          <section className={`space-y-6 ${step === 1 ? 'lg:col-span-9' : 'lg:col-span-8 max-w-4xl mx-auto w-full'}`}>

            {step === 1 && (
              <>
                {/* Search & Sort Options */}
                <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col md:flex-row justify-between items-center gap-4 border border-slate-200">
                  <button onClick={() => setShowFilters(true)} className="lg:hidden w-full md:w-auto bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex justify-center items-center gap-2 border border-slate-200">
                    <Filter className="h-4 w-4" /> Filters
                  </button>

                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search airline, code, or stops..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] transition-all font-medium text-slate-700 placeholder:text-slate-400" />
                  </div>

                  <div className="flex items-center w-full md:w-auto overflow-x-auto hide-scrollbar">
                    <span className="text-xs text-slate-500 mr-2 font-medium">Sort by:</span>
                    {[
                      { id: "cheapest", label: "Cheapest" },
                      { id: "fastest", label: "Fastest" },
                      { id: "early_depart", label: "Earliest" },
                    ].map(sortOpt => (
                      <button key={sortOpt.id} onClick={() => setSortBy(sortOpt.id as any)}
                        className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${sortBy === sortOpt.id ? 'bg-slate-100 text-[#1a103c]' : 'text-slate-500 hover:text-[#1a103c]'}`}>
                        {sortOpt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flight List - Clean Design */}
                <div className="space-y-4">
                  {processedFlights.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-16 border border-slate-200 text-center flex flex-col items-center">
                      <div className="bg-slate-50 p-5 rounded-full mb-5"><Plane className="h-10 w-10 text-slate-300" /></div>
                      <h3 className="text-xl font-semibold text-[#1a103c]">No flights found</h3>
                      <p className="text-slate-500 mt-2 text-sm">Try adjusting your filters or search terms.</p>
                      <button onClick={() => { setSearchQuery(""); setMaxPrice(20000); setSelectedStops("All"); setSelectedAirlines([]); setSelectedCabin([]); }}
                        className="mt-6 text-[#00A8FF] font-medium text-sm hover:underline">
                        Clear all filters
                      </button>
                    </div>
                  ) : (
                    processedFlights.map(f => (
                      <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 overflow-hidden">
                        <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">

                          {/* Airline Info */}
                          <div className="flex items-center gap-4 md:w-1/4 shrink-0">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                              <Plane className="h-5 w-5 text-[#1a103c] -rotate-45" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#1a103c] text-sm">{f.airline}</div>
                              <div className="text-xs text-slate-500 font-medium mt-0.5">{f.code}</div>
                            </div>
                          </div>

                          {/* Flight Timeline */}
                          <div className="flex-1 flex items-center justify-between gap-4 text-center">
                            <div>
                              <div className="text-xl font-semibold text-[#1a103c]">{f.depart}</div>
                              <div className="text-xs text-slate-500 mt-1">{search.from}</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center px-4">
                              <div className="text-xs text-slate-500 font-medium mb-1.5">{f.duration}</div>
                              <div className="w-full flex items-center relative">
                                <div className="h-px w-full bg-slate-300"></div>
                                <Plane className="h-3 w-3 text-slate-400 absolute left-1/2 -translate-x-1/2 -top-1 bg-white px-1 box-content" />
                              </div>
                              <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                                {f.stops}
                              </div>
                            </div>

                            <div>
                              <div className="text-xl font-semibold text-[#1a103c]">{f.arrive}</div>
                              <div className="text-xs text-slate-500 mt-1">{search.to}</div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 pl-0 md:pl-6 gap-3">
                            <div className="text-left md:text-right">
                              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-0.5">Per Adult</div>
                              <div className="text-2xl font-semibold text-[#1a103c]">₹{f.price.toLocaleString("en-IN")}</div>
                            </div>
                            <button
                              onClick={() => { setSelected(f); goto(2); }}
                              className="bg-[#1a103c] text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-[#FFB700] hover:text-[#1a103c] transition-colors w-full md:w-auto"
                            >
                              Book Flight
                            </button>
                          </div>
                        </div>

                        {/* Included Features Bar */}
                        <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 flex flex-wrap items-center gap-5">
                          <div className="text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-slate-400" /> 7kg Cabin, 15kg Check-in
                          </div>
                          <div className="text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5 text-slate-400" /> {f.cabinClass}
                          </div>
                          <div className={`text-[11px] font-medium flex items-center gap-1.5 ${f.refundable ? "text-emerald-600" : "text-slate-500"}`}>
                            <CheckCircle2 className="h-3.5 w-3.5" /> {f.refundable ? "Refundable" : "Non-Refundable"}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* Step 2: Traveller Details & Add-ons (Light UI) */}
            {step === 2 && selected && (
              <div className="space-y-6 animate-in fade-in duration-300">

                {/* Pax Selection */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a103c]">Travellers</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Select the number of people travelling.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button onClick={() => passengers.length > 1 && removePassenger(passengers[passengers.length - 1].id)} disabled={passengers.length <= 1} className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1a103c] disabled:opacity-50 transition"><Minus className="h-4 w-4" /></button>
                    <span className="text-lg font-semibold text-[#1a103c] w-6 text-center">{passengers.length}</span>
                    <button onClick={addPassenger} disabled={passengers.length >= 9} className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1a103c] disabled:opacity-50 transition"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>

                {passengers.map((p, idx) => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-semibold text-[#1a103c]">Passenger {idx + 1}</span>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <Field label="First & Middle Name" value={p.firstName} onChange={v => updateP(p.id, "firstName", v)} placeholder="As per ID" />
                        <Field label="Last Name" value={p.lastName} onChange={v => updateP(p.id, "lastName", v)} placeholder="As per ID" />
                        <div>
                          <label className="text-[12px] font-medium text-slate-500 mb-1 block">Gender</label>
                          <select value={p.gender} onChange={e => updateP(p.id, "gender", e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium text-[#1a103c] bg-white focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none transition-all">
                            <option>Male</option><option>Female</option><option>Other</option>
                          </select>
                        </div>
                        <Field label="Date of Birth" type="date" value={p.dob} onChange={v => updateP(p.id, "dob", v)} />
                        <Field label="Nationality" value={p.nationality} onChange={v => updateP(p.id, "nationality", v)} />
                        <Field label="Passport No. (Optional)" value={p.passportNo} onChange={v => updateP(p.id, "passportNo", v)} />
                      </div>

                      {/* Add-ons Section */}
                      <div className="pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[12px] font-medium text-slate-500 mb-1 block flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Extra Baggage</label>
                          <select value={p.baggage} onChange={e => updateP(p.id, "baggage", Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 bg-white focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none">
                            <option value={0}>No Extra Baggage (15kg included)</option>
                            <option value={5}>+ 5 kg (₹2,500)</option>
                            <option value={10}>+ 10 kg (₹4,500)</option>
                            <option value={15}>+ 15 kg (₹6,000)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[12px] font-medium text-slate-500 mb-1 block flex items-center gap-1.5"><Utensils className="h-3.5 w-3.5" /> Meal Preference</label>
                          <select value={p.meal} onChange={e => updateP(p.id, "meal", e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 bg-white focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none">
                            {Object.keys(MEAL_PRICES).map(meal => (
                              <option key={meal} value={meal}>{meal}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    <h3 className="font-semibold text-[#1a103c] text-sm">Contact Information</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <Field label="Email Address" type="email" value={contact.email} onChange={v => setContact({ ...contact, email: v })} placeholder="For e-ticket" />
                      <Field label="Mobile Number" type="tel" value={contact.phone} onChange={v => setContact({ ...contact, phone: v })} placeholder="For updates" />
                      <Field label="Billing Address (Optional)" value={contact.address} onChange={v => setContact({ ...contact, address: v })} placeholder="City, State" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-2">
                  <button onClick={() => goto(1)} className="px-6 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 flex items-center justify-center gap-2 transition">
                    <ChevronLeft className="h-4 w-4" /> Go Back
                  </button>
                  <button disabled={!passengersValid} onClick={() => goto(3)}
                    className="bg-[#1a103c] text-white font-medium text-sm px-8 py-3 rounded-xl shadow-sm hover:bg-[#FFB700] hover:text-[#1a103c] disabled:opacity-50 transition-colors flex justify-center items-center">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Section (Light UI) */}
            {step === 3 && selected && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-emerald-800 font-medium text-sm">Test Environment</h4>
                    <p className="text-xs text-emerald-600/80 mt-1">This is a secure sandbox. You can use dummy credentials to test the booking flow.</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden min-h-[450px]">

                  {/* Payment Tabs */}
                  <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 flex flex-row md:flex-col overflow-x-auto hide-scrollbar p-2 md:p-4 gap-1">
                    {([
                      { k: "card", label: "Credit / Debit Card", icon: CreditCard },
                      { k: "upi", label: "UPI", icon: Smartphone },
                      { k: "netbanking", label: "Net Banking", icon: Building2 },
                      { k: "wallet", label: "Wallets", icon: Wallet },
                    ] as const).map(m => (
                      <button key={m.k} onClick={() => setPayMethod(m.k)}
                        className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-left transition-colors whitespace-nowrap md:whitespace-normal ${payMethod === m.k ? "bg-white text-[#1a103c] shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-100"}`}>
                        <m.icon className={`h-5 w-5 ${payMethod === m.k ? 'text-[#FFB700]' : ''}`} /> {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment Form */}
                  <div className="md:w-2/3 p-6 sm:p-8">
                    <h3 className="text-lg font-semibold text-[#1a103c] mb-6">Payment Details</h3>

                    {payMethod === "card" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <Field label="Card Number" value={card.number} onChange={v => setCard({ ...card, number: formatCard(v) })} placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="md:col-span-2">
                          <Field label="Name on Card" value={card.name} onChange={v => setCard({ ...card, name: v.toUpperCase() })} placeholder="JOHN DOE" />
                        </div>
                        <Field label="Expiry Date" value={card.expiry} onChange={v => setCard({ ...card, expiry: formatExpiry(v) })} placeholder="MM/YY" />
                        <Field label="CVV" value={card.cvv} onChange={v => setCard({ ...card, cvv: v.replace(/\D/g, "").slice(0, 4) })} placeholder="123" type="password" />
                      </div>
                    )}
                    {payMethod === "upi" && (
                      <div className="space-y-4 max-w-sm">
                        <Field label="UPI ID" value={upi} onChange={setUpi} placeholder="username@upi" />
                        <p className="text-xs text-slate-500 mt-2">Open your connected UPI app to approve the request after proceeding.</p>
                      </div>
                    )}
                    {payMethod === "netbanking" && (
                      <div>
                        <label className="text-xs font-medium text-slate-500 mb-2 block">Select Bank</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {["HDFC", "SBI", "ICICI", "Axis", "Kotak", "Yes Bank"].map(b => (
                            <button key={b} className="border border-slate-200 bg-white rounded-xl p-3 text-sm font-medium text-slate-600 hover:border-[#00A8FF] hover:text-[#00A8FF] transition-colors">
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {payMethod === "wallet" && (
                      <div className="grid grid-cols-2 gap-3 max-w-sm">
                        {["Amazon Pay", "Mobikwik", "Paytm", "PhonePe"].map(w => (
                          <label key={w} className="border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-600 flex items-center gap-3 cursor-pointer hover:border-[#00A8FF] transition-colors has-[:checked]:border-[#00A8FF]">
                            <input type="radio" name="wallet" className="accent-[#00A8FF] w-4 h-4" defaultChecked={w === "Amazon Pay"} /> {w}
                          </label>
                        ))}
                      </div>
                    )}

                    <div className="mt-10">
                      <button disabled={!paymentValid || processing} onClick={handlePay}
                        className="w-full bg-[#1a103c] text-white font-medium py-3.5 rounded-xl shadow-sm hover:bg-[#FFB700] hover:text-[#1a103c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base">
                        {processing ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : <><Lock className="h-4 w-4" /> Pay ₹{totals.total.toLocaleString("en-IN")}</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation - Clean & Elegant Layout */}
            {step === 4 && selected && (
              <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                  {/* Header */}
                  <div className="bg-emerald-50 px-8 py-8 text-center border-b border-emerald-100">
                    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-emerald-900 tracking-tight">Booking Confirmed</h2>
                    <p className="text-emerald-700 mt-1 text-sm font-medium">Your e-ticket has been sent to {contact.email}</p>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Booking Reference</p>
                        <p className="text-xl font-semibold text-[#1a103c]">{bookingRef}</p>
                      </div>
                      <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Status</p>
                        <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Confirmed</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center sm:text-left">
                          <div className="text-3xl font-semibold text-[#1a103c]">{search.from}</div>
                          <div className="text-xs font-medium text-slate-500 mt-1">Departure</div>
                        </div>
                        <div className="flex-1 flex justify-center px-4">
                          <div className="flex items-center w-full max-w-[150px] relative">
                            <div className="h-px w-full bg-slate-300 border-dashed"></div>
                            <Plane className="h-5 w-5 text-slate-400 absolute left-1/2 -translate-x-1/2 bg-slate-50 px-1" />
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-3xl font-semibold text-[#1a103c]">{search.to}</div>
                          <div className="text-xs font-medium text-slate-500 mt-1">Arrival</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-t border-slate-200 pt-4">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Date</div>
                          <div className="font-medium text-[#1a103c]">{search.date}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Flight</div>
                          <div className="font-medium text-[#1a103c]">{selected.airline} {selected.code}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Class</div>
                          <div className="font-medium text-[#1a103c]">{selected.cabinClass}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Passengers</div>
                          <div className="font-medium text-[#1a103c]">{passengers.length} Adult(s)</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-4 border-t border-slate-100">
                      <span className="font-medium text-slate-600">Total Amount Paid</span>
                      <span className="font-semibold text-2xl text-[#1a103c]">₹{totals.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate({ to: '/booking/$slug', params: { slug: bookingRef } })}
                    className="px-6 py-3.5 bg-white text-[#1a103c] border-2 border-slate-200 rounded-xl font-medium shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    View & Download Ticket
                  </button>
                  <button onClick={() => navigate({ to: "/" })} className="px-6 py-3 bg-[#1a103c] text-white rounded-xl font-medium shadow-sm hover:bg-[#FFB700] hover:text-[#1a103c] transition-colors">Back to Home</button>
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar: Fare Summary (Sticky & Light) */}
          {step > 1 && step < 4 && (
            <aside className="lg:col-span-4 relative">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-base text-[#1a103c]">Fare Summary</h3>
                </div>
                {selected && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 text-sm">
                      <div className="flex items-center gap-2 font-medium text-[#1a103c]">
                        {search.from} <ArrowRight className="h-3 w-3 text-slate-400" /> {search.to}
                      </div>
                      <div className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">{passengers.length} Traveller(s)</div>
                    </div>

                    <div className="space-y-3 text-sm font-medium text-slate-500">
                      <div className="flex justify-between items-center">
                        <span>Base Fare</span>
                        <span className="text-[#1a103c]">₹{totals.base.toLocaleString("en-IN")}</span>
                      </div>

                      {totals.addons > 0 && (
                        <div className="flex justify-between items-center text-[#00A8FF]">
                          <span>Baggage & Meals</span>
                          <span>₹{totals.addons.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span>Taxes & Fees</span>
                        <span className="text-[#1a103c]">₹{totals.tax.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-[#1a103c]">Total Amount</span>
                      <span className="font-semibold text-xl text-[#1a103c]">₹{totals.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Lighter, clean Field component
function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="relative group">
      <label className="text-[12px] font-medium text-slate-500 mb-1.5 block transition-colors group-focus-within:text-[#00A8FF]">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium text-[#1a103c] bg-white focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF] outline-none transition-all placeholder:text-slate-300" />
    </div>
  );
}

function formatCard(v: string) { return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "); }
function formatExpiry(v: string) { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; }
