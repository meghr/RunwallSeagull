import { getPendingUsers } from "@/lib/actions/admin";
import { UserActions } from "@/components/admin/user-actions";
import { formatDate } from "@/lib/utils/index";

export default async function PendingUsersPage() {
    const { data: users, error } = await getPendingUsers();

    if (error) {
        return <div className="text-red-400 p-4">Error loading users: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Pending User Approvals</h1>
                <span className="px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full text-sm border border-sky-500/20">
                    {users?.length || 0} Pending
                </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/50 backdrop-blur overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="bg-white/5 text-slate-200 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Unit</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Registered</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {!users || users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No pending users found. all caught up!
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium text-base">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-300">
                                                {user.building?.name || "N/A"}
                                            </div>
                                            <div className="text-xs">Flat {user.flat?.flatNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                                {user.userType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end">
                                                <UserActions userId={user.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
