import dogBanner from "@/assets/dog-banner.png"
import BirdBanner from "@/assets/bird-banner.png"
import rabbitBanner from "@/assets/rabbit-banner.png"
import AdoptImage from "@/assets/adopt.png"
import Shelter from "@/assets/shelter.png"
import Listing1 from "@/assets/listing-1.png"
import Listing2 from "@/assets/listing-2.png"
import Listing3 from "@/assets/listing-3.png"
import Lost from "@/assets/lost.png"
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card"

const BANNERS = [
    dogBanner,
    BirdBanner,
    rabbitBanner
];

const Home = () => {
    const [bannerIndex, setBannerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
        }, 5000); // Change banner every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return <div className="flex flex-col gap-7 w-full items-center justify-center">
        <div className="w-full h-30" style={{
            backgroundImage: `url(${BANNERS[bannerIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px'
        }} />

        <div className="flex flex-col gap-3 w-full">
            <p className="font-teko text-4xl font-semibold">Services</p>
            <div className="flex gap-5 justify-center items-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <img className="rounded-full w-auto h-20" src={AdoptImage} />
                    <p className="font-semibold text-center">Adoptions</p>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <img className="rounded-full w-auto h-20" src={Shelter} />
                    <p className="font-semibold text-center">Shelter</p>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <img className="rounded-full w-auto h-20" src={Lost} />
                    <p className="font-semibold text-center">Lost&Found</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
            <p className="font-teko text-4xl font-semibold">Adoption Listings</p>
            <div className="overflow-x-auto w-full flex gap-5 px-2 w-full">
                {/* <div className="w-full flex gap-5 whitespace-nowrap"> */}
                <Listing
                    gender="Male"
                    name="Bruno"
                    animal="Dog"
                    image={Listing1}
                    location="Karachi, PK"
                />
                <Listing
                    gender="Female"
                    name="Oreo"
                    animal="Cat"
                    image={Listing2}
                    location="Hyderabad, PK"
                />
                <Listing
                    gender="Male"
                    name="Bunny"
                    animal="Rabbit"
                    image={Listing3}
                    location="Karachi, PK"
                />
            </div>
            {/* </div> */}
        </div>
    </div>
}

const Listing = ({
    name,
    animal,
    gender,
    image,
    location,
}: {
    name: string;
    animal: string;
    gender: string;
    image: string;
    location: string;
}) => {
    return <Card className="min-w-[250px] w-fit h-auto flex gap-2 p-4 flex-shrink-0">
        <img src={image} alt={name} className="w-auto h-40 rounded" />
        <div className="flex gap-3">
            <div className="flex flex-col justify-center">
                <p className="font-semibold font-teko text-3xl">{name}</p>
                <p className="text-md text-gray-500">{animal}</p>
            </div>
        </div>
        <div className="flex justify-between mt-auto">
            <p className="text-xs text-gray-400">{location}</p>
            <p className="text-xs text-gray-400">{gender}</p>
        </div>
    </Card>
}

export default Home