import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, AlertTriangle, Activity, User, Loader2, Home, Droplet, Thermometer, Lightbulb } from "lucide-react"; // Import new icons
import { useQuery } from "@tanstack/react-query";
import { fetchHealthScreeningData } from "@/utils/csvUtils";

export default function HealthScreening() {
  console.log('HealthScreening component rendered');
  const { data: healthData, isLoading, error } = useQuery({
    queryKey: ['healthScreeningData'],
    queryFn: fetchHealthScreeningData,
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-red-600" />
            <span className="text-lg text-gray-600">Loading health screening data...</span>
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

  if (!healthData) return null;

  const attendanceRate = healthData.totalResidents > 0
    ? Math.round((healthData.attended / healthData.totalResidents) * 100)
    : 0;

  const formatNumber = (num: number | string | undefined): string =>
    (typeof num === 'number' && !isNaN(num)) ? String(num) : 'N/A';

  const formatFullDateRange = (startDateStr: string, endDateStr: string): string => {
    if (!startDateStr || startDateStr === 'N/A' || !endDateStr || endDateStr === 'N/A') {
      return 'N/A';
    }

    try {
      const [startDay, startMonth, startYear] = startDateStr.split('/').map(Number);
      const [endDay, endMonth, endYear] = endDateStr.split('/').map(Number);

      const startDate = new Date(startYear, startMonth - 1, startDay);
      const endDate = new Date(endYear, endMonth - 1, endDay);

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };

      const formattedStartDate = startDate.toLocaleDateString('id-ID', options);
      const formattedEndDate = endDate.toLocaleDateString('id-ID', options);

      return `${formattedStartDate} - ${formattedEndDate}`;
    } catch (e) {
      console.error("Error formatting program date:", e);
      return `${startDateStr} - ${endDateStr}`;
    }
  };

  const healthPhotos = [
    { id: 1, title: "Pemeriksaan Tensi", url: "/image/health_1.jpg" },
    { id: 2, title: "Konsultasi Kesehatan", url: "/image/health_2.jpg" },
    { id: 3, title: "Pemeriksaan Kesehatan", url: "/image/health_3.jpg" },
    { id: 4, title: "Pemeriksaan Asam Urat", url: "/image/health_4.jpg" },
    { id: 5, title: "Kondisi Acara", url: "/image/health_5.jpg" },
    { id: 6, title: "Video Kumpulan Kegiatan", url: "/image/health_7.mp4", type: "video" as const }
  ];


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Pemeriksaan Kesehatan</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Penduduk"
            value={formatNumber(healthData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Total Kehadiran"
            value={formatNumber(healthData.attended)}
            subtitle={`${formatNumber(attendanceRate)}% Tingkat partisipasi`}
            icon={<Activity className="h-6 w-6" />}
            gradient="from-teal-500 to-teal-600"
          />

          <DataCard
            title="Pemeriksaan Door to Door"
            value={formatNumber(healthData.doorToDoorAttendance)}
            subtitle="Kunjungan Warga door-to-door"
            icon={<Home className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Rata-Rata Usia"
            value={`${formatNumber(healthData.averageAge)} tahun`}
            subtitle="Populasi penduduk"
            icon={<User className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Keluhan Umum"
            value={healthData.mostCommonComplaint ? healthData.mostCommonComplaint.split(' ')[0] : 'N/A'}
            subtitle={healthData.mostCommonComplaint || 'No data available'}
            icon={<AlertTriangle className="h-6 w-6" />}
            gradient="from-orange-500 to-orange-600"
          />
          
          <DataCard
            title="Gula Darah Tinggi"
            value={formatNumber(healthData.highBloodSugar)}
            subtitle={`Tertinggi: ${formatNumber(healthData.highestBloodSugar)} mg/dL`}
            gradient="from-red-500 to-red-600"
          />

          <DataCard
            title="Asam Urat Tinggi"
            value={formatNumber(healthData.highUricAcid)}
            subtitle={`Tertinggi: ${formatNumber(healthData.highestUricAcid)} mg/dL`}
            gradient="from-yellow-500 to-yellow-600"
          />

          <DataCard
            title="Tekanan Darah Tinggi"
            value={formatNumber(healthData.highBloodPressure)}
            subtitle={`Tertinggi: ${healthData.highestBloodPressure || 'N/A'} mmHg`}
            gradient="from-red-600 to-red-700"
          />
        </div>

        {/* New row for average values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DataCard
            title="Rata-Rata Gula Darah"
            value={`${formatNumber(healthData.averageBloodSugar)} mg/dL`}
            icon={<Droplet className="h-6 w-6" />}
            gradient="from-blue-400 to-blue-500"
          />
          <DataCard
            title="Rata-Rata Asam Urat"
            value={`${formatNumber(healthData.averageUricAcid)} mg/dL`}
            icon={<Thermometer className="h-6 w-6" />}
            gradient="from-green-400 to-green-500"
          />
          <DataCard
            title="Rata-Rata Tekanan Darah"
            value={`${healthData.averageBloodPressure || 'N/A'} mmHg`}
            icon={<Heart className="h-6 w-6" />}
            gradient="from-purple-400 to-purple-500"
          />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Masalah Kesehatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <span className="font-medium text-gray-700">Tekanan Darah Tinggi</span>
                  <span className="font-bold text-red-600">{formatNumber(healthData.highBloodPressure)} penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <span className="font-medium text-gray-700">Gula Darah Tinggi</span>
                  <span className="font-bold text-yellow-600">{formatNumber(healthData.highBloodSugar)} penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <span className="font-medium text-gray-700">Asam Urat Tinggi</span>
                  <span className="font-bold text-orange-600">{formatNumber(healthData.highUricAcid)} penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <span className="font-medium text-gray-700">Tekanan Darah Rendah</span>
                  <span className="font-bold text-blue-600">{formatNumber(healthData.lowBloodPressure)} penduduk</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Ringkasan Pemeriksaan Kesehatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-2 mt-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">Tanggal Pelaksanaan</div>
                  <div className="text-base text-gray-700">{formatFullDateRange(healthData.programDateSta, healthData.programDateEnd)}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{formatNumber(attendanceRate)}%</div>
                  <div className="text-gray-700">Tingkat Kehadiran</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(healthData.attended)}</div>
                    <div className="text-sm text-gray-600">Diperiksa</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(healthData.totalResidents - healthData.attended)}</div>
                    <div className="text-sm text-gray-600">Menunggu</div>
                  </div>
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
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Logistik / tempat pembelian barang yang jauh dari lokasi KKN</span>
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
                  <span>Mencatat hasil pemeriksaan di buku terlebih dahulu sebelum diunggah ke internet</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>ALat dan barang dibeli sebelum penerjunan KKN</span>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
        <PhotoGallery 
            photos={healthPhotos} 
            title="Health Screening Photo Gallery" 
            iconColor="text-red-600" 
          />
      </div>
    </DashboardLayout>
  );
}
