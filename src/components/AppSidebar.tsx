import { useState } from "react";
import { 
  Film, 
  Heart, 
  Users, 
  BarChart3, 
  Calendar, 
  Settings, 
  Home,
  ChevronLeft,
  ChevronRight,
  Palette
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
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Cinema", url: "/movie-screening", icon: Film },
  { title: "Health Screening", url: "/health-screening", icon: Heart },
  { title: "Art Event", url: "/art-event", icon: Palette },
  { title: "Upcoming Data 1", url: "/data-1", icon: Users },
  { title: "Upcoming Data 2", url: "/data-2", icon: BarChart3 },
  { title: "Upcoming Data 3", url: "/data-3", icon: Calendar },
  { title: "Upcoming Data 4", url: "/data-4", icon: Settings },
];

export function AppSidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
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
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-gray-200 bg-white shadow-lg`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Resident Insights
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-gray-500 text-sm font-medium mb-2 ${collapsed ? "hidden" : ""}`}>
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
                      <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
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
