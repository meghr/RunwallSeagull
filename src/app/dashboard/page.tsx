import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                            Dashboard
                        </h1>
                        <p className="text-slate-400 mt-1">Welcome back, {session?.user?.name}</p>
                    </div>
                    <form action={logout}>
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                            Sign Out
                        </Button>
                    </form>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <h3 className="text-sm font-medium text-slate-400">My Unit</h3>
                        <div className="mt-2 text-2xl font-bold">
                            {session?.user?.buildingId ? "Assigned" : "Pending"}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <h3 className="text-sm font-medium text-slate-400">Notices</h3>
                        <div className="mt-2 text-2xl font-bold">0 New</div>
                    </div>

                    <a href="/dashboard/profile" className="block rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition-colors group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-sm font-medium text-slate-400 relative z-10">My Profile</h3>
                        <div className="mt-2 text-lg font-semibold relative z-10 flex items-center gap-2 text-white">
                            Update Details &rarr;
                        </div>
                    </a>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center text-slate-500">
                    <p>More features coming in Phase 4...</p>
                </div>
            </div>
        </div>
    );
}
