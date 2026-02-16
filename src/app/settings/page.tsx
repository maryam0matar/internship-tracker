"use client";

import { useState } from "react";
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Sparkles,
    Camera,
    Globe,
    Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [showBranding, setShowBranding] = useState(true);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-1">Manage your account preferences and application branding.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="space-y-1">
                    {[
                        { name: "Profile", icon: User },
                        { name: "Branding", icon: Sparkles },
                        { name: "Preferences", icon: Palette },
                        { name: "Notifications", icon: Bell },
                        { name: "Security", icon: Shield },
                    ].map(item => (
                        <button
                            key={item.name}
                            className={cn(
                                "w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                item.name === "Branding" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4 mr-3" />
                            {item.name}
                        </button>
                    ))}
                </aside>

                <div className="lg:col-span-3 space-y-6">
                    <div className="glass p-8 rounded-[2.5rem] border border-border/50 bg-white/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-primary/5 rounded-2xl">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black italic">University Branding</h4>
                                <p className="text-sm text-muted-foreground italic">Toggle university and authority logos in your reports and dashboard.</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white border border-border/50">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold italic">Show Logos</p>
                                    <p className="text-xs text-muted-foreground">Display Zayed University and DEWA logos.</p>
                                </div>
                                <button
                                    onClick={() => setShowBranding(!showBranding)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-all relative",
                                        showBranding ? "bg-primary shadow-lg shadow-primary/20" : "bg-muted shadow-inner"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                        showBranding ? "left-7" : "left-1"
                                    )} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-8 rounded-3xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Globe className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Zayed University</p>
                                </div>
                                <div className="p-8 rounded-3xl border border-dashed border-border bg-slate-50 flex flex-col items-center justify-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Globe className="h-6 w-6 text-slate-300" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">DEWA Authority</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <SettingsIcon className="h-4 w-4 text-indigo-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-tight">Premium Aesthetic Tip</p>
                                    <p className="text-xs text-indigo-700 leading-relaxed italic">Logos are automatically styled with a subtle blend mode to match the glassmorphic theme across all modules.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] border border-border/50 bg-white/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-500/10 rounded-2xl">
                                <User className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black italic">Profile Details</h4>
                                <p className="text-sm text-muted-foreground italic">Customize how you appear in your internship reports.</p>
                            </div>
                        </div>

                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <input type="text" defaultValue="Mariam Al-Maktoum" className="w-full p-4 rounded-2xl border border-border bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm italic font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Student ID</label>
                                <input type="text" defaultValue="202301045" className="w-full p-4 rounded-2xl border border-border bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm italic font-medium" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
