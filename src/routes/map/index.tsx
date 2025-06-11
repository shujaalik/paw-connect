import { get } from "@/components/api/db";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const GOOGLE_KEY = import.meta.env.VITE_API_GOOGLE_MAPS_KEY;

const containerStyle = {
    width: "100%",
    height: "500px",
};
const center = {
    lat: 24.839662211720658,
    lng: 67.0822039331803,
};

const Map = () => {
    const [welfares, setWelfares] = useState<{
        name: string;
        position: { lat: number; lng: number };
        id: number;
    }[]>([]);

    useEffect(() => {
        const func = async () => {
            const data = await get("welfare_directory");
            setWelfares(data.map((item_wt, index) => {
                const item: any = item_wt;
                return {
                    name: item.name,
                    position: {
                        lat: item.coord_x || 0,
                        lng: item.coord_y || 0,
                    },
                    id: index,
                };
            }));
        }
        func();
    }, []);

    return <div className="py-30">
        <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
            <div className="text-center max-w-2xl mx-auto">
                <b className="text-center text-muted-foreground text-base font-semibold">
                    Help Nearby
                </b>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                    Find <span className="text-primary">Pet Help</span> Near You.
                </h2>
                <p className="mt-6 text-base sm:text-lg">
                    Locate nearby NGOs, non-profits, and essential services for any pet-related need. From rescues to veterinary support, find the help your pet deserves.
                </p>
            </div>
            <div className="rounded h-full w-full min-h-[500px] overflow-hidden">
                <LoadScript googleMapsApiKey={GOOGLE_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
                        {welfares.map((marker) => (
                            <Marker key={marker.id} position={marker.position} title={marker.name} />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    </div>
}

export default Map