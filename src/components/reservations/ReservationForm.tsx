import { useState } from "react";
import { Button } from "@/utils/button";
import { Input } from "@/utils/input";
import { Label } from "@/utils/label";
import { Card } from "@/utils/card";
import { useToast } from "@/hooks/use-toast";

interface ReservationFormProps {
  onSuccess?: (data: any) => void;
}

const ReservationForm = ({ onSuccess }: ReservationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    aadharNo: '',
    checkIn: '',
    guests: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock reservation ID
    const reservationId = `RES-${Date.now()}`;
    const reservationData = {
      ...formData,
      id: reservationId,
      checkOut: formData.checkIn, // Mock check-out same as check-in for demo
      price: 1000, // Mock price
      status: 'upcoming'
    };
    
    toast({
      title: "Reservation Submitted",
      description: "Your reservation request has been submitted successfully.",
    });
    
    // Call the success callback if provided
    if (onSuccess) {
      onSuccess(reservationData);
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="aadharNo" className="text-sm font-medium">Aadhar No.</Label>
            <Input
              id="aadharNo"
              placeholder="Aadhar No."
              value={formData.aadharNo}
              onChange={(e) => handleInputChange('aadharNo', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkIn" className="text-sm font-medium">Check-In</Label>
            <Input
              id="checkIn"
              type="date"
              placeholder="dd/mm/yyyy"
              value={formData.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
            <Input
              id="guests"
              type="number"
              placeholder="Guests"
              value={formData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full hover:bg-hotel-dark/90 text-white mt-6"
        >
          Reserve Now
        </Button>
      </form>
    </Card>
  );
};

export default ReservationForm;