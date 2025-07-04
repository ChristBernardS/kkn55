import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Image } from "lucide-react";

export function ArtPhotoGallery() {
  // Mock photo data - replace with actual photo URLs when available
  const photos = [
    { id: 1, title: "Painting Workshop in Action", url: "/placeholder.svg" },
    { id: 2, title: "Beautiful Sculptures Created", url: "/placeholder.svg" },
    { id: 3, title: "Pottery Making Session", url: "/placeholder.svg" },
    { id: 4, title: "Art Exhibition Display", url: "/placeholder.svg" },
    { id: 5, title: "Community Engagement", url: "/placeholder.svg" },
    { id: 6, title: "Final Art Showcase", url: "/placeholder.svg" }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-purple-600" />
          <span>Event Photo Gallery</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Image className="h-12 w-12 text-purple-400" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                <div className="w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{photo.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Upload actual event photos to replace placeholder images and showcase the community's artistic achievements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}