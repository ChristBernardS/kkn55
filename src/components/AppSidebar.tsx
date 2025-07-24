import { 
  Film, 
  HeartPulse,
  Home,
  ShoppingBag,
  UserCheck
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Cinema", url: "/movie-screening", icon: Film },
  { title: "Health Screening", url: "/health-screening", icon: HeartPulse },
  { title: "UMKM", url: "/art-event", icon: ShoppingBag },
  { title: "House Numbering", url: "/house-numbering", icon: Home },
  { title: "Members", url: "/members", icon: UserCheck }
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium shadow-lg" 
      : "hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200";

  return (
    <Sidebar className="w-64 border-r border-gray-200 bg-white shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Resident Insights
        </h2>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 text-sm font-medium mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
