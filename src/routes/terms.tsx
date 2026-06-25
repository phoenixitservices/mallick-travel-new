import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsAndConditions,
});

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#1a103c] font-bold hover:text-[#FFB700] transition"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <FileText className="h-10 w-10 text-[#FFB700] shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a103c] tracking-tight">
              Terms & Conditions
            </h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 border-b pb-6">
            <span className="font-semibold text-gray-700">Last updated:</span> June 20, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-700">
            <p className="text-lg font-medium text-gray-800">
              Welcome to Mallick Travels. By accessing or using our website, mobile applications, or any of our travel booking services, you agree to be bound by the following Terms & Conditions. Please read them carefully before making any booking.
            </p>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3 flex items-center gap-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By using our services you confirm that you are at least 18 years old and legally capable of entering into a binding contract. If you are booking on behalf of others, you represent that you have their authorization to do so.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">2. Bookings & Reservations</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All bookings are subject to availability and confirmation by the respective airline, hotel, or service provider.</li>
                <li>Prices displayed are indicative and may change until full payment is received and the booking is confirmed.</li>
                <li>Guests must provide accurate personal details. Mallick Travels is not responsible for losses arising from incorrect information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">3. Payments</h2>
              <p>
                Full payment or the agreed advance must be made at the time of booking. Accepted modes include credit/debit cards, UPI, net banking, and bank transfers. All transactions are processed through secure payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">4. Travel Documents</h2>
              <p>
                It is the traveller's responsibility to carry valid identification, visas, passports, and any other documents required for the journey. Mallick Travels will not be liable for denied boarding or entry due to missing or invalid documents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">5. Changes & Cancellations</h2>
              <p>
                Any modification or cancellation is governed by the policies of the airline, hotel, or service provider, along with our applicable service fees. Refer to our Refund Policy for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">6. Liability</h2>
              <p>
                Mallick Travels acts only as a booking agent and is not liable for delays, cancellations, accidents, loss of baggage, injuries, or any other issues arising from the conduct of airlines, hotels, transport operators or other third-party suppliers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">7. Force Majeure</h2>
              <p>
                We shall not be held responsible for failure to perform any obligation due to events beyond our reasonable control, including natural disasters, pandemics, strikes, war, or government restrictions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">8. Intellectual Property</h2>
              <p>
                All content on this website — including logos, text, images and design — is the property of Mallick Travels and may not be reproduced without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">9. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">10. Contact</h2>
              <p>
                For any questions about these Terms & Conditions, write to us at <a href="mailto:info@mallicktravels.com" className="text-blue-600 font-semibold hover:underline">info@mallicktravels.com</a> or call <span className="font-semibold text-gray-900">+91 98745 67890</span>.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
            © 2026 Mallick Travels. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
}