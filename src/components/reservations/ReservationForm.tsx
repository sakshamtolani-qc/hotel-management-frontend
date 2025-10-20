import { useState } from "react";
import { Button } from "@/utils/button";
import { Input } from "@/utils/input";
import { Label } from "@/utils/label";
import { Card } from "@/utils/card";
import { useToast } from "@/hooks/use-toast";
import { ReservationsService } from "@/services/api/reservations";

export interface ReservationFormProps {
  onSuccess?: (reservationData: any) => void;
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
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.aadharNo ||
      !formData.checkIn ||
      !formData.guests
    ) {
      toast({ title: "Error", description: "Please fill all fields." });
      setSubmitting(false);
      return;
    }

    try {
      const createdReservation = await ReservationsService.createReservation({
        guestName: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        aadharNo: formData.aadharNo,
        checkIn: formData.checkIn,
        guests: Number(formData.guests),
        status: "upcoming",
        price: 1000,
        roomType: "Standard Room",
      });

      console.log("Reservation created:", createdReservation);

      toast({
        title: "Reservation Submitted",
        description: "Your reservation was successfully created.",
      });

      if (onSuccess) onSuccess(createdReservation);

      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        aadharNo: "",
        checkIn: "",
        guests: "",
      });
    } catch (error: any) {
      console.error("Reservation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create reservation.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md md:max-w-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="aadharNo">Aadhar No.</Label>
            <Input
              id="aadharNo"
              value={formData.aadharNo}
              onChange={(e) => handleInputChange("aadharNo", e.target.value)}
            />
          </div>
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
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Reserve Now"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;
