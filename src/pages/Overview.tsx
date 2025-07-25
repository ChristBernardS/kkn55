import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Activity, Calendar, TrendingUp, MapPin, NotebookText } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export default function Overview() {
  const position: L.LatLngExpression = [-8.185093026404976, 110.97966157791248];

  const dailyActivities = [
    { id: 1, title: "Daily activities", url: "/image/dl_1.mp4", type: "video" as const },
    { id: 2, title: "Kunjungan rumah warga", url: "/image/dl_2.mp4", type: "video" as const },
    { id: 3, title: "Membersihkan Gapura part 1", url: "/image/dl_3.mp4", type: "video" as const },
    { id: 4, title: "Membersihkan Gapura part 2", url: "/image/dl_4.mp4", type: "video" as const },
    { id: 5, title: "Persiapan proker despro", url: "/image/dl_24.mp4", type: "video" as const },
    { id: 6, title: "Mancing Iwak Lele", url: "/image/dl_6.jpg" },
    { id: 7, title: "Jalanan Dusun", url: "/image/dl_7.jpg" },
    { id: 9, title: "Memanen Singkong", url: "/image/dl_9.jpg" },
    { id: 20, title: "Membantu warga mengambil kayu bakar", url: "/image/dl_20.mp4", type: "video" as const },
    { id: 11, title: "Mengunjugi kantor desa", url: "/image/dl_11.jpg" },
    { id: 12, title: "Door to Door health screening", url: "/image/dl_12.jpg" },
    { id: 13, title: "Proker Kedokteran 'Health Screening'", url: "/image/dl_14.jpg" },
    { id: 14, title: "Proker tambahan", url: "/image/dl_13.jpg" },
    { id: 15, title: "Proker tambahan", url: "/image/dl_15.jpg" },
    { id: 16, title: "Proker tambahan", url: "/image/dl_16.jpg" },
    { id: 8, title: "Cat gapura", url: "/image/dl_8.jpg" },
    { id: 17, title: "Cat penampungan air", url: "/image/dl_17.jpg" },
    { id: 10, title: "Cat gapura", url: "/image/dl_10.jpg" },
    { id: 18, title: "Cat gapura", url: "/image/dl_18.jpg" },
    { id: 19, title: "Cat gapura", url: "/image/dl_19.jpg" },
    { id: 21, title: "Cat gapura", url: "/image/dl_21.jpg" },
    { id: 22, title: "Our last few days", url: "/image/dl_22.jpg" },
    { id: 23, title: "Our last few days", url: "/image/dl_23.mp4", type: "video" as const },
    { id: 24, title: "kata-kata buat KKN", url: "/image/dl_5.mp4", type: "video" as const }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Residents"
            value={63}
            subtitle="Active residents"
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />
          
          <DataCard
            title="Recent Screenings"
            value={32}
            subtitle="Health screenings completed"
            icon={<Activity className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />
          
          <DataCard
            title="Events This Month"
            value={4}
            subtitle="Community activities"
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />
          
          <DataCard
            title="Satisfaction Rate"
            value="87%"
            subtitle="Overall satisfaction"
            icon={<TrendingUp className="h-6 w-6" />}
            gradient="from-teal-500 to-teal-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Cinema Completed</div>
                    <div className="text-sm text-gray-600">38 residents attended</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Health Screening Completed</div>
                    <div className="text-sm text-gray-600">63 residents screened</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">UMKM</div>
                    <div className="text-sm text-gray-600">56 attendance</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">House Numbering</div>
                    <div className="text-sm text-gray-600">29 house numbered</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-teal-600" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                  <span className="font-medium text-gray-700">Cinema Attendance Rate</span>
                  <span className="font-bold text-blue-600">61%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <span className="font-medium text-gray-700">Health Screening Attendance Rate</span>
                  <span className="font-bold text-green-600">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <span className="font-medium text-gray-700">UMKM Socialization Attendance Rate</span>
                  <span className="font-bold text-purple-600">88%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-lg">
                  <span className="font-medium text-gray-700">House Numbered</span>
                  <span className="font-bold text-yellow-600">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-50 rounded-lg">
                  <span className="font-medium text-gray-700">Average Satisfaction</span>
                  <span className="font-bold text-orange-600">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-600" />
              <span>Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <MapContainer 
                center={position} 
                zoom={14} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
                className="relative z-10"
              >
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <Marker position={position} icon={customMarkerIcon}>
                  <Popup>
                    <b>Lokasi KKN</b> <br /> Desa Dersono, Dusun Sumur, Kabupaten Pacitan.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-300">
          <div className="flex items-center space-x-2 mb-2">
            <NotebookText className="h-5 w-5 text-gray-700" />
            <span className="font-semibold text-gray-800">Notes:</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Program Kuliah Kerja Nyata (KKN) ini dilaksanakan di <strong>Dusun Sumur, Desa Dersono, Kabupaten Pacitan</strong>. 
            Dusun ini menghadapi beberapa tantangan signifikan:
            <ul className="list-disc pl-5 mt-2">
              <li>Mayoritas warga (sekitar 60%) didominasi oleh lansia.</li>
              <li>Akses menuju lokasi sulit dijangkau karena kondisi jalan yang masih buruk.</li>
              <li>Terdapat kesulitan dalam mendapatkan sinyal telekomunikasi dan akses air bersih yang terbatas.</li>
            </ul>
          </p>
        </div>

        <PhotoGallery 
          photos={dailyActivities} 
          title="Daily Activity" 
          iconColor="text-blue-600" 
        />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Available Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">Cinema Data</h3>
                <p className="text-sm text-blue-700">Attendance, satisfaction, and event details</p>
              </div>
              <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                <h3 className="font-semibold text-red-900 mb-2">Health Screening Data</h3>
                <p className="text-sm text-red-700">Medical metrics and health indicators</p>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-600 mb-2">Additional Datasets</h3>
                <p className="text-sm text-gray-500">2 more datasets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
