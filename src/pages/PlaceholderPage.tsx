import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Clock, AlertCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon = <Database className="h-8 w-8 text-gray-600" /> 
}: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          {icon}
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span>Coming Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                <Database className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
              
              <div className="flex items-center justify-center space-x-2 text-yellow-600">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Dataset will be added later</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-800 mb-2">?</div>
              <div className="text-sm text-blue-700">Data Points</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-teal-800 mb-2">?</div>
              <div className="text-sm text-teal-700">Metrics</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-800 mb-2">?</div>
              <div className="text-sm text-purple-700">Insights</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}