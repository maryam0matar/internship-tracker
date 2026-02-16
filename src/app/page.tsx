import {
  Users,
  Clock,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
  Plus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Mariam. Here's your internship overview.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Hours", value: "124", icon: Clock, trend: "+12h this week" },
          { label: "Tasks Completed", value: "18", icon: CheckCircle2, trend: "+3 today" },
          { label: "Attendance Rate", value: "98%", icon: Users, trend: "-1% vs last month" },
          { label: "Reports Generated", value: "4", icon: BarChart3, trend: "Next due in 3 days" },
        ].map((stat) => (
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
        <div className="lg:col-span-2 glass p-8 rounded-2xl h-[400px]">
          <h4 className="text-lg font-semibold mb-6">Recent Activity</h4>
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <p>No recent activity. Start by checking in!</p>
          </div>
        </div>
        <div className="glass p-8 rounded-2xl h-[400px]">
          <h4 className="text-lg font-semibold mb-6">Upcoming Deadlines</h4>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 rounded-xl border border-border/50 hover:bg-white/50 transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Weekly Report W{i + 5}</p>
                  <p className="text-xs text-muted-foreground">Due in {i + 1} days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
