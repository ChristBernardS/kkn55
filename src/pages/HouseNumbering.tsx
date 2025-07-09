import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, Loader2, Camera } from "lucide-react"; // Hapus 'Image' dari sini
import { useQuery } from "@tanstack/react-query";
import { fetchHouseNumberingData } from "@/utils/csvUtils";

export default function HouseNumbering() {
  const { data: houseData, isLoading, error } = useQuery({
    queryKey: ['houseNumberingData'],
    queryFn: fetchHouseNumberingData,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
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

  // Helper function to format numbers or display 'N/A'
  const formatNumber = (num: number | string | undefined): string => {
    if (typeof num === 'number' && !isNaN(num)) {
      return String(num);
    }
    if (typeof num === 'string' && num.trim() !== '' && num.trim() !== 'N/A') {
        return num; // Untuk string seperti "Complete" atau tanggal
    }
    return 'N/A';
  };

  // Helper function to format date from CSV (e.g., "YYYY/MM/DD" or "DD/MM/YYYY")
  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    try {
      const parts = dateStr.split('/');
      let date: Date;

      if (parts.length === 3) {
        // Asumsi format CSV adalah DD/MM/YYYY karena umum di Indonesia
        date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        // Jika format CSV Anda YYYY/MM/DD, gunakan ini sebagai gantinya:
        // date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      } else {
        date = new Date(dateStr); // Coba parse langsung jika format standar
      }

      if (isNaN(date.getTime())) {
        return dateStr; // Kembali ke string asli jika parsing gagal
      }
      return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateStr;
    }
  };


  // Mock photo data for house numbering (Ganti dengan URL gambar Anda yang sebenarnya)
  // Pastikan gambar-gambar ini ada di folder public/image/ atau adalah URL eksternal
  const housePhotos = [
    { id: 1, title: "House Number Installation 1", url: "/image/house_num_1.jpg" }, // Contoh path lokal
    { id: 2, title: "Village Street View 1", url: "/image/house_num_2.jpg" },
    { id: 3, title: "Numbered Houses 1", url: "/image/house_num_3.jpg" },
    { id: 4, title: "Community Participation 1", url: "/image/house_num_4.jpg" },
    { id: 5, title: "Installation Process 1", url: "/image/house_num_5.jpg" },
    { id: 6, title: "Completed Project 1", url: "/image/house_num_6.jpg" }
    // Contoh URL eksternal (pastikan ini adalah direct link ke gambar)
    // { id: 7, title: "External Image", url: "https://example.com/your-image.jpg" }
  ];

  // Pastikan totalHouses tidak nol untuk menghindari pembagian dengan nol
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

        {/* Photo Gallery Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-green-600" />
              <span>House Numbering Project Gallery</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {housePhotos.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                    <div className="w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{photo.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Upload actual house numbering project photos to showcase the village development initiative.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}