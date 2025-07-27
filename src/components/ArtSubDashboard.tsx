import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, NotebookText, SquareCheck, Lightbulb, AlertTriangle } from "lucide-react";
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

  // Fungsi untuk mengubah huruf pertama menjadi kapital
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-bold text-lg">Selesai</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <NotebookText className="h-5 w-5 text-gray-700" />
            <span className="font-semibold text-gray-800">Ringkasan Kegiatan</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.programSummary || 'Tidak ada ringkasan program yang tersedia.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

          {/* Kartu Kendala Dinamis */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Kendala</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                {data.kendala && data.kendala.toLowerCase() !== 'tidak ada kendala' && data.kendala.trim() !== '' ? (
                  data.kendala.split('.').map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="min-w-2 min-h-2 bg-orange-500 rounded-full mt-1.5"></div>
                      <span>{capitalizeFirstLetter(item.trim())}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start space-x-3">
                      <div className="min-w-2 min-h-2 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>Tidak ada kendala yang tercatat.</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Kartu Solusi Dinamis */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <span>Solusi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-700">
                {data.solusi && data.solusi.toLowerCase() !== 'tidak ada solusi' && data.solusi.trim() !== '' ? (
                  data.solusi.split('.').map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="min-w-2 min-h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span>{capitalizeFirstLetter(item.trim())}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start space-x-3">
                      <div className="min-w-2 min-h-2 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>Tidak ada solusi yang tercatat.</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

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
