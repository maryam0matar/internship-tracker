"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTask } from "@/app/tasks/actions";

interface CreateTaskModalProps {
    open: boolean;
    onClose: () => void;
    defaultStatus?: string;
}

export function CreateTaskModal({ open, onClose, defaultStatus = "TODO" }: CreateTaskModalProps) {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            formData.set("status", defaultStatus);
            await createTask(formData);
            formRef.current?.reset();
            onClose();
        } catch (error) {
            console.error("Failed to create task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold tracking-tight">Create New Task</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            required
                            placeholder="e.g. Draft final report"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                                Priority
                            </label>
                            <select
                                name="priority"
                                defaultValue="MEDIUM"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                                Due Date
                            </label>
                            <input
                                name="dueDate"
                                type="date"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all",
                                loading
                                    ? "bg-primary/50 cursor-not-allowed"
                                    : "bg-primary hover:opacity-90 shadow-md hover:shadow-lg"
                            )}
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
