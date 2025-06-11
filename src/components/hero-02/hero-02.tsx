import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import HeroImageCycler from "./HeroImageCycler";
import { useNavigate } from "react-router";

const HEADINGS = [
  "Adopt, Don't Shop.",
  1000,
  "Rescue a Life. Find Your Companion.",
  1000,
  "Make a Difference for Pets in Need.",
  1000,
  "List, Find, Connect.",
  1000,
  "Empowering Pet Owners & Rescuers.",
  1000,
  "Join the PawConnect Community.",
  1000,
]

const Hero02 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none text-black">
            Love & Paws Approved
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
            <TypeAnimation
              sequence={HEADINGS}
              repeat={Infinity}
            />
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Welcome to PawConnect! Your ultimate platform to adopt, list lost/found pets, and connect with local resources.
            <br />
            Together, let's make a difference for pets in need.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base" onClick={() => navigate("/adoption")}>
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </div>
        </div>
        <div className="w-full aspect-video bg-accent rounded-xl">
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <HeroImageCycler />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero02;
