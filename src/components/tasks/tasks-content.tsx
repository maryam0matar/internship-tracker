"use client";

import { cn } from "@/lib/utils";
import {
    Plus,
    MoreHorizontal,
    Clock,
    Tag
} from "lucide-react";
import { motion } from "framer-motion";
import { Task, TaskStatus } from "@prisma/client";
import { updateTaskStatus } from "@/app/tasks/actions";
import { useState } from "react";

const columns: { id: TaskStatus, title: string }[] = [
    { id: "TODO", title: "To Do" },
    { id: "IN_PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Completed" },
];

interface TasksContentProps {
    tasks: Task[];
}

export function TasksContent({ tasks: initialTasks }: TasksContentProps) {
    const [tasks, setTasks] = useState(initialTasks);

    const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        await updateTaskStatus(taskId, newStatus);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
                    <p className="text-muted-foreground mt-1">Manage your internship deliverables and milestones.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl flex items-center text-sm font-medium hover:opacity-90 shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col gap-4">
                        <div className="flex justify-between items-center px-1">
                            <h4 className="font-bold flex items-center">
                                {col.title}
                                <span className="ml-2 text-xs text-muted-foreground bg-muted w-5 h-5 rounded-full flex items-center justify-center">
                                    {tasks.filter(t => t.status === col.id).length}
                                </span>
                            </h4>
                            <button className="text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex-1 bg-slate-100/50 dark:bg-black/10 rounded-3xl p-4 border border-border/50 space-y-4 overflow-y-auto min-h-[500px]">
                            {tasks
                                .filter((t) => t.status === col.id)
                                .map((task) => (
                                    <motion.div
                                        layoutId={task.id}
                                        key={task.id}
                                        className="glass p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider border",
                                                task.priority === "HIGH" ? "bg-red-50 text-red-600 border-red-100" :
                                                    task.priority === "MEDIUM" ? "bg-orange-50 text-orange-600 border-orange-100" :
                                                        "bg-blue-50 text-blue-600 border-blue-100"
                                            )}>
                                                {task.priority}
                                            </span>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {col.id !== "DONE" && (
                                                    <button
                                                        onClick={() => handleStatusChange(task.id, col.id === "TODO" ? "IN_PROGRESS" : "DONE")}
                                                        className="text-[10px] bg-white border px-1.5 py-0.5 rounded-lg hover:bg-slate-50"
                                                    >
                                                        Next
                                                    </button>
                                                )}
                                                <button className="">
                                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                        </div>
                                        <h5 className="font-semibold text-sm leading-tight">{task.title}</h5>
                                        {task.description && (
                                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{task.description}</p>
                                        )}
                                        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-muted-foreground italic text-[10px]">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {task.dueDate ? `Due ${task.dueDate.toLocaleDateString()}` : "No deadline"}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            <button className="w-full py-2 rounded-xl text-xs font-semibold text-muted-foreground border border-dashed border-border hover:bg-white/50 hover:text-foreground transition-all flex items-center justify-center">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
