// MovieScreening.tsx

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Users, Star, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieScreeningData } from "@/utils/csvUtils";

export default function MovieScreening() {
  console.log('MovieScreening component rendered');
  const { data: movieData, isLoading, error } = useQuery({
    queryKey: ['movieScreeningData'],
    queryFn: fetchMovieScreeningData,
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) {
    console.log('Loading movie screening data...');
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">Loading movie screening data...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    console.error('Error loading movie screening data:', error);
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

  if (!movieData) {
    console.log('No movie data available');
    return null
  };

  console.log('Movie data loaded:', movieData);

  // Pastikan totalResidents tidak nol untuk menghindari NaN pada pembagian
  const attendanceRate = movieData.totalResidents > 0 
    ? Math.round((movieData.attendedEvent / movieData.totalResidents) * 100) 
    : 0; // Jika totalResidents 0, attendanceRate adalah 0%

  // Fungsi pembantu untuk menangani NaN saat menampilkan angka
  const formatNumber = (num: number | string | undefined): string => 
    (typeof num === 'number' && !isNaN(num)) ? String(num) : 'N/A';

  // Fungsi helper baru untuk memformat tanggal menjadi "Hari, tanggal bulan"
  const formatSingleDate = (dateStr: string | undefined): string => {
    if (!dateStr || dateStr === 'N/A') {
      return 'N/A';
    }
    
    try {
      // Memecah tanggal (misal: "04/07/2025") menjadi bagian-bagian
      const parts = dateStr.split('/');
      if (parts.length !== 3) {
        // Jika format tidak sesuai DD/MM/YYYY, coba parsing langsung atau kembalikan string asli
        const date = new Date(dateStr); // Coba parse langsung jika format berbeda
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
        }
        return dateStr; // Kembalikan string asli jika parsing gagal
      }

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10); // Bulan di JavaScript 0-indexed
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) { // Memeriksa apakah objek Date valid
        console.error("Invalid date object created for:", dateStr);
        return dateStr; // Kembalikan string asli jika objek Date tidak valid
      }

      // Opsi untuk format tanggal: "Hari, tanggal bulan"
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };

      return date.toLocaleDateString('id-ID', options); // 'id-ID' untuk Bahasa Indonesia
    } catch (e) {
      console.error("Error formatting single date:", e);
      return dateStr; // Kembalikan string asli jika ada error
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Film className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cinema Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Residents"
            value={formatNumber(movieData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />
          
          <DataCard
            title="Event Attendance"
            value={formatNumber(movieData.attendedEvent)}
            subtitle={`${formatNumber(attendanceRate)}% attendance rate`}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-teal-500 to-teal-600"
          />
          
          <DataCard
            title="Satisfaction Rate"
            value={`${formatNumber(movieData.satisfactionPercent)}%`}
            subtitle="Overall satisfaction"
            icon={<Star className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />
          
          <DataCard
            title="Featured Movie"
            value={movieData.movieTitle ? movieData.movieTitle.split(' ').slice(0, 2).join(' ') : 'N/A'}
            subtitle={movieData.movieTitle || 'No title available'}
            icon={<Film className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Film className="h-5 w-5 text-blue-600" />
                <span>Movie Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="text-gray-900">{movieData.movieTitle || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Program Date:</span>
                  {/* Panggil fungsi formatSingleDate di sini */}
                  <span className="text-gray-900">{formatSingleDate(movieData.screeningDate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="text-gray-900">{formatNumber(movieData.duration)} minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-teal-600" />
                <span>Attendance Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Residents Attended</span>
                  <span className="font-bold text-2xl text-teal-600">{formatNumber(movieData.attendedEvent)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${attendanceRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{formatNumber(attendanceRate)}% attendance</span>
                  <span>{formatNumber(movieData.totalResidents)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}