import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ReservationForm = () => {
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
    toast({
      title: "Reservation Submitted",
      description: "Your reservation request has been submitted successfully.",
    });
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
          className="w-full bg-hotel-dark hover:bg-hotel-dark/90 text-white mt-6"
        >
          Reserve Now
        </Button>
      </form>
    </Card>
  );
};

export default ReservationForm;