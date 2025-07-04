import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, AlertTriangle, Activity, User, Loader2, Home } from "lucide-react";
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Health Screening Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Total Residents"
            value={formatNumber(healthData.totalResidents)}
            icon={<Users className="h-6 w-6" />}
            gradient="from-blue-500 to-blue-600"
          />

          <DataCard
            title="Screening Attendance"
            value={formatNumber(healthData.attended)}
            subtitle={`${formatNumber(attendanceRate)}% participation`}
            icon={<Activity className="h-6 w-6" />}
            gradient="from-teal-500 to-teal-600"
          />

          <DataCard
            title="Screening Door to Door"
            value={formatNumber(healthData.doorToDoorAttendance)}
            subtitle="Patients visited door-to-door"
            icon={<Home className="h-6 w-6" />}
            gradient="from-green-500 to-green-600"
          />

          <DataCard
            title="Average Age"
            value={`${formatNumber(healthData.averageAge)} years`}
            subtitle="Resident population"
            icon={<User className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard
            title="Common Complaint"
            value={healthData.mostCommonComplaint ? healthData.mostCommonComplaint.split(' ')[0] : 'N/A'}
            subtitle={healthData.mostCommonComplaint || 'No data available'}
            icon={<AlertTriangle className="h-6 w-6" />}
            gradient="from-orange-500 to-orange-600"
          />
          
          <DataCard
            title="High Blood Sugar"
            value={formatNumber(healthData.highBloodSugar)}
            subtitle={`Highest: ${formatNumber(healthData.highestBloodSugar)} mg/dL`}
            gradient="from-red-500 to-red-600"
          />

          <DataCard
            title="High Uric Acid"
            value={formatNumber(healthData.highUricAcid)}
            subtitle={`Highest: ${formatNumber(healthData.highestUricAcid)} mg/dL`}
            gradient="from-yellow-500 to-yellow-600"
          />

          <DataCard
            title="High Blood Pressure"
            value={formatNumber(healthData.highBloodPressure)}
            subtitle={`Highest: ${healthData.highestBloodPressure || 'N/A'} mmHg`}
            gradient="from-red-600 to-red-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Health Concerns Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <span className="font-medium text-gray-700">High Blood Pressure</span>
                  <span className="font-bold text-red-600">{formatNumber(healthData.highBloodPressure)} residents</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <span className="font-medium text-gray-700">High Blood Sugar</span>
                  <span className="font-bold text-yellow-600">{formatNumber(healthData.highBloodSugar)} residents</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <span className="font-medium text-gray-700">High Uric Acid</span>
                  <span className="font-bold text-orange-600">{formatNumber(healthData.highUricAcid)} residents</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <span className="font-medium text-gray-700">Low Blood Pressure</span>
                  <span className="font-bold text-blue-600">{formatNumber(healthData.lowBloodPressure)} residents</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Screening Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-2 mt-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">Program Date</div>
                  <div className="text-base text-gray-700">{formatFullDateRange(healthData.programDateSta, healthData.programDateEnd)}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-600 mb-2">{formatNumber(attendanceRate)}%</div>
                  <div className="text-gray-700">Participation Rate</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(healthData.attended)}</div>
                    <div className="text-sm text-gray-600">Screened</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(healthData.totalResidents - healthData.attended)}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}