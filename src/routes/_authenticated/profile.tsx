import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Mail, Phone, MapPin, ShieldCheck, 
  Briefcase, Heart, Wallet, Users, Award, 
  PlaneTakeoff, CreditCard, Settings, ChevronRight, CheckCircle2
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfessionalProfileDashboard,
});

function ProfessionalProfileDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) return null;

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Traveler";

  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) || undefined;
  const initials = displayName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  // Sidebar Menu Items
  const menuItems = [
    { id: "profile", label: "Profile", icon: User, desc: "Personal info & documents" },
    { id: "bookings", label: "My Bookings", icon: Briefcase, desc: "Flights, Hotels & Holidays" },
    { id: "travellers", label: "Co-Travellers", icon: Users, desc: "Manage saved passengers" },
    { id: "wallet", label: "Mallick Wallet", icon: Wallet, desc: "Balance & Rewards" },
    { id: "cards", label: "Saved Cards", icon: CreditCard, desc: "Secure payment methods" },
    { id: "settings", label: "Settings", icon: Settings, desc: "Password & Notifications" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f8] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Greeting & Loyalty Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a103c]">Hi, {displayName}</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your bookings, wallet, and travel profile here.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4 bg-gradient-to-r from-[#1a103c] to-[#2a1f5c] p-3 rounded-xl shadow-md">
            <div className="h-10 w-10 rounded-full bg-[#FFB700]/20 flex items-center justify-center">
              <Award className="h-6 w-6 text-[#FFB700]" />
            </div>
            <div>
              <p className="text-white text-xs font-medium">Current Tier</p>
              <p className="text-[#FFB700] font-bold text-sm">Mallick Elite Member</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Dashboard Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {/* Profile Summary in Sidebar */}
                <div className="p-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <Avatar className="h-24 w-24 ring-4 ring-white shadow-md">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback className="bg-[#1a103c] text-[#FFB700] text-xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    </div>
                  </div>
                  <h2 className="font-bold text-[#1a103c] text-lg">{displayName}</h2>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  
                  {/* Profile Completeness Bar */}
                  <div className="w-full mt-5 text-left">
                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                      <span className="text-gray-600">Profile Completeness</span>
                      <span className="text-emerald-600">75%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col p-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 text-left ${
                          isActive 
                            ? "bg-[#1a103c]/5 text-[#1a103c] font-bold" 
                            : "text-gray-600 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                          <Icon className={`h-5 w-5 ${isActive ? 'text-[#1a103c]' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px]">{item.label}</p>
                          <p className="text-[10px] text-gray-400 font-normal">{item.desc}</p>
                        </div>
                        <ChevronRight className={`h-4 w-4 ${isActive ? 'text-[#1a103c]' : 'text-gray-300'}`} />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="space-y-6">
                
                {/* Basic Details Section */}
                <Card className="rounded-2xl border-none shadow-sm">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1a103c]">Profile Details</h3>
                      <p className="text-xs text-gray-500 mt-1">Basic info, for a faster booking experience</p>
                    </div>
                    <Button variant="outline" className="text-xs font-bold rounded-lg border-gray-200 text-[#1a103c] hover:bg-gray-50">
                      Edit Details
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">First Name</Label>
                        <p className="font-semibold text-gray-900">{displayName.split(" ")[0]}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Last Name</Label>
                        <p className="font-semibold text-gray-900">{displayName.split(" ")[1] || "Not added"}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date of Birth</Label>
                        <p className="font-semibold text-gray-900">Add Date of Birth</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Gender</Label>
                        <p className="font-semibold text-gray-900">Add Gender</p>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Marital Status</Label>
                        <p className="font-semibold text-gray-900">Add Marital Status</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Login & Contact Details */}
                <Card className="rounded-2xl border-none shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-extrabold text-[#1a103c]">Login Details</h3>
                    <p className="text-xs text-gray-500 mt-1">Manage your email address and mobile number</p>
                  </div>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row border-b border-gray-100">
                      <div className="p-6 flex-1 border-r border-gray-100">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mobile Number</Label>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="font-semibold text-gray-900">+91 - Add Mobile Number</p>
                          <Button variant="link" className="text-[#FFB700] p-0 h-auto font-bold text-xs">+ Add</Button>
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</Label>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{user.email}</p>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Travel Documents (Passport) - Crucial for OTA */}
                <Card className="rounded-2xl border-none shadow-sm">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#1a103c]">Travel Documents</h3>
                      <p className="text-xs text-gray-500 mt-1">Add passport for seamless international bookings</p>
                    </div>
                    <Button className="bg-[#1a103c] hover:bg-[#251754] text-white text-xs font-bold rounded-lg shadow-md">
                      + Add Passport
                    </Button>
                  </div>
                  <CardContent className="p-8 text-center bg-gray-50/50 rounded-b-2xl">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                      <PlaneTakeoff className="h-7 w-7 text-gray-400" />
                    </div>
                    <h4 className="font-bold text-gray-700">No passport added yet</h4>
                    <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">
                      Save your passport details once to avoid typing them every time you book an international flight.
                    </p>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* Placeholder for other tabs (Bookings, Wallet etc.) */}
            {activeTab !== "profile" && (
              <Card className="rounded-2xl border-none shadow-sm min-h-[400px] flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase className="h-8 w-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a103c]">
                    {menuItems.find(i => i.id === activeTab)?.label}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    This section is currently under development. Your data will be available here soon.
                  </p>
                </div>
              </Card>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
