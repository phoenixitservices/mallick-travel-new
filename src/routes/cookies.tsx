import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Cookie } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  component: CookiePolicy,
});

function CookiePolicy() {
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
            <Cookie className="h-10 w-10 text-[#FFB700] shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a103c] tracking-tight">
              Cookie Policy
            </h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 border-b pb-6">
            <span className="font-semibold text-gray-700">Last updated:</span> June 20, 2026
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-700">
            <p className="text-lg font-medium text-gray-800">
              This Cookie Policy explains how Mallick Travels ("we", "us", "our") uses cookies and similar tracking technologies when you visit our website. It describes what these technologies are, why we use them, and the choices you have to control their use.
            </p>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3 flex items-center gap-2">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide reporting and personalization information to site owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">2. Types of Cookies We Use</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong className="text-gray-900">Strictly Necessary Cookies:</strong> required for core functionality such as secure login, booking flow, and session management.
                </li>
                <li>
                  <strong className="text-gray-900">Performance & Analytics Cookies:</strong> help us understand how visitors interact with our website by collecting anonymous usage data.
                </li>
                <li>
                  <strong className="text-gray-900">Functional Cookies:</strong> remember preferences such as language, currency, and recent searches.
                </li>
                <li>
                  <strong className="text-gray-900">Advertising & Targeting Cookies:</strong> used by us and our partners to deliver relevant offers and measure campaign performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">3. Third-Party Cookies</h2>
              <p>
                We may allow trusted third parties — including analytics providers (e.g. Google Analytics), payment processors, and advertising networks — to set cookies on our website. These third parties have their own privacy and cookie policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">4. How Long Cookies Stay on Your Device</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-gray-900">Session cookies:</strong> deleted automatically when you close your browser.</li>
                <li><strong className="text-gray-900">Persistent cookies:</strong> remain on your device until they expire or you delete them.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">5. Managing Your Cookie Preferences</h2>
              <p className="mb-3">
                Most browsers allow you to control cookies through their settings. You can choose to block or delete cookies at any time. Please note that disabling certain cookies may affect the functionality of our website, including the booking experience.
              </p>
              <p className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                <strong className="font-semibold">Helpful links for managing cookies in popular browsers:</strong> Chrome, Safari, Firefox, and Edge — search their support pages for "manage cookies".
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">6. Do Not Track Signals</h2>
              <p>
                Some browsers offer a "Do Not Track" (DNT) feature. Our website does not currently respond to DNT signals, but you may control tracking through the cookie settings described above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Updates will be posted on this page with a revised "last updated" date.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
              <h2 className="text-xl font-bold text-[#1a103c] mb-3">8. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, contact us at <a href="mailto:privacy@mallicktravels.com" className="text-blue-600 font-semibold hover:underline">privacy@mallicktravels.com</a>.
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
