"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Calendar as CalendarIcon,
    List,
    Filter,
    Download
} from "lucide-react";
import { CheckInCard } from "@/components/attendance/check-in-card";
import { Attendance } from "@prisma/client";

interface AttendanceContentProps {
    todayAttendance: Attendance | null;
    history: Attendance[];
}

export function AttendanceContent({ todayAttendance, history }: AttendanceContentProps) {
    const [view, setView] = useState<"calendar" | "list">("calendar");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
                    <p className="text-muted-foreground mt-1">Track your daily presence and university hours.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white/50 p-1 rounded-xl border border-border flex shadow-sm">
                        <button
                            onClick={() => setView("calendar")}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                view === "calendar" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <CalendarIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setView("list")}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                view === "list" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                    <button className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-white transition-colors">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </button>
                    <button className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-white transition-colors">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </button>
                </div>
            </header>

            <CheckInCard initialRecord={todayAttendance} />

            <div className="glass rounded-3xl p-8 min-h-[500px]">
                {view === "calendar" ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-bold italic">February 2026</h4>
                            <div className="flex gap-2">
                                <button className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-accent">{"<"}</button>
                                <button className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-accent">{">"}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                <div key={day} className="text-center text-xs font-bold text-muted-foreground uppercase tracking-wider py-2">
                                    {day}
                                </div>
                            ))}
                            {/* Simplified for now, real calendar logic could be added */}
                            {Array.from({ length: 28 }).map((_, i) => {
                                const day = i + 1;
                                const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;
                                const hasEntry = history.some(h => h.date.toISOString().split('T')[0] === dateStr);
                                const isToday = day === new Date().getDate() && new Date().getMonth() === 1; // Feb

                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "aspect-square rounded-2xl border border-border/50 p-2 transition-all cursor-pointer group hover:border-primary/50",
                                            isToday ? "bg-primary/5 border-primary shadow-inner" : "hover:bg-white/50",
                                            !hasEntry && day < new Date().getDate() ? "opacity-40" : ""
                                        )}
                                    >
                                        <span className={cn("text-sm font-medium", isToday ? "text-primary" : "text-muted-foreground")}>{day}</span>
                                        {hasEntry && (
                                            <div className="mt-auto flex justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-200" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border/50">
                                    <th className="py-4 font-semibold text-sm">Date</th>
                                    <th className="py-4 font-semibold text-sm">Status</th>
                                    <th className="py-4 font-semibold text-sm">In</th>
                                    <th className="py-4 font-semibold text-sm">Out</th>
                                    <th className="py-4 font-semibold text-sm">Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((record) => (
                                    <tr key={record.id} className="border-b border-border/20 last:border-0 hover:bg-white/30 transition-colors">
                                        <td className="py-4 text-sm font-medium">
                                            {record.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 text-sm">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-bold tracking-tight",
                                                record.status === 'PRESENT' ? "bg-green-100 text-green-700" :
                                                    record.status === 'LATE' ? "bg-orange-100 text-orange-700" :
                                                        record.status === 'ABSENT' ? "bg-red-100 text-red-700" :
                                                            "bg-blue-100 text-blue-700"
                                            )}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm text-muted-foreground">
                                            {record.checkIn ? record.checkIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--"}
                                        </td>
                                        <td className="py-4 text-sm text-muted-foreground">
                                            {record.checkOut ? record.checkOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--"}
                                        </td>
                                        <td className="py-4 text-sm font-bold italic">
                                            {record.hours ? `${record.hours.toFixed(1)}h` : "--"}
                                        </td>
                                    </tr>
                                ))}
                                {history.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-muted-foreground italic">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
