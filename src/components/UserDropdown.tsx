import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    User as UserIcon, Heart, Briefcase, Wallet,
    CreditCard, LogOut, ChevronRight, Sparkles
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function UserDropdown() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const displayName =
        (user?.user_metadata?.full_name as string | undefined) ||
        (user?.user_metadata?.name as string | undefined) ||
        user?.email?.split("@")[0] ||
        "Traveler";

    const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) || undefined;

    const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success("Signed out successfully");
            navigate({ to: "/" });
        } catch (error) {
            toast.error("Failed to sign out");
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* PREMIUM MODERNISED TRIGGER */}
                <Button
                    variant="ghost"
                    className="relative h-11 w-11 rounded-full p-0 bg-transparent hover:bg-transparent focus-visible:ring-0 group select-none transition-transform active:scale-95"
                >
                    {/* Animated Magic Outer Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#FFB700]/40 scale-100 group-hover:scale-110 group-hover:border-[#FFB700] transition-all duration-300 pointer-events-none" />

                    {/* Inner Clean Avatar Boundary */}
                    <div className="absolute inset-[2px] rounded-full bg-white p-[2px] border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <Avatar className="h-full w-full">
                            <AvatarImage
                                src={avatarUrl}
                                alt={displayName}
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-[#1a103c] via-[#241754] to-[#1a103c] text-[#FFB700] font-bold text-xs tracking-wider">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Active Online Pulse Dot */}
                    <span className="absolute bottom-[1px] right-[1px] h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                </Button>
            </DropdownMenuTrigger>

            {/* EYE CATCHY & PRECISELY ALIGNED LIST CONTENT */}
            <DropdownMenuContent
                className="w-68 bg-white rounded-2xl shadow-[0_10px_40px_rgba(26,16,60,0.12)] border border-gray-100/80 p-2 animate-in fade-in-50 zoom-in-95 duration-200 ease-out"
                align="end"
                sideOffset={10}
            >
                {/* Premium User Profile Header */}
                <DropdownMenuLabel className="font-normal p-3 rounded-xl bg-gradient-to-br from-[#1a103c]/5 via-transparent to-[#FFB700]/8 mb-2 border border-gray-50">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-[#1a103c] flex items-center justify-center text-white shadow-sm">
                            <Sparkles className="h-4 w-4 text-[#FFB700] animate-pulse" />
                        </div>
                        <div className="flex flex-col space-y-0.5 min-w-0 flex-1">
                            <p className="text-sm font-bold text-[#1a103c] tracking-tight truncate">{displayName}</p>
                            <p className="text-[11px] text-gray-400 font-medium truncate">{user.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-100/70 my-1" />

                <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem
                        onClick={() => navigate({ to: "/profile" })}
                        className="cursor-pointer font-bold text-gray-700 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 hover:bg-[#1a103c]/5 focus:bg-[#1a103c]/5 hover:text-[#1a103c] focus:text-[#1a103c] transition-all duration-200 group/item"
                    >
                        <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a103c]/70 group-hover/item:bg-[#1a103c]/10 group-hover/item:text-[#1a103c] transition-colors">
                            <UserIcon className="h-4 w-4 transition-transform group-hover/item:scale-110" />
                        </div>
                        <span className="tracking-wide">My Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer font-bold text-gray-700 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 hover:bg-[#1a103c]/5 focus:bg-[#1a103c]/5 hover:text-[#1a103c] focus:text-[#1a103c] transition-all duration-200 group/item">
                        <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a103c]/70 group-hover/item:bg-[#1a103c]/10 group-hover/item:text-[#1a103c] transition-colors">
                            <Heart className="h-4 w-4 transition-transform group-hover/item:scale-110" />
                        </div>
                        <span className="tracking-wide">Wishlist</span>
                    </DropdownMenuItem>

                    {/* Sub Menu with Perfect Alignments */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer font-bold text-gray-700 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 hover:bg-[#1a103c]/5 focus:bg-[#1a103c]/5 data-[state=open]:bg-[#1a103c]/5 transition-all duration-200 group/sub">
                            <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a103c]/70 group-hover/sub:bg-[#1a103c]/10 group-hover/sub:text-[#1a103c] transition-colors">
                                <Briefcase className="h-4 w-4" />
                            </div>
                            <span className="tracking-wide text-gray-700 group-hover/sub:text-[#1a103c]">My Trips</span>
                            <ChevronRight className="ml-auto h-4 w-4 text-gray-400 group-hover/sub:text-[#1a103c] transition-transform group-hover/sub:translate-x-0.5" />
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="p-1.5 bg-white rounded-xl shadow-xl border border-gray-100/80 min-w-[150px] space-y-0.5 animate-in slide-in-from-left-1 duration-150">
                                <DropdownMenuItem className="cursor-pointer font-semibold text-gray-600 text-xs rounded-lg py-2 px-2.5 hover:bg-gray-50 hover:text-[#1a103c] focus:bg-gray-50">
                                    Upcoming
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer font-semibold text-gray-600 text-xs rounded-lg py-2 px-2.5 hover:bg-gray-50 hover:text-[#1a103c] focus:bg-gray-50">
                                    Cancelled
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer font-semibold text-gray-600 text-xs rounded-lg py-2 px-2.5 hover:bg-gray-50 hover:text-[#1a103c] focus:bg-gray-50">
                                    Completed
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                <DropdownMenuItem className="cursor-pointer font-bold text-[#1a103c] text-xs rounded-lg py-2 px-2.5 bg-[#FFB700]/15 hover:bg-[#FFB700]/25 transition-colors text-center justify-center">
                                    All Trips
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem className="cursor-pointer font-bold text-gray-700 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 hover:bg-[#1a103c]/5 focus:bg-[#1a103c]/5 hover:text-[#1a103c] focus:text-[#1a103c] transition-all duration-200 group/item">
                        <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a103c]/70 group-hover/item:bg-[#1a103c]/10 group-hover/item:text-[#1a103c] transition-colors">
                            <Wallet className="h-4 w-4 transition-transform group-hover/item:scale-110" />
                        </div>
                        <span className="tracking-wide">My Wallet</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer font-bold text-gray-700 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 hover:bg-[#1a103c]/5 focus:bg-[#1a103c]/5 hover:text-[#1a103c] focus:text-[#1a103c] transition-all duration-200 group/item">
                        <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-[#1a103c]/70 group-hover/item:bg-[#1a103c]/10 group-hover/item:text-[#1a103c] transition-colors">
                            <CreditCard className="h-4 w-4 transition-transform group-hover/item:scale-110" />
                        </div>
                        <span className="tracking-wide">Pending Payment</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-gray-100/70 my-1.5" />

                {/* Sign Out Section */}
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer font-extrabold text-red-600 text-[13px] rounded-xl py-2.5 px-3 flex items-center gap-3 focus:text-red-700 focus:bg-red-50/60 transition-all duration-150 group/logout"
                >
                    <div className="h-7 w-7 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover/logout:bg-red-100 transition-colors">
                        <LogOut className="h-4 w-4 transition-transform group-hover/logout:-translate-x-0.5" />
                    </div>
                    <span className="tracking-wide">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
