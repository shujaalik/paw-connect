import { get } from "@/components/api/db";
import coords_to_distance from "@/components/functions/coords_to_distance";
import GetCoords from "@/components/hooks/GetCoords";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import MyTable from "@/components/ui/custom/table";
import { useEffect, useState } from "react";

const NGOList = () => {
    const [welfares, setWelfares] = useState<(string | number)[][]>([]);
    const my_coords = GetCoords();

    useEffect(() => {
        const func = async () => {
            const data = await get("welfare_directory");
            setWelfares(data.map((item_wt) => {
                const item: any = item_wt;
                const distance_coord = coords_to_distance(
                    my_coords?.lat || 0,
                    my_coords?.long || 0,
                    item.coord_x || 0,
                    item.coord_y || 0
                );
                return [
                    item.name,
                    item.services,
                    item.website || "",
                    `${distance_coord.toFixed(0)} KMs`,
                ]
            }));
        }
        func();
    }, [my_coords]);

    return <Card className="w-full">
        <CardHeader>
            <CardTitle>NGOs</CardTitle>
        </CardHeader>
        <CardContent>
            <MyTable headings={[
                "Name",
                "Services",
                "Website",
                "Distance",
            ]} rows={welfares} />
        </CardContent>
    </Card>

}

export default NGOList