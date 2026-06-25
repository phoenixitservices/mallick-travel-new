import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
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
            <ShieldCheck className="h-10 w-10 text-[#FFB700] shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a103c] tracking-tight">
              Privacy Policy
            </h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 border-b pb-6">
            <span className="font-semibold text-gray-700">Last updated:</span> June 20, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-700">
            <p className="text-lg font-medium text-gray-800">
              Mallick Travels ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and disclose information when you use our website or services.
            </p>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3 flex items-center gap-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-gray-900">Personal details:</strong> name, date of birth, gender, nationality, passport details.</li>
                <li><strong className="text-gray-900">Contact information:</strong> email address, phone number, billing and travel addresses.</li>
                <li><strong className="text-gray-900">Payment information:</strong> processed securely via PCI-DSS compliant payment gateways. We do not store full card numbers.</li>
                <li><strong className="text-gray-900">Travel preferences:</strong> meal choices, seat preferences, travel history.</li>
                <li><strong className="text-gray-900">Technical data:</strong> IP address, browser type, device information, and cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To process bookings and issue tickets, vouchers, and invoices.</li>
                <li>To communicate with you about your trip, including updates and alerts.</li>
                <li>To provide customer support and resolve disputes.</li>
                <li>To send marketing communications about offers, where you have opted in.</li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">3. Sharing of Information</h2>
              <p>We share necessary information with airlines, hotels, transport operators, visa authorities, and payment processors to fulfil your booking. We never sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">4. Cookies</h2>
              <p>Our website uses cookies to improve user experience, remember preferences, and analyze traffic. You may disable cookies through your browser settings, though some features may not work as intended.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">5. Data Security</h2>
              <p>We use industry-standard encryption, secure servers, and restricted access to protect your data. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">6. Data Retention</h2>
              <p>We retain your information for as long as required to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">7. Your Rights</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access, update, or correct your personal information.</li>
                <li>Request deletion of your account and associated data.</li>
                <li>Opt out of marketing emails at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">8. Third-Party Links</h2>
              <p>Our website may contain links to external sites. We are not responsible for the privacy practices of those websites.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">9. Updates to this Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "last updated" date.</p>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">10. Contact</h2>
              <p>For questions or requests related to your data, contact us at <a href="mailto:privacy@mallicktravels.com" className="text-blue-600 font-semibold hover:underline">privacy@mallicktravels.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}