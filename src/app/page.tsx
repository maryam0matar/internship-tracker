import { prisma } from "@/lib/prisma";
import {
  Users,
  Clock,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AttendanceContent } from "@/components/attendance/attendance-content";
import { Attendance, Task } from "@prisma/client";

export const dynamic = "force-dynamic";

// Temporary fixed user ID for the demo/early functional phase
const DUMMY_USER_ID = "cl_user_123";

export default async function Dashboard() {
  const totalHours = await prisma.attendance.aggregate({
    where: { userId: DUMMY_USER_ID },
    _sum: { hours: true }
  });

  const completedTasks = await prisma.task.count({
    where: { userId: DUMMY_USER_ID, status: "DONE" }
  });

  const totalEntries = await prisma.attendance.count({
    where: { userId: DUMMY_USER_ID }
  });

  const attendanceRate = totalEntries > 0 ? "100%" : "0%"; // Basic logic for now

  const stats = [
    { label: "Total Hours", value: totalHours._sum.hours?.toFixed(1) || "0", icon: Clock, trend: "+0h this week" },
    { label: "Tasks Completed", value: completedTasks.toString(), icon: CheckCircle2, trend: "+0 today" },
    { label: "Attendance Rate", value: attendanceRate, icon: Users, trend: "Status: Active" },
    { label: "Reports Generated", value: "0", icon: BarChart3, trend: "Next due soon" },
  ];

  const recentActivity = await prisma.attendance.findMany({
    where: { userId: DUMMY_USER_ID },
    orderBy: { date: 'desc' },
    take: 5
  });

  const upcomingTasks = await prisma.task.findMany({
    where: { userId: DUMMY_USER_ID, status: { not: "DONE" } },
    orderBy: { dueDate: 'asc' },
    take: 3
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard v4</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Mariam. Here's your internship overview.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-2xl group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/5 rounded-xl text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-2xl h-[400px] overflow-y-auto">
          <h4 className="text-lg font-semibold mb-6">Recent Activity</h4>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity: Attendance) => (
                <div key={activity.id} className="flex items-center p-4 rounded-xl border border-border/50 bg-white/30">
                  <div className="p-2 bg-green-50 rounded-lg mr-4">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Checked in on {activity.date.toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">{activity.hours?.toFixed(1) || 0} hours logged</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              <p>No recent activity. Start by checking in!</p>
            </div>
          )}
        </div>
        <div className="glass p-8 rounded-2xl h-[400px] overflow-y-auto">
          <h4 className="text-lg font-semibold mb-6">Upcoming Deadlines</h4>
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task: Task) => (
                <div key={task.id} className="flex items-center p-3 rounded-xl border border-border/50 hover:bg-white/50 transition-colors cursor-pointer">
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-4",
                    task.priority === "HIGH" ? "bg-red-500" : "bg-orange-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.dueDate ? `Due ${task.dueDate.toLocaleDateString()}` : "No deadline"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic text-center py-10">No upcoming deadlines.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
