"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    LogIn,
    LogOut,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Attendance } from "@prisma/client";
import { checkIn, checkOut } from "@/app/attendance/actions";

interface CheckInCardProps {
    initialRecord: Attendance | null;
}

export function CheckInCard({ initialRecord }: CheckInCardProps) {
    const [record, setRecord] = useState<Attendance | null>(initialRecord);
    const [loading, setLoading] = useState(false);

    // Synchronize local state with props (important for Server Component updates)
    useEffect(() => {
        setRecord(initialRecord);
    }, [initialRecord]);

    const handleCheckIn = async () => {
        setLoading(true);
        try {
            const res = await checkIn("PRESENT", undefined, new Date().toISOString());
            if ('id' in res) {
                setRecord(res);
            }
        } catch (error) {
            console.error("Failed to check in:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async () => {
        if (!record?.id) return;
        setLoading(true);
        try {
            const res = await checkOut(record.id, new Date().toISOString());
            if ('id' in res) {
                setRecord(res);
            }
        } catch (error) {
            console.error("Failed to check out:", error);
        } finally {
            setLoading(false);
        }
    };

    const status = !record ? "idle" : record.checkOut ? "checked-out" : "checked-in";

    return (
        <div className="glass p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">Daily Attendance</h3>
                    <p className="text-muted-foreground flex items-center">
                        <span className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            status === "checked-in" ? "bg-green-500 animate-pulse" : "bg-slate-300"
                        )} />
                        {format(new Date(), "EEEE, MMMM do yyyy")}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleCheckIn}
                        disabled={status !== "idle" || loading}
                        className={cn(
                            "px-6 py-3 rounded-2xl font-semibold flex items-center transition-all duration-300 shadow-sm",
                            status === "idle" && !loading
                                ? "bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-1"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        {loading && status === "idle" ? "Processing..." : "Check In"}
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={status !== "checked-in" || loading}
                        className={cn(
                            "px-6 py-3 rounded-2xl font-semibold flex items-center transition-all duration-300 shadow-sm",
                            status === "checked-in" && !loading
                                ? "bg-white text-black border border-border hover:shadow-lg hover:-translate-y-1"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        {loading && status === "checked-in" ? "Processing..." : "Check Out"}
                    </button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Check In</p>
                    <p className="text-lg font-bold mt-1">
                        {record?.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "--:--"}
                    </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Check Out</p>
                    <p className="text-lg font-bold mt-1">
                        {record?.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "--:--"}
                    </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
                    <p className="text-lg font-bold mt-1">
                        {record?.hours ? `${record.hours.toFixed(1)}h` : "--"}
                    </p>
                </div>
            </div>
        </div>
    );
}
