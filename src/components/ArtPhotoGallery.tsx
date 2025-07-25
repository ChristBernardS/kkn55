import { PhotoGallery } from "./PhotoGallery";

export function ArtPhotoGallery() {
  // Mock photo data - replace with actual photo URLs when available
  const photos = [
    { id: 1, title: "Group Photo", url: "/image/umkm_1.jpg" },
    { id: 2, title: "Pict 1", url: "/image/umkm_2.jpg" },
    { id: 3, title: "Pict 2", url: "/image/umkm_3.jpg" },
    { id: 4, title: "Sosialisasi 1", url: "/image/umkm_4.jpg" },
    { id: 5, title: "Sosialisasi 2", url: "/image/umkm_5.jpg" },
    { id: 6, title: "Pict 3", url: "/image/umkm_6.jpg" },
    { id: 7, title: "Sosialisasi 3", url: "/image/umkm_7.mp4", type: "video" as const },
    { id: 8, title: "Sosialisasi 4", url: "/image/umkm_8.mp4", type: "video" as const },
    { id: 9, title: "Sosialisasi 5", url: "/image/umkm_9.mp4", type: "video" as const },
    { id: 10, title: "Sosialisasi 6", url: "/image/umkm_10.mp4", type: "video" as const },
    { id: 11, title: "Sosialisasi 7", url: "/image/umkm_12.mp4", type: "video" as const },
    { id: 12, title: "Sosialisasi 8", url: "/image/umkm_13.jpg" },
    { id: 13, title: "Sosialisasi 9", url: "/image/umkm_14.jpg" },
    { id: 14, title: "Sosialisasi 10", url: "/image/umkm_15.jpg" },
    { id: 15, title: "Sosialisasi 11", url: "/image/umkm_17.jpg" },
    { id: 15, title: "Event Compilation", url: "/image/umkm_16.mp4", type: "video" as const },
  ];

  return (    
  <PhotoGallery 
      photos={photos} 
      title="Event Photo Gallery" 
      iconColor="text-purple-600" 
    />
  );
}
