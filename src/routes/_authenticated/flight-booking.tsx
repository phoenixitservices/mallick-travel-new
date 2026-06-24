import React, { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Plane, ArrowRight, Check, CreditCard, Lock, Shield, Clock, ChevronLeft,
  CheckCircle2, Wallet, Building2, Smartphone, Loader2, Calendar, MapPin, User,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/flight-booking")({
  validateSearch: (s: Record<string, unknown>) => ({
    from: (s.from as string) || "DEL",
    to: (s.to as string) || "BOM",
    date: (s.date as string) || new Date().toISOString().slice(0, 10),
    pax: Number(s.pax) || 1,
  }),
  head: () => ({
    meta: [{ title: "Flight Booking — Mallick Travels" }],
  }),
  component: FlightBooking,
});

type Flight = {
  id: string; airline: string; code: string; depart: string; arrive: string;
  duration: string; stops: string; price: number;
};

const sampleFlights: Flight[] = [
  { id: "AI101", airline: "Air India", code: "AI 101", depart: "06:15", arrive: "08:45", duration: "2h 30m", stops: "Non-stop", price: 4899 },
  { id: "6E202", airline: "IndiGo", code: "6E 202", depart: "09:00", arrive: "11:25", duration: "2h 25m", stops: "Non-stop", price: 5299 },
  { id: "UK303", airline: "Vistara", code: "UK 303", depart: "13:40", arrive: "16:20", duration: "2h 40m", stops: "Non-stop", price: 5799 },
  { id: "SG404", airline: "SpiceJet", code: "SG 404", depart: "18:10", arrive: "20:55", duration: "2h 45m", stops: "Non-stop", price: 4599 },
  { id: "QP505", airline: "Akasa Air", code: "QP 505", depart: "21:25", arrive: "00:05", duration: "2h 40m", stops: "Non-stop", price: 5099 },
];

type Passenger = { firstName: string; lastName: string; gender: string; dob: string };
type Step = 1 | 2 | 3 | 4;

function FlightBooking() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: search.pax }, () => ({ firstName: "", lastName: "", gender: "Male", dob: "" }))
  );
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [payMethod, setPayMethod] = useState<"card" | "upi" | "netbanking" | "wallet">("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const totals = useMemo(() => {
    if (!selected) return { base: 0, tax: 0, total: 0 };
    const base = selected.price * passengers.length;
    const tax = Math.round(base * 0.18);
    return { base, tax, total: base + tax };
  }, [selected, passengers.length]);

  const goto = (s: Step) => { setStep(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const passengersValid = passengers.every(p => p.firstName && p.lastName && p.dob) && contact.email && contact.phone;
  const paymentValid =
    (payMethod === "card" && card.number.replace(/\s/g, "").length >= 12 && card.name && card.expiry && card.cvv.length >= 3) ||
    (payMethod === "upi" && /.+@.+/.test(upi)) ||
    payMethod === "netbanking" || payMethod === "wallet";

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const id = "MT" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setBookingId(id);
      setProcessing(false);
      goto(4);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#00A8FF] to-[#1a103c] grid place-items-center text-white">
              <Plane className="h-5 w-5 -rotate-45" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-[#1a103c] text-sm">MALLICK <span className="text-[#FFB700]">TRAVELS</span></div>
              <div className="text-[10px] text-gray-500 italic">Your Journey, Our Passion</div>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500"><Shield className="h-4 w-4 text-emerald-600" /> Secure Booking · Test Mode</div>
        </div>
      </header>

      {/* Stepper */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {[
              { n: 1, label: "Select Flight" },
              { n: 2, label: "Passenger Details" },
              { n: 3, label: "Payment" },
              { n: 4, label: "Confirmation" },
            ].map((s, i, arr) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`h-8 w-8 rounded-full grid place-items-center text-sm font-bold ${step >= s.n ? "bg-[#FFB700] text-[#1a103c]" : "bg-gray-200 text-gray-500"}`}>
                    {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold ${step >= s.n ? "text-[#1a103c]" : "text-gray-500"}`}>{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className={`flex-1 h-px ${step > s.n ? "bg-[#FFB700]" : "bg-gray-200"}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          {/* Search summary */}
          <div className="bg-white rounded-xl border p-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 font-bold text-[#1a103c]"><MapPin className="h-4 w-4 text-[#FFB700]" /> {search.from} <ArrowRight className="h-4 w-4" /> {search.to}</div>
            <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4 text-[#FFB700]" /> {search.date}</div>
            <div className="flex items-center gap-2 text-gray-600"><User className="h-4 w-4 text-[#FFB700]" /> {search.pax} Traveller{search.pax > 1 ? "s" : ""}</div>
          </div>

          {step === 1 && (
            <div className="space-y-3">
              {sampleFlights.map(f => (
                <div key={f.id} className={`bg-white rounded-xl border p-4 sm:p-5 transition ${selected?.id === f.id ? "ring-2 ring-[#FFB700] border-[#FFB700]" : "hover:shadow-md"}`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 md:w-44">
                      <div className="h-10 w-10 rounded-full bg-sky-100 grid place-items-center text-[#1a103c]"><Plane className="h-5 w-5 -rotate-45" /></div>
                      <div>
                        <div className="font-bold text-[#1a103c] text-sm">{f.airline}</div>
                        <div className="text-xs text-gray-500">{f.code}</div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-3 items-center gap-2 text-center">
                      <div>
                        <div className="text-lg font-extrabold text-[#1a103c]">{f.depart}</div>
                        <div className="text-xs text-gray-500">{search.from}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <div>{f.duration}</div>
                        <div className="relative my-1 h-px bg-gray-300"><Plane className="h-3 w-3 -rotate-45 text-[#FFB700] absolute left-1/2 -top-1.5 -translate-x-1/2 bg-white" /></div>
                        <div>{f.stops}</div>
                      </div>
                      <div>
                        <div className="text-lg font-extrabold text-[#1a103c]">{f.arrive}</div>
                        <div className="text-xs text-gray-500">{search.to}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 md:w-48">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">per traveller</div>
                        <div className="text-xl font-extrabold text-[#1a103c]">₹{f.price.toLocaleString("en-IN")}</div>
                      </div>
                      <button
                        onClick={() => { setSelected(f); goto(2); }}
                        className="bg-[#FFB700] text-[#1a103c] font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                      >SELECT</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && selected && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border p-5">
                <h2 className="text-lg font-extrabold text-[#1a103c] mb-4">Traveller Details</h2>
                <div className="space-y-5">
                  {passengers.map((p, idx) => (
                    <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4 border-b last:border-0">
                      <div className="col-span-2 md:col-span-4 text-xs font-bold tracking-wider text-gray-500">PASSENGER {idx + 1}</div>
                      <Field label="First Name" value={p.firstName} onChange={v => updateP(idx, "firstName", v)} />
                      <Field label="Last Name" value={p.lastName} onChange={v => updateP(idx, "lastName", v)} />
                      <div>
                        <label className="text-xs font-bold text-gray-500">Gender</label>
                        <select value={p.gender} onChange={e => updateP(idx, "gender", e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <Field label="Date of Birth" type="date" value={p.dob} onChange={v => updateP(idx, "dob", v)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-5">
                <h2 className="text-lg font-extrabold text-[#1a103c] mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Email" type="email" value={contact.email} onChange={v => setContact({ ...contact, email: v })} />
                  <Field label="Phone" type="tel" value={contact.phone} onChange={v => setContact({ ...contact, phone: v })} />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => goto(1)} className="px-4 py-2 text-sm font-bold text-[#1a103c] flex items-center gap-1"><ChevronLeft className="h-4 w-4" /> Back</button>
                <button
                  disabled={!passengersValid}
                  onClick={() => goto(3)}
                  className="bg-[#FFB700] text-[#1a103c] font-bold px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-yellow-500 transition"
                >CONTINUE TO PAYMENT</button>
              </div>
            </div>
          )}

          {step === 3 && selected && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 shrink-0" />
                <span><strong>Test Mode:</strong> This is a dummy payment gateway. No real charges will be made. Use any test details.</span>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-5 border-b">
                  <h2 className="text-lg font-extrabold text-[#1a103c]">Select Payment Method</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 border-b">
                  {([
                    { k: "card", label: "Card", icon: CreditCard },
                    { k: "upi", label: "UPI", icon: Smartphone },
                    { k: "netbanking", label: "Net Banking", icon: Building2 },
                    { k: "wallet", label: "Wallet", icon: Wallet },
                  ] as const).map(m => (
                    <button key={m.k} onClick={() => setPayMethod(m.k)}
                      className={`flex flex-col items-center gap-1 py-4 text-xs font-bold transition border-b-2 ${payMethod === m.k ? "border-[#FFB700] text-[#1a103c] bg-amber-50/50" : "border-transparent text-gray-500 hover:bg-gray-50"}`}>
                      <m.icon className="h-5 w-5" /> {m.label}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {payMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <Field label="Card Number" value={card.number} onChange={v => setCard({ ...card, number: formatCard(v) })} placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="md:col-span-2">
                        <Field label="Cardholder Name" value={card.name} onChange={v => setCard({ ...card, name: v.toUpperCase() })} placeholder="NAME ON CARD" />
                      </div>
                      <Field label="Expiry (MM/YY)" value={card.expiry} onChange={v => setCard({ ...card, expiry: formatExpiry(v) })} placeholder="12/28" />
                      <Field label="CVV" value={card.cvv} onChange={v => setCard({ ...card, cvv: v.replace(/\D/g, "").slice(0, 4) })} placeholder="123" />
                    </div>
                  )}
                  {payMethod === "upi" && (
                    <div>
                      <Field label="UPI ID" value={upi} onChange={setUpi} placeholder="yourname@upi" />
                      <p className="text-xs text-gray-500 mt-2">A payment request will be sent to this UPI ID (simulated).</p>
                    </div>
                  )}
                  {payMethod === "netbanking" && (
                    <div>
                      <label className="text-xs font-bold text-gray-500">Select Bank</label>
                      <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white">
                        {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank", "Yes Bank"].map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  )}
                  {payMethod === "wallet" && (
                    <div className="grid grid-cols-3 gap-2">
                      {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik", "Freecharge", "Ola Money"].map(w => (
                        <label key={w} className="border rounded-md px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="wallet" defaultChecked={w === "Paytm"} /> {w}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => goto(2)} className="px-4 py-2 text-sm font-bold text-[#1a103c] flex items-center gap-1"><ChevronLeft className="h-4 w-4" /> Back</button>
                <button
                  disabled={!paymentValid || processing}
                  onClick={handlePay}
                  className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-emerald-700 transition flex items-center gap-2"
                >
                  {processing ? <><Loader2 className="h-4 w-4 animate-spin" /> PROCESSING...</> : <><Lock className="h-4 w-4" /> PAY ₹{totals.total.toLocaleString("en-IN")}</>}
                </button>
              </div>
            </div>
          )}

          {step === 4 && selected && (
            <div className="bg-white rounded-xl border p-6 sm:p-10 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 grid place-items-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-[#1a103c]">Booking Confirmed!</h2>
              <p className="text-sm text-gray-600 mt-1">Your flight has been successfully booked. A confirmation email has been sent to {contact.email}.</p>

              <div className="mt-6 max-w-md mx-auto bg-gray-50 border rounded-lg p-4 text-left text-sm">
                <Row label="Booking ID" value={bookingId} bold />
                <Row label="Airline" value={`${selected.airline} (${selected.code})`} />
                <Row label="Route" value={`${search.from} → ${search.to}`} />
                <Row label="Date" value={search.date} />
                <Row label="Departure" value={selected.depart} />
                <Row label="Travellers" value={String(passengers.length)} />
                <Row label="Amount Paid" value={`₹${totals.total.toLocaleString("en-IN")}`} bold />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => window.print()} className="px-5 py-2.5 border rounded-lg font-bold text-sm text-[#1a103c]">Download Ticket</button>
                <button onClick={() => navigate({ to: "/" })} className="px-5 py-2.5 bg-[#FFB700] text-[#1a103c] rounded-lg font-bold text-sm hover:bg-yellow-500">Back to Home</button>
              </div>
            </div>
          )}
        </section>

        {/* Sidebar: Fare Summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-extrabold text-[#1a103c]">Fare Summary</h3>
            {selected ? (
              <>
                <div className="mt-3 text-xs text-gray-500 flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {selected.airline} · {selected.code}</div>
                <div className="mt-4 space-y-2 text-sm">
                  <Row label={`Base fare × ${passengers.length}`} value={`₹${totals.base.toLocaleString("en-IN")}`} />
                  <Row label="Taxes & fees (18%)" value={`₹${totals.tax.toLocaleString("en-IN")}`} />
                  <div className="border-t pt-3 mt-2">
                    <Row label="Total" value={`₹${totals.total.toLocaleString("en-IN")}`} bold />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500 mt-3">Select a flight to see fare details.</p>
            )}
            <div className="mt-4 text-[11px] text-gray-500 flex items-start gap-2">
              <Lock className="h-3.5 w-3.5 mt-0.5" /> Payments are processed in a secure test sandbox. No real money is charged.
            </div>
          </div>
        </aside>
      </main>
    </div>
  );

  function updateP(idx: number, key: keyof Passenger, value: string) {
    setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, [key]: value } : p));
  }
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-500">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB700]" />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-gray-600">{label}</span>
      <span className={bold ? "font-extrabold text-[#1a103c]" : "text-[#1a103c]"}>{value}</span>
    </div>
  );
}

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
