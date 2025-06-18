import { get } from "@/components/api/db";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface Welfare {
    name: string;
    position: { lat: number; lng: number };
    id: number;
    services: string
};

const Map = () => {
    const [rawWelfares, setRawWelfares] = useState<Welfare[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredWelfares, setFilteredWelfares] = useState<Welfare[]>([]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredWelfares(rawWelfares);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = rawWelfares.filter(welfare =>
                welfare.name.toLowerCase().includes(query) ||
                welfare.services.toLowerCase().includes(query)
            );
            setFilteredWelfares(filtered);
        }
    }, [rawWelfares, searchQuery]);

    useEffect(() => {
        const func = async () => {
            const data = await get("welfare_directory");
            setRawWelfares(data.map((item_wt, index) => {
                const item: any = item_wt
                return {
                    name: item.name,
                    id: index,
                    position: {
                        lat: item.coord_x || 0,
                        lng: item.coord_y || 0,
                    },
                    services: item.services || "",
                }
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
            <div className="h-full w-full min-h-[500px] overflow-hidden grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full w-full pt-0 pb-2">
                    <ScrollArea className="h-full w-full">
                        <CardHeader className="px-4 pb-2 pt-4">
                            <CardTitle className="flex items-center justify-between">
                                <p>
                                    Welfare Directory
                                </p>
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-30"
                                />
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                List of all the welfares in the directory.
                            </CardDescription>
                        </CardHeader>
                        <ScrollArea className="h-[400px] w-full">
                            <div className="p-4 space-y-2">
                                {filteredWelfares.map((welfare) => (
                                    <div key={welfare.id} className="select-none p-2 border rounded-md transition-colors">
                                        <h3 className="font-semibold">{welfare.name}</h3>
                                        <p className="text-sm text-muted-foreground">{welfare.services}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </ScrollArea>
                </Card>
                <div className="rounded-xl border shadow-sm order-[-1] lg:col-span-2 sm:order-1">
                    <LoadScript googleMapsApiKey={GOOGLE_KEY}>
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
                            {filteredWelfares.map((marker) => (
                                <Marker key={marker.id} position={marker.position} title={marker.name} />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    </div>
}

export default Map