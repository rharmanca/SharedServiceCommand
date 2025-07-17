import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

export default function CustodialInspectionPage() {
  const [formData, setFormData] = useState({
    school: '',
    date: '',
    locationDescription: '',
    roomNumber: '',
    floors: 0,
    verticalHorizontalSurfaces: 0,
    ceiling: 0,
    restrooms: 0,
    customerSatisfaction: 0,
    trash: 0,
    projectCleaning: 0,
    activitySupport: 0,
    safetyCompliance: 0,
    equipment: 0,
    monitoring: 0,
    notes: ''
  });

  const ratingDescriptions = [
    { stars: 1, label: "Unkempt Neglect", description: "Crisis" },
    { stars: 2, label: "Moderate Dinginess", description: "Reactive" },
    { stars: 3, label: "Casual Inattention", description: "Managed Care" },
    { stars: 4, label: "Ordinary Tidiness", description: "Comprehensive Care" },
    { stars: 5, label: "Orderly Spotlessness", description: "Showpiece Facility" }
  ];

  const inspectionCategories = [
    { key: 'floors', label: 'Floors' },
    { key: 'verticalHorizontalSurfaces', label: 'Vertical and Horizontal Surfaces' },
    { key: 'ceiling', label: 'Ceiling' },
    { key: 'restrooms', label: 'Restrooms' },
    { key: 'customerSatisfaction', label: 'Customer Satisfaction and Coordination' },
    { key: 'trash', label: 'Trash' },
    { key: 'projectCleaning', label: 'Project Cleaning' },
    { key: 'activitySupport', label: 'Activity Support' },
    { key: 'safetyCompliance', label: 'Safety and Compliance' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'monitoring', label: 'Monitoring' }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const inspection = await response.json();
        alert('Inspection submitted successfully!');
        // Reset form
        setFormData({
          school: '',
          date: '',
          locationDescription: '',
          roomNumber: '',
          floors: 0,
          verticalHorizontalSurfaces: 0,
          ceiling: 0,
          restrooms: 0,
          customerSatisfaction: 0,
          trash: 0,
          projectCleaning: 0,
          activitySupport: 0,
          safetyCompliance: 0,
          equipment: 0,
          monitoring: 0,
          notes: ''
        });
      } else {
        throw new Error('Failed to submit inspection');
      }
    } catch (error) {
      console.error('Error submitting inspection:', error);
      alert('Failed to submit inspection. Please try again.');
    }
  };

  const renderStarRating = (category: string, currentRating: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => handleInputChange(category, star)}
            />
          ))}
        </div>
        {currentRating > 0 && (
          <span className="text-sm text-gray-600">
            {ratingDescriptions[currentRating - 1]?.label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Submit New Custodial Inspection</h1>
        <p className="text-gray-600">Complete the inspection form based on facility cleanliness criteria</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details for this inspection</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="Enter school name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationDescription">Location Description</Label>
              <Input
                id="locationDescription"
                value={formData.locationDescription}
                onChange={(e) => handleInputChange('locationDescription', e.target.value)}
                placeholder="e.g., Main Building, Gym, Cafeteria"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                placeholder="Enter room number"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Rating Scale Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Scale Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {ratingDescriptions.map((rating) => (
                <div key={rating.stars} className="p-3 border rounded-lg">
                  <div className="flex justify-center mb-2">
                    {[...Array(rating.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - rating.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>
                  <div className="text-sm font-medium">{rating.label}</div>
                  <div className="text-xs text-gray-500">{rating.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspection Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Categories</CardTitle>
            <CardDescription>Rate each category based on the criteria (1-5 stars)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {inspectionCategories.map((category, index) => (
              <div key={category.key}>
                <div className="space-y-3">
                  <Label className="text-base font-medium">{category.label}</Label>
                  {renderStarRating(category.key, formData[category.key as keyof typeof formData] as number)}
                </div>
                {index < inspectionCategories.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Any additional observations or comments</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Enter any additional notes, observations, or specific issues..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Submit Inspection
          </Button>
        </div>
      </form>
    </div>
  );
}