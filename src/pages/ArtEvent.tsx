import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, Star, Calendar, Loader2, Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtEventData } from "@/utils/csvUtils";
import { ArtSubDashboard } from "@/components/ArtSubDashboard";
import { ArtPhotoGallery } from "@/components/ArtPhotoGallery";

export default function ArtEvent() {
  const { data: artData, isLoading, error } = useQuery({
    queryKey: ['artEventData'],
    queryFn: fetchArtEventData,
    refetchInterval: 5 * 60 * 1000,
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

  const formatSingleDate = (dateStr: string | undefined): string => {
    if (!dateStr || dateStr === 'N/A') {
      return 'N/A';
    }
    
    try {
      const parts = dateStr.split('/');
      if (parts.length !== 3) {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
        }
        return dateStr;
      }

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) {
        console.error("Invalid date object created for:", dateStr);
        return dateStr;
      }

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };

      return date.toLocaleDateString('id-ID', options);
    } catch (e) {
      console.error("Error formatting single date:", e);
      return dateStr;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <ShoppingBag className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Sosialisasi UMKM</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Jumlah Penduduk"
            value={mainEvent.totalResidents}
            icon={<Users className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />
          
          <DataCard
            title="Jumlah Kehadiran"
            value={mainEvent.attendedEvent}
            subtitle={`${attendanceRate}% Tingkat Kehadiran`}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-pink-500 to-pink-600"
          />
          
          <DataCard
            title="Tingkat Kepuasan"
            value={`${mainEvent.satisfactionPercent}%`}
            subtitle="Kepuasan keseluruhan"
            icon={<Star className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Durasi acara"
            value={`${mainEvent.duration} menit`}
            subtitle="Jumlah waktu kegiatan"
            icon={<Clock className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />
        </div>

        {/* Event Details and Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Details Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>Rincian Kegiatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Judul Program:</span>
                  <span className="font-bold text-purple-900">{mainEvent.programTitle}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tanggal Pelaksanaan:</span>
                  <span className="font-bold text-blue-900">{formatSingleDate(mainEvent.eventDate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Durasi:</span>
                  <span className="font-bold text-green-900">{mainEvent.duration} minutes</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Lokasi:</span>
                  <span className="font-bold text-pink-900">Balai Dusun Sumur</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Summary Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Ringkasan Kegiatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">{attendanceRate}%</div>
                  <div className="text-sm text-purple-700">Tingkat Kehadiran</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-900">{mainEvent.attendedEvent}</div>
                    <div className="text-xs text-blue-700">Partisipasi</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-900">{mainEvent.satisfactionPercent}%</div>
                    <div className="text-xs text-green-700">Kepuasan</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                  <strong>Catatan:</strong> Acara ini berhasil melibatkan masyarakat dengan beragam wawasan kreatif, mencapai tingkat kepuasan yang tinggi di semua segmen program.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-purple-600" />
            <span>Program Kerja Individu</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {subEvents.map((subEvent, index) => (
              <ArtSubDashboard 
                key={index} 
                data={subEvent} 
                colorIndex={index}
              />
            ))}
          </div>

          </div>
        <ArtPhotoGallery />
      </div>
    </DashboardLayout>
  );
}
