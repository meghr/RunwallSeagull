"use client";

import {
    Building2,
    Bell,
    Calendar,
    CheckCircle2,
    Home
} from "lucide-react";

interface DashboardStatsProps {
    building: string | null;
    flatNumber: string | null;
    newNoticesCount: number;
    upcomingEventsCount: number;
    myRegistrationsCount: number;
    userType: string;
}

export function DashboardStats({
    building,
    flatNumber,
    newNoticesCount,
    upcomingEventsCount,
    myRegistrationsCount,
    userType,
}: DashboardStatsProps) {
    const stats = [
        {
            label: "My Unit",
            value: building && flatNumber ? `${building} - ${flatNumber}` : "Not Assigned",
            subValue: userType,
            icon: Home,
            color: "from-sky-500 to-blue-500",
            bgColor: "bg-sky-500/10",
        },
        {
            label: "New Notices",
            value: newNoticesCount,
            subValue: "Last 7 days",
            icon: Bell,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500/10",
        },
        {
            label: "Upcoming Events",
            value: upcomingEventsCount,
            subValue: "Available to join",
            icon: Calendar,
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-500/10",
        },
        {
            label: "My Registrations",
            value: myRegistrationsCount,
            subValue: "Upcoming events",
            icon: CheckCircle2,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-500/10",
        },
    ];

    return (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur transition-all hover:bg-white/10 hover:border-white/20"
                >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                    <div className="relative z-10">
                        <div className="flex items-center md:block gap-4 md:gap-0">
                            {/* Icon */}
                            <div className={`inline-flex rounded-lg ${stat.bgColor} p-2 md:p-3 mb-0 md:mb-4 shrink-0`}>
                                <stat.icon className={`h-5 w-5 md:h-6 md:w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                            </div>

                            <div className="min-w-0">
                                {/* Label */}
                                <h3 className="text-xs md:text-sm font-medium text-slate-400 mb-0.5 md:mb-2">
                                    {stat.label}
                                </h3>

                                {/* Value */}
                                <div className="text-xl md:text-2xl font-bold text-white mb-0 md:mb-1 truncate">
                                    {stat.value}
                                </div>
                            </div>
                        </div>

                        {/* Sub value - hidden on small mobile to keep it super compact or moved below */}
                        <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                            {stat.subValue}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
