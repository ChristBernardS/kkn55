import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Activity, Calendar, TrendingUp } from "lucide-react";

export default function Overview() {
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
            value={67}
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
            value={3}
            subtitle="Community activities"
            icon={<Calendar className="h-6 w-6" />}
            gradient="from-purple-500 to-purple-600"
          />
          
          <DataCard
            title="Satisfaction Rate"
            value="89%"
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
                    <div className="font-medium text-gray-900">Health Screening Ongoing</div>
                    <div className="text-sm text-gray-600">32 residents screened so far</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">New Data Collection</div>
                    <div className="text-sm text-gray-600">4 additional datasets pending</div>
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
                  <span className="font-bold text-green-600">52%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <span className="font-medium text-gray-700">Average Satisfaction</span>
                  <span className="font-bold text-purple-600">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Available Datasets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">Movie Screening Data</h3>
                <p className="text-sm text-blue-700">Attendance, satisfaction, and event details</p>
              </div>
              <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                <h3 className="font-semibold text-red-900 mb-2">Health Screening Data</h3>
                <p className="text-sm text-red-700">Medical metrics and health indicators</p>
              </div>
              <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-600 mb-2">Additional Datasets</h3>
                <p className="text-sm text-gray-500">4 more datasets coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}