import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, Star, Calendar as CalendarIcon, Search, Check, 
  Filter, Coffee, ShieldCheck, Wifi, CheckCircle2, Users, 
  ArrowLeft, CreditCard, Hotel, Map, BadgeCheck
} from 'lucide-react'

export const Route = createFileRoute('/_authenticated/hotel-booking' as any)({
  component: ModernHotelBookingPage,
})

const MOCK_HOTELS = [
  {
    id: 1,
    name: 'Taj Mahal Palace',
    location: 'Colaba, Mumbai',
    rating: 5,
    reviews: 1245,
    price: 15500,
    image: 'https://images.unsplash.com/photo-1566073171526-873140f156d5?w=400&h=300&fit=crop',
    amenities: ['Pool', 'Spa', 'Sea View', 'Lounge'],
    thomasCookAssured: true,
    freeCancellation: true,
    breakfast: true,
  },
  {
    id: 2,
    name: 'The Leela Ambience',
    location: 'Gurugram, Delhi NCR',
    rating: 5,
    reviews: 890,
    price: 12000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c0d509af?w=400&h=300&fit=crop',
    amenities: ['Gym', 'Bathtub', 'Lounge', 'Free WiFi'],
    thomasCookAssured: true,
    freeCancellation: false,
    breakfast: true,
  },
  {
    id: 3,
    name: 'ITC Grand Chola',
    location: 'Guindy, Chennai',
    rating: 4.5,
    reviews: 2100,
    price: 14200,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    amenities: ['Luxury', 'Multiple Dining', 'Sanitized'],
    thomasCookAssured: false,
    freeCancellation: true,
    breakfast: false,
  },
  {
    id: 4,
    name: 'Lemon Tree Premier',
    location: 'Baga, Goa',
    rating: 4,
    reviews: 654,
    price: 5400,
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14db4ac?w=400&h=300&fit=crop',
    amenities: ['Beachfront', 'Pool', 'Bar', 'Free WiFi'],
    thomasCookAssured: true,
    freeCancellation: true,
    breakfast: true,
  }
]

function ModernHotelBookingPage() {
  // Application States
  const [step, setStep] = useState(1) // 1: Search, 2: Checkout, 3: Success
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  
  // Checkout Form State
  const [guestName, setGuestName] = useState('')

  // Data Processing (Search & Sort)
  const processedHotels = useMemo(() => {
    let result = [...MOCK_HOTELS]

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        hotel => 
          hotel.name.toLowerCase().includes(q) || 
          hotel.location.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }
    return result
  }, [searchQuery, sortBy])

  // Action Handlers
  const handleSelectRoom = (hotel: any) => {
    setSelectedHotel(hotel)
    setStep(2)
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate actual payment gateway logic (Razorpay/Stripe)
    // For now, we simulate success
    setStep(3)
  }

  const resetFlow = () => {
    setSelectedHotel(null)
    setGuestName('')
    setStep(1)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </div>

      <main className="flex-grow flex flex-col">
        {/* Compact Search Bar - Only on Step 1 */}
        {step === 1 && (
          <div className="bg-[#0354A6] w-full py-4">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 items-center shadow-lg">
                <div className="relative flex-1 w-full border border-slate-200 rounded-md bg-slate-50 overflow-hidden hover:border-[#0354A6] transition-colors">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 border-none bg-transparent h-11 focus-visible:ring-0 text-sm font-medium"
                    placeholder="City, Area or Hotel Name"
                  />
                </div>
                
                <div className="relative flex-1 w-full border border-slate-200 rounded-md bg-slate-50 hover:border-[#0354A6] transition-colors flex items-center px-3 h-11 cursor-pointer">
                  <CalendarIcon className="h-4 w-4 text-[#0354A6] mr-2 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 truncate">12 Aug - 14 Aug</span>
                </div>

                <div className="relative flex-1 w-full border border-slate-200 rounded-md bg-slate-50 hover:border-[#0354A6] transition-colors flex items-center px-3 h-11 cursor-pointer">
                  <Users className="h-4 w-4 text-[#0354A6] mr-2 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 truncate">1 Room, 2 Guests</span>
                </div>

                <button className="bg-[#FEC20F] hover:bg-[#e0ab0d] text-black font-bold h-11 px-8 rounded-md w-full md:w-auto transition-colors flex items-center justify-center gap-2 shrink-0">
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
          
          {/* STEP 1: RESULTS */}
          {step === 1 && (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-[280px] shrink-0 sticky top-24">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                    <Filter className="h-4 w-4 text-[#0354A6]" />
                    <h3 className="font-bold text-sm text-slate-800">Filter Results</h3>
                  </div>
                  
                  <div className="p-4 border-b border-slate-100">
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Price Per Night</h4>
                    <div className="space-y-2.5">
                      {['Under ₹2000', '₹2000 - ₹5000', '₹5000 - ₹10000', 'Above ₹10000'].map((price) => (
                        <label key={price} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0354A6] focus:ring-[#0354A6]" />
                          <span className="text-sm font-medium text-slate-600 group-hover:text-[#0354A6]">{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Star Rating</h4>
                    <div className="space-y-2.5">
                      {[5, 4, 3].map((star) => (
                        <label key={star} className="flex items-center space-x-3 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0354A6] focus:ring-[#0354A6]" />
                          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:text-[#0354A6]">
                            {star} <Star className="h-3 w-3 ml-1 fill-[#FEC20F] text-[#FEC20F]" /> & Up
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* List Area */}
              <div className="flex-1 w-full space-y-4">
                {/* Sorting Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <h2 className="text-sm font-bold text-slate-800">
                    Showing <span className="text-[#0354A6]">{processedHotels.length}</span> properties
                  </h2>
                  <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto">
                    <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                    {[
                      { id: "popular", label: "Popularity" },
                      { id: "price-low", label: "Price (Low)" },
                      { id: "rating", label: "Rating" },
                    ].map(sortOpt => (
                      <button 
                        key={sortOpt.id} 
                        onClick={() => setSortBy(sortOpt.id)}
                        className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                          sortBy === sortOpt.id 
                            ? 'bg-[#0354A6] text-white' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {sortOpt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hotel Horizontal Cards */}
                {processedHotels.length === 0 ? (
                   <div className="bg-white rounded-xl shadow-sm p-12 border border-slate-200 text-center">
                     <Hotel className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                     <h3 className="text-lg font-bold text-slate-800">No properties found</h3>
                     <p className="text-slate-500 text-sm mt-1">Try changing your filters or search term.</p>
                   </div>
                ) : (
                  processedHotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                      {/* Image */}
                      <div className="w-full sm:w-[240px] h-48 sm:h-auto relative shrink-0">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                        {hotel.thomasCookAssured && (
                          <div className="absolute top-2 left-0 bg-[#0354A6] text-white text-[10px] font-bold px-2 py-1 rounded-r shadow-sm flex items-center">
                            <Check className="h-3 w-3 mr-1" /> TC Assured
                          </div>
                        )}
                      </div>

                      {/* Content Middle */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {Array(Math.floor(hotel.rating)).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-[#FEC20F] text-[#FEC20F]" />
                            ))}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{hotel.name}</h3>
                          <p className="text-xs font-medium text-slate-500 flex items-center mb-3">
                            <Map className="h-3 w-3 mr-1" /> {hotel.location}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {hotel.amenities.map(amenity => (
                              <span key={amenity} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-medium">
                          {hotel.freeCancellation && (
                            <span className="text-emerald-600 flex items-center"><CheckCircle2 className="h-3 w-3 mr-1" /> Free Cancellation</span>
                          )}
                          {hotel.breakfast && (
                            <span className="text-slate-600 flex items-center"><Coffee className="h-3 w-3 mr-1" /> Breakfast Incl.</span>
                          )}
                        </div>
                      </div>

                      {/* Pricing Right */}
                      <div className="w-full sm:w-[180px] bg-slate-50/50 p-4 border-t sm:border-t-0 sm:border-l border-slate-100 flex flex-row sm:flex-col justify-between items-center sm:items-end shrink-0">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Per Night</div>
                          <div className="text-2xl font-bold text-[#0354A6] leading-none">₹{hotel.price.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-slate-500 mt-1">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</div>
                        </div>
                        <button 
                          onClick={() => handleSelectRoom(hotel)}
                          className="bg-[#FEC20F] hover:bg-[#e0ab0d] text-black text-sm font-bold px-6 py-2 rounded-md transition-colors shadow-sm"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CHECKOUT */}
          {step === 2 && selectedHotel && (
            <div className="max-w-5xl mx-auto">
              <button 
                onClick={resetFlow}
                className="flex items-center text-[#0354A6] mb-6 hover:underline font-semibold text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Modify Search
              </button>

              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left Col: Details & Form */}
                <div className="flex-1 w-full space-y-6">
                  {/* Hotel Snippet */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
                    <img src={selectedHotel.image} alt={selectedHotel.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{selectedHotel.name}</h2>
                      <p className="text-sm text-slate-500 flex items-center mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" /> {selectedHotel.location}
                      </p>
                      <div className="mt-2 flex gap-3 text-xs font-medium text-slate-600">
                        <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><CalendarIcon className="h-3 w-3 mr-1 text-[#0354A6]"/> 12 Aug - 14 Aug</span>
                        <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><Users className="h-3 w-3 mr-1 text-[#0354A6]"/> 1 Room, 2 Guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Guest Form */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#0354A6]" /> Guest Details
                    </h3>
                    <form onSubmit={handlePayment} id="booking-form" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 mb-1.5 block">Primary Guest Name</label>
                          <Input 
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Enter full name" 
                            className="bg-slate-50 border-slate-200 focus-visible:ring-[#0354A6]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email Address</label>
                          <Input required type="email" placeholder="Email for booking confirmation" className="bg-slate-50 border-slate-200 focus-visible:ring-[#0354A6]" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 mb-1.5 block">Phone Number</label>
                          <Input required type="tel" placeholder="+91" className="bg-slate-50 border-slate-200 focus-visible:ring-[#0354A6]" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right Col: Fare Summary Sticky */}
                <div className="w-full lg:w-[320px] shrink-0 sticky top-24">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-[#0354A6] p-4 text-white">
                      <h3 className="font-bold">Fare Summary</h3>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Base Fare (1 Room x 2 Nights)</span>
                        <span className="font-semibold text-slate-800">₹{(selectedHotel.price * 2).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Taxes & Fees (18%)</span>
                        <span className="font-semibold text-slate-800">₹{Math.round(selectedHotel.price * 2 * 0.18).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="border-t border-slate-200 my-2 pt-3 flex justify-between items-center">
                        <span className="text-base font-bold text-slate-900">Total Amount</span>
                        <span className="text-xl font-bold text-[#0354A6]">
                          ₹{Math.round(selectedHotel.price * 2 * 1.18).toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <button 
                        type="submit" 
                        form="booking-form"
                        className="w-full mt-4 bg-[#FEC20F] hover:bg-[#e0ab0d] text-black font-bold h-12 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <CreditCard className="h-5 w-5" /> Proceed to Payment
                      </button>
                      <p className="text-[10px] text-center text-slate-400 mt-2">
                        By proceeding, you agree to our Terms & Conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto text-center py-12 px-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BadgeCheck className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
              <p className="text-slate-600 mb-8">
                Thank you {guestName || 'Guest'}, your stay at <span className="font-semibold">{selectedHotel?.name}</span> is confirmed. We have sent the details to your email.
              </p>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 text-left">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Booking ID</span>
                    <span className="font-bold text-slate-800">TC-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Dates</span>
                    <span className="font-bold text-slate-800">12 Aug - 14 Aug</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Amount Paid</span>
                    <span className="font-bold text-[#0354A6]">₹{Math.round((selectedHotel?.price || 0) * 2 * 1.18).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={resetFlow}
                className="bg-[#0354A6] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#024080] transition-colors"
              >
                Book Another Hotel
              </button>
            </div>
          )}
          
        </div>
      </main>

      {/* Normal Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
