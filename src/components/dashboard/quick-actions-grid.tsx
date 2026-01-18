"use client";

import Link from "next/link";
import {
    Bell,
    Calendar,
    Users,
    Car,
    ShoppingBag,
    MessageSquare,
    ArrowRight,
} from "lucide-react";

const quickActions = [
    {
        title: "View Notices",
        description: "Check latest announcements",
        href: "/dashboard/notices",
        icon: Bell,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
    },
    {
        title: "Browse Events",
        description: "Discover upcoming activities",
        href: "/dashboard/events",
        icon: Calendar,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-500/10",
    },
    {
        title: "Neighbors",
        description: "Connect with residents",
        href: "/dashboard/neighbors",
        icon: Users,
        color: "from-sky-500 to-blue-500",
        bgColor: "bg-sky-500/10",
    },
    {
        title: "My Vehicles",
        description: "Manage registered vehicles",
        href: "/dashboard/vehicles",
        icon: Car,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        title: "Marketplace",
        description: "Buy, sell, or rent",
        href: "/dashboard/marketplace",
        icon: ShoppingBag,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
    },
    {
        title: "File Complaint",
        description: "Report an issue",
        href: "/dashboard/complaints/new",
        icon: MessageSquare,
        color: "from-rose-500 to-pink-500",
        bgColor: "bg-rose-500/10",
    },
];

export function QuickActionsGrid() {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {quickActions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className={`inline-flex rounded-lg ${action.bgColor} p-2 md:p-3 mb-2 md:mb-4`}>
                                <action.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex items-start justify-between gap-1 mb-1">
                                <h3 className="text-xs md:text-base font-semibold text-white group-hover:text-sky-400 transition-colors leading-tight">
                                    {action.title}
                                </h3>
                                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0" />
                            </div>

                            <p className="text-[10px] md:text-sm text-slate-400 line-clamp-1 md:line-clamp-none">
                                {action.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
