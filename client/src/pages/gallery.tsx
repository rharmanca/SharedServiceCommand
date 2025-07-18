import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share2 } from "lucide-react";
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
      title: "Some Meals Are Better Shared",
      description: "Promoting teamwork and shared responsibility in cafeteria services",
      src: mealsSharingImage,
      alt: "Retro propaganda poster showing armored figures serving meals with text 'Some Meals Are Better Shared'",
      category: "Teamwork",
      year: "2024"
    },
    {
      id: 2,
      title: "Your Duty Is Clear - Keep It Clean!",
      description: "Motivational poster emphasizing the importance of maintaining clean facilities",
      src: dutyIsClearImage,
      alt: "Retro propaganda poster showing an armored figure with laser vision cleaning trash with text 'Your Duty Is Clear - Keep It Clean!'",
      category: "Motivation",
      year: "2024"
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

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-orange-800 mb-2">
          Custodial Command Gallery
        </h1>
        <p className="text-gray-600 text-lg">
          Inspirational artwork celebrating the dedication and service of our custodial teams
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Retro Propaganda Style
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Motivational Art
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-orange-100">
            <div className="relative group">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-96 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                onClick={() => handleImageClick(image.src)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 cursor-pointer" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle share functionality
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download functionality
                      const link = document.createElement('a');
                      link.href = image.src;
                      link.download = `${image.title.replace(/\s+/g, '_')}.webp`;
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {image.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-600">
                    {image.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {image.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{image.year}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
        <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">
          About the Gallery
        </h2>
        <div className="prose prose-orange max-w-none text-center">
          <p className="text-gray-700 leading-relaxed">
            These inspirational posters celebrate the vital work of custodial teams across our educational facilities. 
            Created in a retro propaganda style, they emphasize the importance of teamwork, cleanliness, and service 
            in maintaining safe and welcoming learning environments.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Each artwork serves as a reminder that every cleaning task, every inspection, and every maintenance 
            action contributes to the greater mission of supporting student success and community well-being.
          </p>
        </div>
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