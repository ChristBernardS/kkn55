
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Mobile header with sidebar trigger */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm">
          <SidebarTrigger className="h-8 w-8" />
          <h1 className="ml-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Resident Insights
          </h1>
        </header>

        <AppSidebar />
        
        <main className="flex-1 p-6 md:p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
