import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import GetUser from "../../../../hooks/GetUser"
import { Button } from "@/components/ui/button";

const User = () => {
    const currentUser = GetUser();
    console.log("🚀 ~ User ~ loggedIn:", currentUser)

    return !currentUser ? <Button>Login</Button>
        : <div className="p-1 flex items-center bg-accent rounded-full">
            <div>
                <Avatar className="h-10 w-auto">
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
        </div>
}

export default User