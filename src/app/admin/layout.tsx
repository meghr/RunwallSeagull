import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
            <aside className="w-64 bg-slate-950 border-r border-white/10 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                        Seagull Admin
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                    <NavLink href="/admin/dashboard">Dashboard</NavLink>
                    <NavLink href="/admin/users">User Approvals</NavLink>
                    <NavLink href="/admin/notices">Notices</NavLink>
                    <NavLink href="/admin/events">Events</NavLink>
                    <NavLink href="/admin/buildings">Buildings & Flats</NavLink>
                </nav>
                <div className="p-4 border-t border-white/10 bg-slate-950">
                    <form action={logout}>
                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-slate-400 hover:text-white justify-start">
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>
            <main className="flex-1 ml-64 p-8 overflow-auto bg-slate-900">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center px-4 py-3 rounded-md text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
            {children}
        </Link>
    );
}
