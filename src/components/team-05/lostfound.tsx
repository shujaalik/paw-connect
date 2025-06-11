import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { get, insert } from "../api/db";
import { getPublicUrls, upload } from "../api/storage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetUser from "../hooks/GetUser";
import { toast } from "sonner";
import Spinner from "../ui/custom/spinner";
import { Input } from "../ui/input";
import {
  Cat,
  VenusAndMars,
  PawPrint,
  MapPin,
  Dog,
  Bird,
  Rabbit,
} from "lucide-react";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
const animals = [
  { value: "all", label: "All", icon: PawPrint },
  { value: "cat", label: "Cat", icon: Cat },
  { value: "dog", label: "Dog", icon: Dog },
  { value: "bird", label: "Bird", icon: Bird },
  { value: "rabbit", label: "Rabbit", icon: Rabbit },
];

const Team05Page = () => {
  const [filterType, setFilterType] = useState("all");
  const [listings, setListings] = useState<{
    name: string;
    animal: string;
    gender: string;
    image: string;
    location: string;
  }[]>([]);
  const [rawListings, setRawListings] = useState<{
    name: string;
    animal: string;
    gender: string;
    image: string;
    location: string;
  }[]>([]);

  useEffect(() => {
    setListings(rawListings.filter((listing) => {
      if (filterType === "all") return true;
      return listing.animal.toLowerCase() === filterType.toLowerCase();
    }));
  }, [rawListings, filterType]);

  const getData = async () => {
    const [rows, images] = await Promise.all([get("lost_and_found_listings"), getPublicUrls("lost-and-founds", "images")]);
    const listingsData = rows.map((row: any) => ({
      name: row.pet_name,
      animal: row.pet_type,
      gender: row.pet_gender ? "Male" : "Female",
      image: images.find((img) => img.includes(row.image)) || "",
      location: row.location,
    }));
    setRawListings(listingsData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
      <div className="text-center max-w-2xl mx-auto">
        <b className="text-center text-muted-foreground text-base font-semibold">
          Reunion Alert!
        </b>
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          Lost a <span className="text-primary">Pet?</span> Let's Find Them Together.
        </h2>
        <p className="mt-6 text-base sm:text-lg">
          Every minute counts. List your lost pet details or browse pets found in your area. Your post could be the key to a joyful reunion.
        </p>
        <div className="mt-8 flex flex-col justify-between w-full sm:flex-row-reverse sm:justify-center gap-3">
          <AddListingParent getData={getData} />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]" size="sm">
              <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
                <SelectValue placeholder="Filter Animal" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Animals</SelectLabel>
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    <div className="flex items-center gap-2">
                      <animal.icon className="h-4 w-4" /> {animal.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {listings.length ? listings.map((listing, index) => (
          <div key={listing.name + index}>
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full aspect-square rounded-lg object-cover bg-secondary"
              width={600}
              height={600}
            />
            <h3 className="mt-4 text-lg font-semibold">{listing.name}</h3>
            <p className="text-muted-foreground text-sm uppercase">{listing.animal}</p>
            <div className="mt-4 flex items-center justify-between gap-2.5">
              <div
                className="bg-accent hover:bg-accent text-muted-foreground shadow-none text-sm flex gap-1 items-center"
              >
                <VenusAndMars className="stroke-muted-foreground h-4 w-4" />
                <span>{listing.gender}</span>
              </div>
              <div
                className="bg-accent hover:bg-accent text-muted-foreground shadow-none text-sm flex gap-1 items-center"
              >
                <span>{listing.location}</span>
                <MapPin className="stroke-muted-foreground h-4 w-4" />
              </div>
            </div>
          </div>
        )) : <div className="col-span-4 w-full flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-transparent border-t-primary border-r-primary rounded-full animate-spin" />
        </div>}
      </div>
    </div>
  );
};



const AddListingParent = ({
  getData
}: {
  getData: () => Promise<void>;
}) => {
  const currentUser = GetUser();
  const [state, setState] = useState(false);
  return <Dialog open={state} onOpenChange={setState}>
    <DialogTrigger>
      <Button size="sm" disabled={currentUser === null}>Post Listing</Button>
    </DialogTrigger>
    <DialogContent>
      <AddListing getData={getData} onOpenChange={setState} />
    </DialogContent>
  </Dialog>
}

const AddListing = ({
  onOpenChange,
  getData
}: {
  onOpenChange: (open: boolean) => void,
  getData: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Uploading listing");
    try {
      const formData = new FormData(e.currentTarget);
      const pet_name = formData.get("name") as string;
      const location = formData.get("location") as string;
      const image = formData.get("image") as File;
      const petType = formData.get("pet_type") as string;
      const petGender = formData.get("pet_gender") === "male"
      const unix = Math.floor(Date.now() / 1000);
      await insert("lost_and_found_listings", {
        pet_name,
        location,
        image: unix,
        pet_type: petType,
        pet_gender: petGender,
      });
      await upload("lost-and-founds", `images/${unix}`, image);
      toast.success("Listing uploaded successfully!");
      onOpenChange(false);
      getData();
    } catch (error) {
      console.error("Error uploading listing:", error);
      toast.error("An error occurred while signing up. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return <form onSubmit={handle}>
    {loading && <Spinner message={loading} />}
    <div className="flex flex-col gap-6">
      <div className="grid grid-flow-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Pet Name"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" type="text" required />
        </div>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="image">Image</Label>
        <Input id="image" name="image" type="file" required />
      </div>
      <div className="grid grid-flow-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="pet_type">Pet Type</Label>
          <Select name="pet_type" defaultValue="cat">
            <SelectTrigger className="w-full">
              <SelectValue id="pet_type" placeholder="Pet Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
              <SelectItem value="rabbit">Rabbit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" defaultValue="male">
            <SelectTrigger className="w-full">
              <SelectValue id="gender" placeholder="Pet Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-end items-center">
        <Button type="submit" className="w-fit">
          Add Listing
        </Button>
      </div>
    </div>
  </form>
}

export default Team05Page;
