import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, Loader2, AlertTriangle, Lightbulb } from "lucide-react";
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
    { id: 1, title: "Pemasangan Nomor Rumah", url: "/image/house_1.jpg" },
    { id: 2, title: "Kondisi Rumah Warga", url: "/image/house_2.jpg" },
    { id: 3, title: "Proses Pemasangan", url: "/image/house_3.jpg" },
    { id: 4, title: "Partisipasi Warga", url: "/image/house_4.jpg" },
    { id: 5, title: "Sosialisasi", url: "/image/umkm_3.jpg" },
    { id: 6, title: "Kumpulan Video Kegiatan", url: "/image/house_6.mp4", type: "video" as const }
  ];

  const attendanceRate = houseData.totalResidents > 0
    ? Math.round((houseData.totalFamilyHead / houseData.totalResidents) * 100)
    : 0;

  const averagePerHouse = houseData.totalHouses > 0
    ? (houseData.totalResidents / houseData.totalHouses).toFixed(1)
    : 'N/A';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Home className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Sosialisasi Penomoran Rumah</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Jumlah Penduduk"
            value={formatNumber(houseData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Total Kehadiran"
            value={formatNumber(houseData.totalFamilyHead)}
            subtitle={`${formatNumber(attendanceRate)}% Tingkat partisipasi`}
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Tingkat Kepuasan"
            value={`100%`}
            subtitle="Kepuasan keseluruhan"
            icon={<Home className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />

          <DataCard
            title="Tanggal Program"
            value={formatDate(houseData.programDate)}
            subtitle="Tanggal Pelaksaan"
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-green-600" />
                <span>Ringkasan Kondisi Rumah</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Rata-rata per rumah:</span>
                  <span className="text-gray-900">{averagePerHouse} penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total kepala keluarga:</span>
                  <span className="text-gray-900">{houseData.totalFamilyHead} kepala keluarga</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Cakupan:</span>
                  <span className="text-gray-900">RT 01 & RT 02 Dusun Sumur</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Ringkasan Praktik Penomoran Rumah</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Cakupan:</span>
                  <span className="text-gray-900">RT 01 & RT 02 Dusun Sumur</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Jumlah rumah</span>
                  <span className="text-gray-900">{formatNumber(houseData.totalHouses)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="font-bold text-1xl text-teal-600">Selesai</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Kendala</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Komunikasi yang sulit dijalankan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Keterbatasan infrastruktur yaitu sinyal internet</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <span>Solusi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Meminta pertolongan Ibu Kasun untuk menyebarkan informasi terkait tanggal acara diadakan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Slide presentasi diunduh sebelum sosialisasi diadakan.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <PhotoGallery 
          photos={housePhotos} 
          title="Kumpulan Foto dan Video Acara" 
          iconColor="text-green-600" 
        />
      </div>
    </DashboardLayout>
  );
}
