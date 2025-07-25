import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, Loader2, CheckCircle, Target, AlertTriangle, Lightbulb, CircleDollarSign } from "lucide-react";
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
    { id: 5, title: "Rumah yang sudah Dinomori", url: "/image/house_5.jpg" },
    { id: 6, title: "Kumpulan Video Kegiatan", url: "/image/house_6.mp4", type: "video" as const }
  ];

  const averagePerHouse = houseData.totalHouses > 0
    ? (houseData.totalResidents / houseData.totalHouses).toFixed(1)
    : 'N/A';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Home className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Penomoran Rumah</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Jumlah Penduduk"
            value={formatNumber(houseData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Kepala Keluarga"
            value={formatNumber(houseData.totalFamilyHead)}
            subtitle="Kepala keluarga terdaftar"
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Jumlah Rumah"
            value={formatNumber(houseData.totalHouses)}
            subtitle="Rumah dinomori"
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
                <span>Ringkasan Kegiatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Rata-rata per rumah:</span>
                  <span className="text-gray-900">{averagePerHouse} penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Cakupan:</span>
                  <span className="text-gray-900">100% dari rumah penduduk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="text-green-600 font-medium">Selesai</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Demografi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Jumlah penduduk</span>
                  <span className="font-bold text-2xl text-blue-600">{formatNumber(houseData.totalResidents)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Keluarga: {formatNumber(houseData.totalFamilyHead)}</span>
                  <span>Rumah: {formatNumber(houseData.totalHouses)}</span>
                </div>
              </div>
              </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Indikator Keberhasilan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Seluruh rumah di Dusun Sumur telah terdata dan diberikan nomor secara sistematis.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Izin dan persetujuan warga telah diperoleh untuk penempelan stiker nomor rumah.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Stiker nomor rumah telah ditempel di semua rumah secara seragam dan rapi.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Warga memahami tujuan dan manfaat dari penomoran rumah.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Tidak adanya penolakan atau komplain dari warga selama pelaksanaan program.</span>
                </div>
              </div>
            </CardContent>
          </Card>

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

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>Luaran yang Dicapai</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Jumlah kehadiran diatas 50%</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Terciptanya interaksi positif antarwarga</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="min-w-2 min-h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Meningkatnya antusias warga terhadap kegiatan KKN</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span>Jadwal Kegiatan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-mono text-gray-600 min-w-[80px]">11 Juli</div>
                  <div className="text-sm text-gray-700">Koordinasi awal dengan anggota kelompok</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-mono text-blue-600 min-w-[80px]">12 Juli</div>
                  <div className="text-sm text-gray-700">Koordinasi dengan Ibu Dukuh</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
                  <div className="text-xs font-mono text-teal-600 min-w-[80px]">13 Juli</div>
                  <div className="text-sm text-gray-700">Pembuatan format data rumah & desain awal stiker nomor</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-xs font-mono text-green-600 min-w-[80px]">14 Juli</div>
                  <div className="text-sm text-gray-700">Survei dan pendataan awal rumah warga</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="text-xs font-mono text-purple-600 min-w-[80px]">15 Juli</div>
                  <div className="text-sm text-gray-700">Menyusun data lengkap, memetakan rumah yang akan ditempeli stiker</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs font-mono text-orange-600 min-w-[80px]">16-17 Juli</div>
                  <div className="text-sm text-gray-700">Mencetak stiker</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs font-mono text-yellow-600 min-w-[80px]">18 Juli</div>
                  <div className="text-sm text-gray-700">Menempel stiker ke rumah - rumah warga</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CircleDollarSign className="h-5 w-5 text-teal-600" />
                <span>Anggaran</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {/* Header */}
                <div className="flex items-center border-b font-semibold text-gray-600 pb-2 mb-2">
                  <span className="w-10 text-center">No</span>
                  <span className="flex-1 px-2">Nama Barang</span>
                  <span className="w-24 text-center px-2">Total Barang</span>
                  <span className="w-24 text-center px-2">Keterangan</span>
                  <span className="w-32 text-right px-2">Harga Satuan</span>
                  <span className="w-32 text-right px-2">Harga Total</span>
                </div>

                {/* Body */}
                <div className="space-y-1">
                  {/* Row 1 */}
                  <div className="flex items-center hover:bg-gray-50 p-2 rounded-md">
                    <span className="w-10 text-center text-gray-500">1</span>
                    <span className="flex-1 px-2 text-gray-800">Biaya cetak stiker</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">30</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">Minjam</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                  </div>
                  {/* Row 2 */}
                  <div className="flex items-center hover:bg-gray-50 p-2 rounded-md">
                    <span className="w-10 text-center text-gray-500">2</span>
                    <span className="flex-1 px-2 text-gray-800">Layar</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">1</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">Minjam</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                  </div>
                  {/* Row 3 */}
                  <div className="flex items-center hover:bg-gray-50 p-2 rounded-md">
                    <span className="w-10 text-center text-gray-500">3</span>
                    <span className="flex-1 px-2 text-gray-800">Speaker</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">1</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">Minjam</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                  </div>
                  {/* Row 4 */}
                  <div className="flex items-center hover:bg-gray-50 p-2 rounded-md">
                    <span className="w-10 text-center text-gray-500">4</span>
                    <span className="flex-1 px-2 text-gray-800">Kabel roll</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">1</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">Minjam</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                    <span className="w-32 text-right px-2 text-gray-800 font-mono">Rp. 0,-</span>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex justify-between items-center border-t font-bold text-gray-800 pt-2 mt-2 p-2">
                  <span>Total Harga Barang</span>
                  <span className="font-mono">Rp. 0,-</span>
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
