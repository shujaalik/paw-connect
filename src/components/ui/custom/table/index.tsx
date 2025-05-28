import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const MyTable = ({
    caption,
    headings,
    rows,
}: {
    caption?: string;
    headings: string[];
    rows: Array<Array<string | number>>;
}) => {
    return <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
            <TableRow>
                {headings.map((heading, index) => (
                    <TableHead key={index} className={index === 0 ? "w-[100px]" : ""}>
                        {heading}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex === 0 ? "w-[100px]" : ""}>
                    {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export default MyTable;