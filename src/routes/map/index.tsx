import { get } from "@/components/api/db";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
    width: "100%",
    height: "100%",
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

    return <div className="rounded h-full w-full overflow-hidden">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_API_GOOGLE_MAPS_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
                {welfares.map((marker) => (
                    <Marker key={marker.id} position={marker.position} title={marker.name} />
                ))}
            </GoogleMap>
        </LoadScript>
    </div>
}

export default Map