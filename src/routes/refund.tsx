import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/refund")({
  component: RefundPolicy,
});

function RefundPolicy() {
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
            <RefreshCcw className="h-10 w-10 text-[#FFB700] shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a103c] tracking-tight">
              Refund & Cancellation Policy
            </h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 border-b pb-6">
            <span className="font-semibold text-gray-700">Last updated:</span> June 20, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-700">
            <p className="text-lg font-medium text-gray-800">
              At Mallick Travels we strive to make cancellations and refunds as smooth as possible. Because we partner with airlines, hotels, and tour operators, refund timelines and amounts depend on their respective policies in addition to our own service charges.
            </p>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3 flex items-center gap-2">
                1. How to Cancel
              </h2>
              <p>
                To cancel a booking, email <a href="mailto:support@mallicktravels.com" className="text-blue-600 font-medium hover:underline">support@mallicktravels.com</a> or call our helpline at <span className="font-medium text-gray-900">+91 98745 67890</span> with your booking reference. Cancellation requests are processed only during business hours (Mon–Sat, 10:00 AM – 7:00 PM IST).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">2. Flight Bookings</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refunds are subject to the cancellation policy of the operating airline.</li>
                <li>Non-refundable fares will not be eligible for any refund except statutory taxes.</li>
                <li>A service fee of ₹500 per passenger per sector applies on all cancellations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">3. Hotel Bookings</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Free cancellation may be offered if cancelled before the hotel's cut-off date (usually 48–72 hours prior to check-in).</li>
                <li>No-shows and early check-outs are non-refundable.</li>
                <li>A Mallick Travels service fee of ₹300 per booking applies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">4. Holiday Packages</h2>
              <div className="overflow-x-auto mt-4 rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-semibold text-[#1a103c]">Days before departure</th>
                      <th className="p-4 font-semibold text-[#1a103c]">Cancellation charge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-gray-700">45 days or more</td>
                      <td className="p-4 text-gray-700 font-medium">25% of package cost</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-gray-700">30 – 44 days</td>
                      <td className="p-4 text-gray-700 font-medium">50% of package cost</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-gray-700">15 – 29 days</td>
                      <td className="p-4 text-gray-700 font-medium">75% of package cost</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition">
                      <td className="p-4 text-gray-700">Less than 15 days / no-show</td>
                      <td className="p-4 text-gray-700 font-medium">100% (non-refundable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">5. Visa Fees</h2>
              <p>Visa application fees and processing charges are strictly non-refundable, regardless of the outcome of the application.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">6. Refund Processing Time</h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong className="text-gray-900">Credit/Debit Card:</strong> 7 – 14 working days</li>
                <li><strong className="text-gray-900">UPI / Net Banking:</strong> 5 – 7 working days</li>
                <li><strong className="text-gray-900">Bank Transfer:</strong> 7 – 10 working days</li>
              </ul>
              <p className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                Refunds will be made to the original mode of payment only. Any bank or gateway charges will be borne by the customer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">7. Force Majeure</h2>
              <p>In case of cancellations due to natural disasters, government restrictions, or other events beyond our control, refunds will be processed as per the policy of the respective supplier. Mallick Travels service fees remain non-refundable.</p>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">8. Contact</h2>
              <p>For any refund-related queries, write to <a href="mailto:refunds@mallicktravels.com" className="text-blue-600 font-semibold hover:underline">refunds@mallicktravels.com</a>.</p>
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
