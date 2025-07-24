import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, NotebookText, SquareCheck } from "lucide-react";
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
            {data.satisfactionPercent}% Satisfaction
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Attendance</div>
                <div className="font-bold text-lg">{data.attendedEvent}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <div className="text-sm text-gray-600">Satisfaction</div>
                <div className="font-bold text-lg">{data.satisfactionPercent}%</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-bold text-lg">{data.duration}min</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SquareCheck className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-bold text-lg">Done</div>
              </div>
            </div>
          </div>
        </div>

        {/* New Program Summary Section */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <NotebookText className="h-5 w-5 text-gray-700" />
            <span className="font-semibold text-gray-800">Program Summary</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.programSummary || 'No program summary available.'}
          </p>
        </div>

        {/* Satisfaction Rate Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Satisfaction Rate</span>
            <span>{data.satisfactionPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${gradient} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${data.satisfactionPercent}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
