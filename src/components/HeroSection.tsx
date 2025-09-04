import heroImage from "@/assets/hero-hotel-room.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-96 bg-cover bg-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Hotel Reservation</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;