import { getUserProfile } from "@/lib/actions/user";
import { ProfileForm } from "@/components/dashboard/profile-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-xl text-red-400">Profile not found</h1>
                <p className="text-slate-500 mt-2">Please try logging in again.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                        My Profile
                    </h1>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto border-white/10 text-slate-300 hover:text-white hover:bg-white/5 py-4 sm:py-2">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                <ProfileForm user={user} />
            </div>
        </div>
    );
}
