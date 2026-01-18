"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Building2,
    Bell,
    Calendar,
    ShoppingBag,
    AlertTriangle,
    BookOpen,
    LogOut,
    ShieldCheck,
    Menu,
    X
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Buildings", href: "/admin/buildings", icon: Building2 },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Notices", href: "/admin/notices", icon: Bell },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Marketplace", href: "/admin/marketplace", icon: ShoppingBag },
    { name: "Complaints", href: "/admin/complaints", icon: AlertTriangle },
    { name: "Yellow Pages", href: "/admin/yellow-pages", icon: BookOpen },
];

interface AdminSidebarContentProps {
    pathname: string;
    onNavClick?: () => void;
    compact?: boolean;
}

// Reusable sidebar content component
function AdminSidebarContent({ pathname, onNavClick, compact = false }: AdminSidebarContentProps) {
    return (
        <>
            {/* Logo Area */}
            <div className={cn(
                "flex items-center gap-3 border-b border-white/10",
                compact ? "px-4 py-3" : "p-6"
            )}>
                <div className={cn(
                    "rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20",
                    compact ? "h-8 w-8" : "h-10 w-10"
                )}>
                    <ShieldCheck className={cn(compact ? "h-5 w-5" : "h-6 w-6", "text-white")} />
                </div>
                <div>
                    <h1 className={cn(
                        "font-bold text-white tracking-tight",
                        compact ? "text-base" : "text-lg"
                    )}>
                        Admin Portal
                    </h1>
                    <p className="text-xs text-slate-400">Runwal Seagull</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className={cn(
                "flex-1 space-y-1 overflow-y-auto",
                compact ? "px-3 py-3" : "px-4 py-6"
            )}>
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onNavClick}
                            className={cn(
                                "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                                compact ? "px-3 py-2" : "px-3 py-2.5",
                                isActive
                                    ? "bg-red-500/10 text-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-red-500" : "text-slate-500 group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign Out Button */}
            <div className={cn(
                "border-t border-white/10",
                compact ? "p-3" : "p-4"
            )}>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className={cn(
                        "flex items-center gap-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all group",
                        compact ? "px-3 py-2" : "px-3 py-2.5"
                    )}
                >
                    <LogOut className="h-5 w-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                    Sign Out
                </button>
            </div>
        </>
    );
}

// Desktop Sidebar - Hidden on mobile, visible on lg+
export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex flex-col h-full bg-slate-900 border-r border-white/10 w-64 fixed left-0 top-0">
            <AdminSidebarContent pathname={pathname} />
        </div>
    );
}

// Mobile Admin Header with hamburger menu
export function AdminMobileHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleNavClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="lg:hidden">
            {/* Mobile Header Bar */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4 z-50">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-white text-sm">Admin Portal</span>
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="backdrop-blur-sm"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 55,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}
                    onClick={handleNavClick}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '200px',
                    maxWidth: '75vw',
                    height: '100vh',
                    zIndex: 60,
                    backgroundColor: 'rgb(15, 23, 42)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '10px 0 40px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Close button in drawer */}
                <div className="flex justify-end p-2 border-b border-white/10">
                    <button
                        onClick={handleNavClick}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <AdminSidebarContent
                    pathname={pathname}
                    onNavClick={handleNavClick}
                    compact={true}
                />
            </div>
        </div>
    );
}
