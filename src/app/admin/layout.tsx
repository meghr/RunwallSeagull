import { AdminSidebar, AdminMobileHeader } from "@/components/admin/admin-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Protect admin routes
    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Desktop Sidebar - Hidden on mobile */}
            <AdminSidebar />

            {/* Mobile Header with Hamburger - Hidden on desktop */}
            <AdminMobileHeader />

            {/* Main Content Area */}
            {/* pt-14: height of mobile header on mobile */}
            {/* lg:pt-0: no top padding on desktop */}
            {/* lg:pl-64: left padding for desktop sidebar */}
            <div className="pt-14 lg:pt-0 lg:pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
