import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// Import the attached images
import mealsSharingImage from "@assets/assets_task_01k0aj953ketma93xvm32n836b_1752701495_img_0 (1)_1752865800212.webp";
import dutyIsClearImage from "@assets/assets_task_01k0ah80j5ebdamsccd7rpnaeh_1752700412_img_0_1752865800213.webp";

interface GalleryPageProps {
  onBack?: () => void;
}

export default function GalleryPage({ onBack }: GalleryPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: mealsSharingImage,
      alt: "Retro propaganda poster"
    },
    {
      id: 2,
      src: dutyIsClearImage,
      alt: "Retro propaganda poster"
    }
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      )}

      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-800 mb-8">
          Gallery
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryImages.map((image) => (
          <div key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleImageClick(image.src)}
            />
          </div>
        ))}
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black"
              onClick={closeModal}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}