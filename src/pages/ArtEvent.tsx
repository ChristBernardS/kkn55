import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Users, Star, Calendar, Loader2, DollarSign, ShoppingBag, Camera } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtEventData } from "@/utils/csvUtils";
import { ArtSubDashboard } from "@/components/ArtSubDashboard";
import { ArtPhotoGallery } from "@/components/ArtPhotoGallery";

export default function ArtEvent() {
  const { data: artData, isLoading, error } = useQuery({
    queryKey: ['artEventData'],
    queryFn: fetchArtEventData,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            <span className="text-lg text-gray-600">Loading art event data...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-2">Error loading data</div>
            <div className="text-gray-600">Please check your internet connection and try again.</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!artData) return null;

  const { mainEvent, subEvents } = artData;
  const attendanceRate = Math.round((mainEvent.attendedEvent / mainEvent.totalResidents) * 100);
  const overallSuccessRate = Math.round((mainEvent.successfulParticipation / mainEvent.attendedEvent) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Palette className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Art Creation & Exhibition Dashboard</h1>
        </div>

        {/* Main Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Residents"
            value={mainEvent.totalResidents}
            icon={<Users className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />
          
          <DataCard
            title="Event Attendance"
            value={mainEvent.attendedEvent}
            subtitle={`${attendanceRate}% attendance rate`}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-pink-500 to-pink-600"
          />
          
          <DataCard
            title="Satisfaction Rate"
            value={`${mainEvent.satisfactionPercent}%`}
            subtitle="Overall satisfaction"
            icon={<Star className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />
          
          <DataCard
            title="Success Rate"
            value={`${overallSuccessRate}%`}
            subtitle="Successful participation"
            icon={<Palette className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />
        </div>

        {/* Sales Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DataCard
            title="Sales Revenue"
            value={`$${mainEvent.salesRevenue}`}
            subtitle="Total revenue generated"
            icon={<DollarSign className="h-6 w-6" />}
            gradient="from-emerald-500 to-emerald-600"
          />
          
          <DataCard
            title="Products Sold"
            value={mainEvent.productsSold}
            subtitle="Artworks purchased"
            icon={<ShoppingBag className="h-6 w-6" />}
            gradient="from-orange-500 to-orange-600"
          />

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-600" />
                <span>Event Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Program:</span>
                  <span className="font-medium text-gray-900">{mainEvent.programTitle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Date:</span>
                  <span className="font-medium text-gray-900">{mainEvent.eventDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Duration:</span>
                  <span className="font-medium text-gray-900">{mainEvent.duration} minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sub-Dashboards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Palette className="h-6 w-6 text-purple-600" />
            <span>Program Sub-Dashboards</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subEvents.map((subEvent, index) => (
              <ArtSubDashboard 
                key={index} 
                data={subEvent} 
                colorIndex={index}
              />
            ))}
          </div>
        </div>

        {/* Photo Gallery Section */}
        <ArtPhotoGallery />
      </div>
    </DashboardLayout>
  );
}
