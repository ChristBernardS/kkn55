// MovieScreening.tsx

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Users, Star, Calendar, Loader2, AlertTriangle, Lightbulb } from "lucide-react";
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

  const attendanceRate = movieData.totalResidents > 0
    ? Math.round((movieData.attendedEvent / movieData.totalResidents) * 100)
    : 0;

  const moviePhotos = [
    { id: 1, title: "Foto Bersama", url: "/image/movie_1.jpg" },
    { id: 2, title: "Warga Menikmati Film", url: "/image/movie_2.mp4", type: "video" as const },
    { id: 3, title: "Persiapan Program Kerja", url: "/image/movie_3.jpg" },
    { id: 4, title: "Warga Hadir di Tempat Acara Berlangsung", url: "/image/movie_4.jpg" },
    { id: 5, title: "Video Kumpulan Kegiatan", url: "/image/movie_7.mp4", type: "video" as const },
    { id: 6, title: "Persiapan Program Kerja", url: "/image/movie_6.jpg" }
  ];

  const formatNumber = (num: number | string | undefined): string =>
    (typeof num === 'number' && !isNaN(num)) ? String(num) : 'N/A';

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
          <Film className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Nonton Bersama</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Jumlah Penduduk"
            value={formatNumber(movieData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Jumlah Kehadiran"
            value={formatNumber(movieData.attendedEvent)}
            subtitle={`${formatNumber(attendanceRate)}% tingkat kehadiran`}
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-teal-500 to-teal-600"
          />

          <DataCard
            title="Tingkat Kepuasan"
            value={`${formatNumber(movieData.satisfactionPercent)}%`}
            subtitle="Kepuasan keseluruhan"
            icon={<Star className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Film yang Diputar"
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
                <span>Rincian Film</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Judul:</span>
                  <span className="text-gray-900">{movieData.movieTitle || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Tanggal Dilaksanakannya Program:</span>
                  <span className="text-gray-900">{formatSingleDate(movieData.screeningDate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Durasi Film:</span>
                  <span className="text-gray-900">{formatNumber(movieData.duration)} menit</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-teal-600" />
                <span>Ringkasan Acara</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Durasi Kegiatan</span>
                  <span className="font-bold text-1xl text-teal-600">120 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Penduduk Hadir</span>
                  <span className="font-bold text-1xl text-teal-600">{formatNumber(movieData.attendedEvent)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${attendanceRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{formatNumber(attendanceRate)}% kehadiran</span>
                  <span>{formatNumber(movieData.totalResidents)}</span>
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
                  <span>Usia warga yang beragam</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Keterbatasan infrastruktur yaitu sinyal internet</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Komunikasi yang sulit dijalankan</span>
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
                  <span>Pemilihan film yang bisa ditonton oleh semua kalangan usia</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Mengunduh film sebelum program KKN dilaksanakan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Meminta pertolongan Ibu Kasun untuk menyebarkan informasi terkait tanggal acara diadakan</span>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
        <PhotoGallery
          photos={moviePhotos}
          title="Kumpulan Foto dan Video Acara"
          iconColor="text-blue-600"
        />
      </div>
    </DashboardLayout>
  );
}
