import { createFileRoute } from "@tanstack/react-router";
import {
  Plane,
  Mail,
  Phone,
  Clock3,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const launchDate = new Date("2026-08-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1020] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://media.tenor.com/X7Q7QxrfwS4AAAAi/airplane-travel.gif"
          alt="Travel"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB700] to-[#00A8FF] shadow-2xl">
              <Plane className="h-10 w-10 -rotate-45 text-white" />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-300">
            ✈️ Launching Soon
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Your Next Journey
            <span className="block text-[#FFB700]">
              Begins Here
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
            Mallick Travels is preparing a smarter way to
            book Flights, Hotels, Holiday Packages,
            Visa Services and Travel Insurance.
          </p>

          {/* Features */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              "Flight Booking",
              "Hotel Booking",
              "Holiday Packages",
              "Visa Assistance",
              "Travel Insurance",
              "24x7 Support",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="mt-14">
            <div className="mb-6 flex items-center justify-center gap-2 text-yellow-400">
              <Clock3 className="h-5 w-5" />
              <span className="font-semibold">
                Launching In
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <CountdownCard
                value={timeLeft.days}
                label="Days"
              />
              <CountdownCard
                value={timeLeft.hours}
                label="Hours"
              />
              <CountdownCard
                value={timeLeft.minutes}
                label="Minutes"
              />
              <CountdownCard
                value={timeLeft.seconds}
                label="Seconds"
              />
            </div>
          </div>

          {/* Email */}
          {/*
          <div className="mx-auto mt-14 max-w-2xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-14 flex-1 rounded-xl border border-white/10 bg-white/10 px-5 outline-none backdrop-blur-lg"
              />

              <button className="h-14 rounded-xl bg-[#FFB700] px-8 font-bold text-[#1A103C] transition hover:scale-105">
                Notify Me
              </button>
            </div>
          </div>
          */}

          {/* Contact */}
          {/*
          <div className="mt-14 flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4 text-[#FFB700]" />
              +91 XXXXX XXXXX
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="h-4 w-4 text-[#FFB700]" />
              info@mallicktravel.com
            </div>
          </div>
          */}

          {/* Social */}
          {/*
          <div className="mt-10 flex justify-center gap-4">
            {[Facebook, Instagram, Youtube].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:bg-[#FFB700] hover:text-black"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            )}
          </div>
          */}

          {/* Footer */}
          <div className="mt-16 border-t border-white/10 pt-6 text-sm text-gray-400">
            © 2026 Mallick Travels. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      {/*
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition hover:scale-110"
      >
        <FaWhatsapp className="h-8 w-8 text-white" />
      </a>
      */}
    </div>
  );
}

function CountdownCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-4xl font-extrabold text-[#FFB700]">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray-400">
        {label}
      </div>
    </div>
  );
}
