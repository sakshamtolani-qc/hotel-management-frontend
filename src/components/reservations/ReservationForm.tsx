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
    checkOut: "",  
    guests: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);

  // Trim values to avoid spaces
  const name = formData.name.trim();
  const phoneNumber = formData.phoneNumber.trim();
  const email = formData.email.trim();
  const aadharNo = formData.aadharNo.trim();
  const checkIn = formData.checkIn;
  const checkOut = formData.checkOut;
  const guests = formData.guests;

  // Basic empty check
  if (!name || !phoneNumber || !email || !aadharNo || !checkIn || !checkOut || !guests) {
    toast({ title: "Error", description: "Please fill all fields." });
    setSubmitting(false);
    return;
  }

  // Phone number validation: 10-15 digits only
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    toast({ title: "Error", description: "Phone number must be 10-15 digits." });
    setSubmitting(false);
    return;
  }

  // Aadhar validation: exactly 12 digits
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadharNo)) {
    toast({ title: "Error", description: "Aadhar number must be exactly 12 digits." });
    setSubmitting(false);
    return;
  }

  // Check-out date should be after check-in
  if (new Date(checkOut) <= new Date(checkIn)) {
    toast({ title: "Error", description: "Check-out must be after check-in." });
    setSubmitting(false);
    return;
  }

  try {
    const createdReservation = await ReservationsService.createReservation({
      name,            // Backend expects `name`
      email,
      phoneNumber,
      aadharNo,
      checkIn,
      checkOut,
      guests: Number(guests),
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

    // Reset form
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      aadharNo: "",
      checkIn: "",
      checkOut: "",
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
            <Label htmlFor="checkOut">Check-Out</Label>
            <Input
              id="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(e) => handleInputChange("checkOut", e.target.value)}
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
