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
    name: "",
    phoneNumber: "",
    email: "",
    aadharNo: "",
    checkIn: "",
    guests: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      status: "upcoming",
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
    <Card className="w-full max-w-md md:max-w-lg lg:max-w-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-[8px] gap-y-4 lg:gap-x-20">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[8px] gap-y-4 lg:gap-x-20">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="aadharNo" className="text-sm font-medium">
              Aadhar No.
            </Label>
            <Input
              id="aadharNo"
              placeholder="Aadhar No."
              value={formData.aadharNo}
              onChange={(e) => handleInputChange("aadharNo", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[8px] gap-y-4 lg:gap-x-20">
          <div>
            <Label htmlFor="checkIn" className="text-sm font-medium">
              Check-In
            </Label>
            <Input
              id="checkIn"
              type="date"
              placeholder="dd/mm/yyyy"
              value={formData.checkIn}
              onChange={(e) => handleInputChange("checkIn", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="guests" className="text-sm font-medium">
              Guests
            </Label>
            <Input
              id="guests"
              type="number"
              placeholder="Guests"
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", e.target.value)}
              className="mt-2 mb-2 border-2 border-gray-300 focus:border-gray-800 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-gray-800 text-white rounded-3xl w-48 h-12 hover:bg-gray-900"
          >
            Reserve Now
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;
