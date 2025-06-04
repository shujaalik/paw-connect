import { Button } from "@/components/ui/button";
import type { IconType } from "react-icons/lib";
import { PiBird, PiCat, PiDog, PiRabbit } from "react-icons/pi";
import { Separator } from "@/components/ui/separator"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Spinner from "@/components/ui/custom/spinner";
import { toast } from "sonner";
import { insert } from "@/components/api/db";
import { upload } from "@/components/api/storage";

const Adoptions = () => {
    const [state, setState] = useState(false);

    return <div className="py-5 flex w-full h-full flex-col gap-5">
        <div>
            <p className="font-teko text-2xl font-semibold mb-2">Categories</p>
            <div className="flex w-full justify-around items-center gap-5">
                <Category title={"Cat"} Icon={PiCat} />
                <Category title={"Dog"} Icon={PiDog} />
                <Category title={"Rabbit"} Icon={PiRabbit} />
                <Category title={"Bird"} Icon={PiBird} />
            </div>
        </div>
        <Separator />
        <div>
            <div className="w-full flex w-full justify-between items-center gap-5">
                <p className="font-teko text-xl font-semibold mb-2">Listings</p>
                <div>
                    <Dialog open={state} onOpenChange={setState}>
                        <DialogTrigger>
                            <Button>Upload</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <AddListing onOpenChange={setState} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
            </div>
        </div>
    </div>
}

const AddListing = ({
    onOpenChange,
}: {
    onOpenChange: (open: boolean) => void,
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
            await insert("adoption_listings", {
                pet_name,
                location,
                image: image.name,
                pet_type: petType,
                pet_gender: petGender,
            });
            await upload("adoptions", `images/${image.name}`, image);
            toast.success("Listing uploaded successfully!");
            onOpenChange(false);
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

const Category = ({
    Icon,
    title,
}: {
    Icon: IconType;
    title: string;
}) => {
    return <div className="border-2 text-primary shadow w-15 h-15 bg-white/60 border-primary rounded flex flex-col gap-1 items-center justify-center">
        <Icon className="text-2xl" />
        <p className="font-semibold text-sm">{title}</p>
    </div>
}

export default Adoptions