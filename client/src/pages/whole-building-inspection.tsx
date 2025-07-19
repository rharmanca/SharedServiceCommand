import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X } from 'lucide-react';

interface WholeBuildingInspectionPageProps {
  onBack?: () => void;
}

export default function WholeBuildingInspectionPage({ onBack }: WholeBuildingInspectionPageProps) {
  // Define requirements for each category
  const requirements = {
    exterior: 2,
    gym_bleachers: 1,
    classroom: 3,
    cafeteria: 1,
    utility_storage: 1,
    admin_office: 2,
    hallway: 3,
    stairwell: 2,
    restroom: 2,
    staff_single_restroom: 1
  };

  // Category labels for display
  const categoryLabels: Record<string, string> = {
    exterior: 'Exterior',
    gym_bleachers: 'Gym and Bleachers',
    classroom: 'Classroom',
    cafeteria: 'Cafeteria',
    utility_storage: 'Utility Or Storage',
    admin_office: 'Admin or Office Area',
    hallway: 'Hallway',
    stairwell: 'Stairwell',
    restroom: 'Restroom',
    staff_single_restroom: 'Staff or Single Restroom'
  };

  // School options
  const schoolOptions = [
    { value: 'ASA', label: 'ASA' },
    { value: 'LCA', label: 'LCA' },
    { value: 'GWC', label: 'GWC' },
    { value: 'OA', label: 'OA' },
    { value: 'CBR', label: 'CBR' },
    { value: 'WLC', label: 'WLC' }
  ];

  // Track completed inspections
  const [completed, setCompleted] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    Object.keys(requirements).forEach(key => {
      initial[key] = 0;
    });
    return initial;
  });

  // Form data for current inspection
  const [formData, setFormData] = useState({
    school: '',
    date: '',
    locationCategory: '',
    roomNumber: '',
    locationDescription: '',
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAllComplete, setIsAllComplete] = useState(false);
  const [buildingInspectionId, setBuildingInspectionId] = useState<number | null>(null);

  // Rating descriptions
  const ratingDescriptions = [
    { stars: 1, label: "Poor", description: "Significant improvements needed" },
    { stars: 2, label: "Below Average", description: "Several issues to address" },
    { stars: 3, label: "Average", description: "Meets basic standards" },
    { stars: 4, label: "Good", description: "Above standard with minor issues" },
    { stars: 5, label: "Excellent", description: "Exceptional condition" }
  ];

  // Inspection categories with criteria
  const inspectionCategories = [
    { key: 'floors', label: '1. Floors', criteria: {} },
    { key: 'verticalHorizontalSurfaces', label: '2. Vertical and Horizontal Surfaces', criteria: {} },
    { key: 'ceiling', label: '3. Ceiling', criteria: {} },
    { key: 'restrooms', label: '4. Restrooms', criteria: {} },
    { key: 'customerSatisfaction', label: '5. Customer Satisfaction', criteria: {} },
    { key: 'trash', label: '6. Trash', criteria: {} },
    { key: 'projectCleaning', label: '7. Project Cleaning', criteria: {} },
    { key: 'activitySupport', label: '8. Activity Support', criteria: {} },
    { key: 'safetyCompliance', label: '9. Safety Compliance', criteria: {} },
    { key: 'equipment', label: '10. Equipment', criteria: {} },
    { key: 'monitoring', label: '11. Monitoring', criteria: {} }
  ];

  // Check if all categories are complete
  useEffect(() => {
    const checkCompletion = () => {
      return Object.entries(requirements).every(([category, required]) => {
        return completed[category] >= required;
      });
    };
    setIsAllComplete(checkCompletion());
  }, [completed]);

  // Initialize building inspection on mount
  useEffect(() => {
    const initializeBuildingInspection = async () => {
      if (!buildingInspectionId && formData.school && formData.date) {
        try {
          const response = await fetch('/api/inspections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              school: formData.school,
              date: formData.date,
              inspectionType: 'whole_building',
              locationDescription: 'Whole Building Inspection',
              isCompleted: false
            }),
          });

          if (response.ok) {
            const inspection = await response.json();
            setBuildingInspectionId(inspection.id);
          }
        } catch (error) {
          console.error('Error creating building inspection:', error);
        }
      }
    };

    if (formData.school && formData.date) {
      initializeBuildingInspection();
    }
  }, [formData.school, formData.date, buildingInspectionId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      alert('Please select a category to inspect.');
      return;
    }

    if (!formData.school || !formData.date) {
      alert('Please select school and date first.');
      return;
    }

    // Validate all ratings are filled
    const ratingFields = inspectionCategories.map(cat => cat.key);
    const hasEmptyRatings = ratingFields.some(field => formData[field as keyof typeof formData] === 0);
    
    if (hasEmptyRatings) {
      alert('Please rate all categories before submitting.');
      return;
    }

    if (!formData.roomNumber) {
      alert('Please enter a room number.');
      return;
    }

    try {
      const submissionData = {
        ...formData,
        locationCategory: selectedCategory,
        inspectionType: 'single_room',
        buildingInspectionId: buildingInspectionId
      };

      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Update completed count
        setCompleted(prev => ({
          ...prev,
          [selectedCategory]: prev[selectedCategory] + 1
        }));

        // Reset form but keep school and date
        setFormData(prev => ({
          ...prev,
          roomNumber: '',
          locationDescription: '',
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
        }));

        alert(`${categoryLabels[selectedCategory]} inspection submitted successfully!`);
      } else {
        throw new Error('Failed to submit inspection');
      }
    } catch (error) {
      console.error('Error submitting inspection:', error);
      alert('Failed to submit inspection. Please try again.');
    }
  };

  const handleFinalSubmit = async () => {
    if (!isAllComplete) {
      alert('Please complete all required inspections before finalizing.');
      return;
    }

    try {
      // Update the building inspection as completed
      const response = await fetch(`/api/inspections/${buildingInspectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (response.ok) {
        alert('Whole building inspection completed successfully!');
        if (onBack) onBack();
      } else {
        throw new Error('Failed to finalize inspection');
      }
    } catch (error) {
      console.error('Error finalizing inspection:', error);
      alert('Failed to finalize inspection. Please try again.');
    }
  };

  const renderStarRating = (category: string, currentRating: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
              onClick={() => handleInputChange(category, star)}
            />
          ))}
        </div>
        {currentRating > 0 && (
          <span className="text-sm font-medium text-gray-700">
            {ratingDescriptions[currentRating - 1]?.label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {onBack && (
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Custodial
        </Button>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Ready to Inspect the Whole Building?</h1>
        <p className="text-gray-600">
          This form is for your comprehensive building inspection. Simply go through the list below and submit the required number of inspections for each category. The inspection criteria are the same ones you're already familiar with from standard inspections.
        </p>
      </div>

      {/* School and Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Building Information</CardTitle>
          <CardDescription>Select the school and date for this whole building inspection</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Select
              value={formData.school}
              onValueChange={(value) => handleInputChange('school', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                {schoolOptions.map((school) => (
                  <SelectItem key={school.value} value={school.value}>
                    {school.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        </CardContent>
      </Card>

      {/* Dynamic Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Progress</CardTitle>
          <CardDescription>Complete the required number of inspections for each category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(requirements).map(([category, required]) => {
            const completedCount = completed[category];
            const isComplete = completedCount >= required;
            
            return (
              <div
                key={category}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center ${
                    isComplete ? 'bg-green-500 border-green-500' : 'border-gray-400'
                  }`}>
                    {isComplete && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`font-medium ${isComplete ? 'text-green-800' : 'text-gray-700'}`}>
                    {categoryLabels[category]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={isComplete ? 'default' : 'secondary'}>
                    {completedCount}/{required} Completed
                  </Badge>
                  {!isComplete && formData.school && formData.date && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? 'border-blue-500' : ''}
                    >
                      Select
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Inspection Form */}
      {selectedCategory && formData.school && formData.date && (
        <form onSubmit={handleCategorySubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inspecting: {categoryLabels[selectedCategory]}</CardTitle>
              <CardDescription>Complete the inspection for this category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="locationDescription">Location Description</Label>
                  <Input
                    id="locationDescription"
                    value={formData.locationDescription}
                    onChange={(e) => handleInputChange('locationDescription', e.target.value)}
                    placeholder="e.g., Main Building, Second Floor"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Categories</CardTitle>
              <CardDescription>Rate each category (1-5 stars)</CardDescription>
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

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Enter any additional observations..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
            Submit {categoryLabels[selectedCategory]} Inspection
          </Button>
        </form>
      )}

      {/* Final Submit Button */}
      <div className="pt-6 border-t">
        <Button
          onClick={handleFinalSubmit}
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!isAllComplete}
        >
          Finalize Whole Building Inspection
        </Button>
        {!isAllComplete && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Complete all required inspections to enable this button
          </p>
        )}
      </div>
    </div>
  );
}