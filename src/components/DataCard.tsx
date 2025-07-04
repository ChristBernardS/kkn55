import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DataCardProps {
  title: string;
  value: string | number | null | undefined;
  subtitle?: string;
  icon?: ReactNode;
  gradient?: string;
  textColor?: string;
}

export function DataCard({
  title,
  value,
  subtitle,
  icon,
  gradient = "from-blue-500 to-teal-500",
  textColor = "text-white"
}: DataCardProps) {
  const displayValue =
    value === null || value === undefined || (typeof value === 'number' && isNaN(value))
      ? 'N/A'
      : String(value);

  return (
    <Card className={`bg-gradient-to-r ${gradient} ${textColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        {icon && <div className="opacity-80">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{displayValue}</div>
        {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}