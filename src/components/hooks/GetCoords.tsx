import { useEffect, useState } from "react";

const GetCoords = () => {
    const [coords, setCoords] = useState<{ long: number; lat: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        long: position.coords.longitude,
                        lat: position.coords.latitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setCoords(null);
                }
            );
        }
    }, []);

    return coords;
}

export default GetCoords