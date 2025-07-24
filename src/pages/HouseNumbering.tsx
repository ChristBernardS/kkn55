import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHouseNumberingData } from "@/utils/csvUtils";

export default function HouseNumbering() {
  const { data: houseData, isLoading, error } = useQuery({
    queryKey: ['houseNumberingData'],
    queryFn: fetchHouseNumberingData,
    refetchInterval: 5 * 60 * 1000, 
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            <span className="text-lg text-gray-600">Loading house numbering data...</span>
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

  if (!houseData) return null;

  const formatNumber = (num: number | string | undefined): string => {
    if (typeof num === 'number' && !isNaN(num)) {
      return String(num);
    }
    if (typeof num === 'string' && num.trim() !== '' && num.trim() !== 'N/A') {
        return num;
    }
    return 'N/A';
  };

  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    try {
      const parts = dateStr.split('/');
      let date: Date;

      if (parts.length === 3) {
        date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      } else {
        date = new Date(dateStr);
      }

      if (isNaN(date.getTime())) {
        return dateStr;
      }
      return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateStr;
    }
  };

  const housePhotos = [
    { id: 1, title: "House Number Installation", url: "/image/house_1.jpg" },
    { id: 2, title: "Village Street View", url: "/image/house_2.jpg" },
    { id: 3, title: "Installation Process", url: "/image/house_3.jpg" },
    { id: 4, title: "Community Participation", url: "/image/house_4.jpg" },
    { id: 5, title: "Numbered Houses", url: "/image/house_5.jpg" },
    { id: 6, title: "Completed Project", url: "/image/house_6.mp4", type: "video" as const }
  ];

  const averagePerHouse = houseData.totalHouses > 0
    ? (houseData.totalResidents / houseData.totalHouses).toFixed(1)
    : 'N/A';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Home className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Village House Numbering Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Residents"
            value={formatNumber(houseData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Head of Family"
            value={formatNumber(houseData.totalFamilyHead)}
            subtitle="Family heads registered"
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Total Houses"
            value={formatNumber(houseData.totalHouses)}
            subtitle="Houses numbered"
            icon={<Home className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />

          <DataCard
            title="Program Date"
            value={formatDate(houseData.programDate)}
            subtitle="Implementation date"
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-green-600" />
                <span>Program Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Average per House:</span>
                  <span className="text-gray-900">{averagePerHouse} residents</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Coverage:</span>
                  <span className="text-gray-900">100% of village houses</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Program Status:</span>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Demographics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Population</span>
                  <span className="font-bold text-2xl text-blue-600">{formatNumber(houseData.totalResidents)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Families: {formatNumber(houseData.totalFamilyHead)}</span>
                  <span>Houses: {formatNumber(houseData.totalHouses)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <PhotoGallery 
          photos={housePhotos} 
          title="House Numbering Project Gallery" 
          iconColor="text-green-600" 
        />
      </div>
    </DashboardLayout>
  );
}
