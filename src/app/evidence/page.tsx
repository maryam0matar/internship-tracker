"use client";

import { useState } from "react";
import {
    Upload,
    File,
    X,
    Image as ImageIcon,
    FileText,
    Search,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EvidencePage() {
    const [files, setFiles] = useState([
        { id: "1", name: "Internship_Mentor_Email.pdf", type: "pdf", size: "2.4 MB", date: "Feb 12", source: "Email" },
        { id: "2", name: "Task_Completion_Screenshot.png", type: "image", size: "1.1 MB", date: "Feb 14", source: "Screenshot" },
        { id: "3", name: "University_Module_Guide.docx", type: "doc", size: "840 KB", date: "Feb 10", source: "Document" },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Evidence</h2>
                    <p className="text-muted-foreground mt-1">Upload and manage proof of your internship activities.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative group w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search evidence..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl flex items-center text-sm font-medium hover:opacity-90 shadow-md">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass rounded-3xl p-8 border border-border/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {files.map((file) => (
                                <div key={file.id} className="group relative glass bg-white/40 p-4 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center mb-4 overflow-hidden relative">
                                        {file.type === "image" ? (
                                            <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                                        ) : file.type === "pdf" ? (
                                            <FileText className="h-10 w-10 text-red-400/60" />
                                        ) : (
                                            <File className="h-10 w-10 text-blue-400/60" />
                                        )}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button className="p-2 rounded-full bg-white shadow-sm hover:scale-110 transition-transform">
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 rounded-full bg-white shadow-sm hover:scale-110 transition-transform text-red-500">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold truncate pr-6 italic">{file.name}</p>
                                        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                            <span>{file.size} • {file.date}</span>
                                            <span className="bg-muted px-1.5 py-0.5 rounded-md">{file.source}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass p-6 rounded-3xl border border-border/50 space-y-4">
                        <h4 className="font-bold">Summary</h4>
                        <div className="space-y-3">
                            {[
                                { label: "Total Files", count: 14, icon: File },
                                { label: "Screenshots", count: 8, icon: ImageIcon },
                                { label: "Documents", count: 6, icon: FileText },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center p-3 rounded-xl bg-white/50 border border-border/20">
                                    <div className="flex items-center text-sm font-medium">
                                        <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                                        {item.label}
                                    </div>
                                    <span className="font-bold italic">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-6 rounded-3xl border border-primary/20 bg-primary/5 space-y-4 shadow-inner">
                        <h4 className="font-bold text-primary">Quick Drop</h4>
                        <div className="aspect-square rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-white/50 transition-colors">
                            <Upload className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-xs font-bold text-primary/80">Drag & Drop files here</p>
                            <p className="text-[10px] text-muted-foreground mt-1 italic">JPG, PNG, PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
