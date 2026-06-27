  import {
  Plane, Facebook, Instagram, Twitter, Youtube, MessageCircle,
  MapPin, Phone, Mail, Globe,
} from "lucide-react";

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-bold mb-4">{title}</h4>
      <ul className="space-y-2 text-xs">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="hover:text-primary">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
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
        <FooterCol title="QUICK LINKS" items={[{"label": "About Us", "href": "/about"}, {"label": "Blog", "href": "/blog"}, {"label": "Payment Options", "href": "/payment-options"}, {"label": "Terms & Conditions", "href": "/terms"}, {"label": "Privacy Policy", "href": "/privacy"}, {"label": "Refund Policy", "href": "/refund"}]} />
        <FooterCol title="OUR SERVICES" items={[{"label": "Flight Booking", "href": "/flight-booking"}, {"label": "Hotel Booking", "href": "/hotel-booking"}, {"label": "Holiday Packages", "href": "/holiday-packages"}, {"label": "Train Tickets", "href": "/train-tickets"}, {"label": "Bus Booking", "href": "/bus-booking"}, {"label": "Visa Assistance", "href": "/visa-assistance"}, {"label": "Travel Insurance", "href": "/travel-insurance"}]} />
        <FooterCol title="POPULAR DESTINATIONS" items={[{"label": "Goa Packages", "href": "/goa-packages"}, {"label": "Kashmir Packages", "href": "/kashmir-packages"}, {"label": "Kerala Packages", "href": "/kerala-packages"}, {"label": "Rajasthan Packages", "href": "/rajasthan-packages"}, {"label": "Thailand Packages", "href": "/thailand-packages"}, {"label": "Dubai Packages", "href": "/dubai-packages"}]} />
        <div>
          <h4 className="text-white font-bold mb-4">CONTACT US</h4>
          <ul className="space-y-3 text-xs">
            {/*<li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /> 123, R. N. Mukherjee Road, Kolkata - 700001, West Bengal, India</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /> +91 98745 67890</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary shrink-0" /> info@mallicktravels.com</li>*/}
            <li className="flex gap-2"><Globe className="h-4 w-4 text-primary shrink-0" /> www.mallicktravels.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60 text-center md:text-left">© 2025 Mallick Travels. All Rights Reserved.</div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/d/d3/Visa_Inc._logo_%282005%E2%80%932014%29.png",
              "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png",
              "https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png",
            ].map((src) => (
              <div key={src} className="bg-white h-7 w-12 rounded flex items-center justify-center shadow-sm p-1">
                <img src={src} alt="Payment" className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
