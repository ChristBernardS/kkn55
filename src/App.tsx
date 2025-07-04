import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import MovieScreening from "./pages/MovieScreening";
import HealthScreening from "./pages/HealthScreening";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import ArtEvent from "./pages/ArtEvent";
import { Users, BarChart3, Calendar, Settings, Palette } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/movie-screening" element={<MovieScreening />} />
          <Route path="/health-screening" element={<HealthScreening />} />
          <Route path="/art-event" element={<ArtEvent />} />
          <Route 
            path="/data-1" 
            element={
              <PlaceholderPage 
                title="Upcoming Dataset 1" 
                description="This dataset will contain additional resident information and metrics that will be integrated into the dashboard soon."
                icon={<Users className="h-8 w-8 text-blue-600" />}
              />
            } 
          />
          <Route 
            path="/data-2" 
            element={
              <PlaceholderPage 
                title="Upcoming Dataset 2" 
                description="Analytics and reporting data will be available here to provide deeper insights into resident activities and preferences."
                icon={<BarChart3 className="h-8 w-8 text-green-600" />}
              />
            } 
          />
          <Route 
            path="/data-3" 
            element={
              <PlaceholderPage 
                title="Upcoming Dataset 3" 
                description="Calendar and scheduling information will be displayed here to help track upcoming events and activities."
                icon={<Calendar className="h-8 w-8 text-purple-600" />}
              />
            } 
          />
          <Route 
            path="/data-4" 
            element={
              <PlaceholderPage 
                title="Upcoming Dataset 4" 
                description="Configuration and settings data will be managed through this interface for system administration."
                icon={<Settings className="h-8 w-8 text-orange-600" />}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;