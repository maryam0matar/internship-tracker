"use client";

import { useState } from "react";
import {
    Download,
    Save,
    Plus,
    Calendar,
    Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Attendance, Task } from "@prisma/client";

interface ReportsContentProps {
    attendance: Attendance[];
    tasks: Task[];
}

export function ReportsContent({ attendance, tasks }: ReportsContentProps) {
    const [activeStep, setActiveStep] = useState(1);

    const totalHours = attendance.reduce((acc, curr) => acc + (curr.hours || 0), 0);
    const completedTasks = tasks.filter(t => t.status === "DONE");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                    <p className="text-muted-foreground mt-1">Generate and export your weekly or final university reports.</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-white transition-colors">
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </button>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl flex items-center text-sm font-bold shadow-lg hover:opacity-90 transition-opacity">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </button>
                </div>
            </header>

            <div className="flex gap-4 p-1 glass bg-muted/50 rounded-2xl w-fit">
                {[1, 2, 3].map(step => (
                    <button
                        key={step}
                        onClick={() => setActiveStep(step)}
                        className={cn(
                            "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                            activeStep === step ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        STEP {step}: {step === 1 ? "Setup" : step === 2 ? "Review Content" : "Finalize"}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-10 rounded-[2.5rem] border border-border/50 bg-white min-h-[800px] shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
                            <div>
                                <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1">Internship Weekly Report</h1>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Active Semester 2026</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold tracking-tight">Student: Mariam Matar</p>
                                <p className="text-[10px] text-muted-foreground mt-1">Status: Regular</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <section className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">01. Overview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Reporting Period</p>
                                        <p className="text-sm font-medium italic">Latest Records</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Hours Logged</p>
                                        <p className="text-sm font-medium italic">{totalHours.toFixed(1)} Hours</p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">02. Completed Tasks</h3>
                                <div className="space-y-3">
                                    {completedTasks.length > 0 ? (
                                        completedTasks.map((task, i) => (
                                            <div key={task.id} className="flex gap-4 group">
                                                <span className="text-xs font-black text-primary/30 mt-1">0{i + 1}</span>
                                                <div className="flex-1 p-4 rounded-2xl border border-dashed border-border group-hover:bg-slate-50 transition-colors cursor-text">
                                                    <p className="text-sm italic leading-relaxed">{task.title}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic p-4 text-center border-2 border-dashed rounded-2xl">No completed tasks this period.</p>
                                    )}
                                    <button className="w-full py-4 rounded-2xl border border-dashed border-border flex items-center justify-center text-xs font-bold text-muted-foreground hover:bg-slate-50 transition-all">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Manual Task to Report
                                    </button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">03. Key Learnings</h3>
                                <textarea
                                    className="w-full p-6 rounded-[2rem] border border-border bg-slate-50 min-h-[150px] text-sm italic leading-relaxed focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                    placeholder="What were your main takeaways this week?"
                                    defaultValue="I successfully implemented real-time database tracking for the internship platform, enabling live attendance logging and task management."
                                />
                            </section>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-30">
                            Internship Tracker • Confidential
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] border border-border/50 space-y-6 shadow-sm">
                        <h4 className="font-black italic text-lg mb-2">Report Config</h4>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Report Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="p-3 rounded-xl border border-primary bg-primary/5 text-xs font-bold text-primary">Weekly</button>
                                    <button className="p-3 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-accent">Final</button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date Range</label>
                                <button className="w-full p-4 rounded-2xl border border-border flex justify-between items-center text-sm font-medium hover:bg-slate-50 transition-colors">
                                    <span className="italic">All Data</span>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="pt-6 border-t border-border/30 space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Include in Report</label>
                                {[
                                    { label: "Attendance Summary", checked: true },
                                    { label: "Tasks & Progress", checked: true },
                                    { label: "Evidence Appendix", checked: false },
                                    { label: "Reflections", checked: true },
                                ].map(opt => (
                                    <div key={opt.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground italic">{opt.label}</span>
                                        <div className={cn(
                                            "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                                            opt.checked ? "bg-primary border-primary" : "border-border"
                                        )}>
                                            {opt.checked && <div className="w-2 h-2 rounded-full bg-white transition-all scale-100" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 space-y-4 shadow-inner">
                        <div className="flex items-center gap-3 mb-2">
                            <Layers className="h-5 w-5 text-primary" />
                            <h4 className="font-black italic text-lg text-primary">Auto-Sync</h4>
                        </div>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                            All your logged hours and completed tasks from the selected date range are automatically synchronized into this report draft.
                        </p>
                        <button className="w-full py-4 rounded-2xl bg-white border border-primary/20 text-xs font-bold text-primary hover:shadow-md transition-all uppercase tracking-widest">
                            Force Sync Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
