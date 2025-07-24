import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, Play } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  url: string;
  type?: 'image' | 'video';
}

interface PhotoGalleryProps {
  photos: Photo[];
  title: string;
  iconColor?: string;
}

export function PhotoGallery({ photos, title, iconColor = "text-purple-600" }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className={`h-5 w-5 ${iconColor}`} />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {photo.type === 'video' ? (
                    <>
                      <video
                        src={photo.url}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                        <Play className="h-12 w-12 text-white opacity-90" />
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        VIDEO
                      </div>
                    </>
                  ) : (
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  )}
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
            <p className="text-muted-foreground text-sm">
              Click on any media to view it in full size.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Photo/Video Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="
          max-w-[95vw] max-h-[95vh] w-auto h-auto p-4 flex flex-col
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
          data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
        ">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-center">
              {selectedPhoto?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-center flex-grow flex-shrink overflow-hidden bg-black rounded-lg">
            {selectedPhoto?.type === 'video' ? (
              <video
                src={selectedPhoto.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  console.error("Error loading video:", e);
                }}
              >
                Browser Anda tidak mendukung tag video.
              </video>
            ) : (
              <img
                src={selectedPhoto?.url}
                alt={selectedPhoto?.title}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}