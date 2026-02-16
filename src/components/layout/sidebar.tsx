"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    CheckSquare,
    FileText,
    Settings,
    LogOut,
    FolderOpen
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Evidence", href: "/evidence", icon: FolderOpen },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen border-r flex flex-col glass fixed left-0 top-0 z-40">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight">Internship Tracker v4</h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <div
                                className={cn(
                                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border/50">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Mariam</p>
                        <p className="text-xs text-muted-foreground truncate">Intern</p>
                    </div>
                    <LogOut className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </div>
            </div>
        </div>
    );
}
