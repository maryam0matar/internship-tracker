"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    LogIn,
    LogOut,
    MapPin,
    Clock,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckInCard() {
    const [status, setStatus] = useState<"idle" | "checked-in" | "checked-out">("idle");
    const [checkInTime, setCheckInTime] = useState<Date | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);

    const handleCheckIn = () => {
        setCheckInTime(new Date());
        setStatus("checked-in");
    };

    const handleCheckOut = () => {
        setCheckOutTime(new Date());
        setStatus("checked-out");
    };

    return (
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">Daily Attendance</h3>
                    <p className="text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                        {format(new Date(), "EEEE, MMMM do yyyy")}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleCheckIn}
                        disabled={status !== "idle"}
                        className={cn(
                            "px-6 py-3 rounded-2xl font-semibold flex items-center transition-all duration-300 shadow-sm",
                            status === "idle"
                                ? "bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-1"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={status !== "checked-in"}
                        className={cn(
                            "px-6 py-3 rounded-2xl font-semibold flex items-center transition-all duration-300 shadow-sm",
                            status === "checked-in"
                                ? "bg-white text-black border border-border hover:shadow-lg hover:-translate-y-1"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Check Out
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Check In</p>
                    <p className="text-lg font-bold mt-1">
                        {checkInTime ? format(checkInTime, "hh:mm a") : "--:--"}
                    </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Check Out</p>
                    <p className="text-lg font-bold mt-1">
                        {checkOutTime ? format(checkOutTime, "hh:mm a") : "--:--"}
                    </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
                    <p className="text-lg font-bold mt-1">
                        {checkInTime && checkOutTime ? "8h 30m" : "--"}
                    </p>
                </div>
            </div>
        </div>
    );
}
