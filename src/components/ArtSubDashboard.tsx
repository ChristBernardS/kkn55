import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, NotebookText, SquareCheck, CircleDollarSign, Calendar, CheckCircle, Lightbulb, AlertTriangle, XCircle, Target } from "lucide-react"; // Import NotebookText
import type { ArtSubEventData } from "@/utils/csvUtils";

interface ArtSubDashboardProps {
  data: ArtSubEventData;
  colorIndex: number;
}

const gradients = [
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-indigo-500 to-indigo-600",
  "from-teal-500 to-teal-600"
];

const bgColors = [
  "bg-purple-50",
  "bg-pink-50",
  "bg-indigo-50",
  "bg-teal-50"
];

export function ArtSubDashboard({ data, colorIndex }: ArtSubDashboardProps) {
  const gradient = gradients[colorIndex % gradients.length];
  const bgColor = bgColors[colorIndex % bgColors.length];

  return (
    <Card className={`shadow-lg ${bgColor} border-l-4 border-l-purple-500`}>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center justify-between">
          <span>{data.programTitle}</span>
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium whitespace-nowrap`}>
            {data.eventProdi}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Kehadiran</div>
                <div className="font-bold text-lg">{data.attendedEvent}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <div className="text-sm text-gray-600">Kepuasan</div>
                <div className="font-bold text-lg">{data.satisfactionPercent}%</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Durasi</div>
                <div className="font-bold text-lg">{data.duration} menit</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SquareCheck className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Status</div> {/* Changed label */}
                <div className="font-bold text-lg">Selesai</div> {/* Changed data source */}
              </div>
            </div>
          </div>
        </div>

        {/* New Program Summary Section */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <NotebookText className="h-5 w-5 text-gray-700" />
            <span className="font-semibold text-gray-800">Ringkasan Kegiatan</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.programSummary || 'No program summary available.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
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
                  <span className="text-sm text-gray-700">Minimal 50% dari total warga desa hadir dalam kegiatan.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <XCircle className="min-h-5 min-w-5 text-red-500" />
                  <span className="text-sm text-gray-700">Warga yang hadir mampu mengikuti kegiatan sampai selesai.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Terciptanya interaksi positif antar warga selama kegiatan berlangsung.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="min-h-5 min-w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Meningkatnya antusiasme warga terhadap kegiatan KKN.</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

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
                  <div className="text-xs font-mono text-gray-600 min-w-[80px]">19:30</div>
                  <div className="text-sm text-gray-700">Persiapan Alat</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-mono text-blue-600 min-w-[80px]">20:00</div>
                  <div className="text-sm text-gray-700">Pembukaan dan Sambutan</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
                  <div className="text-xs font-mono text-teal-600 min-w-[80px]">20:15</div>
                  <div className="text-sm text-gray-700">Penjelasan Alat, Edukasi Teknologi</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-xs font-mono text-green-600 min-w-[80px]">20:20</div>
                  <div className="text-sm text-gray-700">Pemutaran Film</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="text-xs font-mono text-purple-600 min-w-[80px]">22:15</div>
                  <div className="text-sm text-gray-700">Survey Kepuasan Warga dan Penyampaian Pesan Moral Film</div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs font-mono text-orange-600 min-w-[80px]">22:20</div>
                  <div className="text-sm text-gray-700">Foto Bersama dan Penutupan</div>
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
                    <span className="flex-1 px-2 text-gray-800">Proyektor</span>
                    <span className="w-24 text-center px-2 text-gray-800 font-mono">1</span>
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

        {/* Attendance Rate Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tingkat Kehadiran</span>
            <span>{Math.round((data.attendedEvent / data.totalResidents) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${gradient} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${Math.round((data.attendedEvent / data.totalResidents) * 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
