import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const User = () => {
    return <Button variant="outline" className="p-1 flex bg-accent rounded-full">
        <div>
            <Avatar className="w-auto">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex-col justify-center items-start mx-2 font-teko tracking-wider">
            <h1 className="font-semibold">Chandan Kumar</h1>
            <p className="text-sm text-muted-foreground">
                chandan@any.com
            </p>
        </div>
    </Button>
}

export default User