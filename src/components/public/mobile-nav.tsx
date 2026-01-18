"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";

interface MobileNavProps {
    className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close menu on navigation
    const handleNavClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={className}>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Overlay - z-60 to be above header z-50 */}
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
                        zIndex: 60,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }}
                    onClick={handleNavClick}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Drawer - z-70 to be above overlay z-60 and header z-50 */}
            <div
                className={`transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '180px',
                    maxWidth: '60vw',
                    zIndex: 70,
                    backgroundColor: 'rgb(15, 23, 42)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottomLeftRadius: '16px',
                    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Menu Header - Compact */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-sky-400" />
                        <span className="font-bold text-base text-white">Menu</span>
                    </div>
                    <button
                        onClick={handleNavClick}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation Links - Compact */}
                <nav className="flex flex-col px-3 py-2">
                    <Link
                        href="#notices"
                        onClick={handleNavClick}
                        className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                    >
                        Notices
                    </Link>
                    <Link
                        href="#events"
                        onClick={handleNavClick}
                        className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                    >
                        Events
                    </Link>
                    <Link
                        href="#features"
                        onClick={handleNavClick}
                        className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                    >
                        Features
                    </Link>
                    <Link
                        href="#about"
                        onClick={handleNavClick}
                        className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                    >
                        About
                    </Link>
                    <Link
                        href="#contact"
                        onClick={handleNavClick}
                        className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Divider */}
                <div className="mx-3 border-t border-white/10" />

                {/* Action Buttons - Compact, inline with nav */}
                <div className="px-3 py-3 space-y-2">
                    <Link href="/login" onClick={handleNavClick} className="block">
                        <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 h-10"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/register" onClick={handleNavClick} className="block">
                        <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white h-10">
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
