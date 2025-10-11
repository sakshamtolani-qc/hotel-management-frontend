import { useState } from "react";
import { Button } from "@/utils/button";
import { Input } from "@/utils/input";
import { Label } from "@/utils/label";
import { Card } from "@/utils/card";
import { useToast } from "@/hooks/use-toast";

import { ReservationsService } from "@/services/api/reservations";


interface ReservationFormProps {
  roomId?: number;
  onSuccess?: (data: any) => void;
}

const ReservationForm = ({ roomId, onSuccess }: ReservationFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId) {
      toast({
        title: "Error",
        description: "No room selected for reservation.",
        variant: "destructive",
      });
      return;
    }

    // Basic frontend validation
    if (!formData.name || !formData.phoneNumber || !formData.checkIn || !formData.guests) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: formData.name,
        phone_number: formData.phoneNumber,
        email: formData.email,
        aadhar_no: formData.aadharNo,
        check_in: formData.checkIn,
        guests: parseInt(formData.guests),
        room_id: roomId,
      };
      
      // in your form submission
      const response = await ReservationsService.createReservation(payload);

      toast({
        title: "Reservation Created",
        description: "Your reservation has been successfully created.",
      });

      if (onSuccess) onSuccess(response);
      
      // Reset form
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        aadharNo: "",
        checkIn: "",
        guests: "",
      });
    } catch (error: any) {
      console.error("Reservation failed:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create reservation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md md:max-w-lg lg:max-w-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Phone */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone</Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Email & Aadhar */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="aadharNo">Aadhar No</Label>
            <Input
              id="aadharNo"
              placeholder="Aadhar Number"
              value={formData.aadharNo}
              onChange={(e) => handleInputChange("aadharNo", e.target.value)}
            />
          </div>
        </div>

        {/* Check-in & Guests */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <Label htmlFor="checkIn">Check-In</Label>
            <Input
              id="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(e) => handleInputChange("checkIn", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="number"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gray-800 text-white rounded-3xl w-48 h-12 hover:bg-gray-900"
          >
            {loading ? "Submitting..." : "Reserve Now"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;
