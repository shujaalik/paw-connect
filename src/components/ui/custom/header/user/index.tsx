import { Avatar, AvatarImage } from "@/components/ui/avatar"
import GetUser from "../../../../hooks/GetUser"
import NAUser from "@/assets/na-user.png"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import Login from "./login-modal"

const User = () => {
    const currentUser = GetUser();

    return <Dialog>
        <DialogTrigger>
            <div className="p-1 flex items-center rounded-full bg-white shadow-md">
                <div>
                    <Avatar className="h-10 w-auto">
                        <AvatarImage src={currentUser ? "https://github.com/shadcn.png" : NAUser} />
                    </Avatar>
                </div>
                <div className="text-left flex-col justify-center items-start mx-2 font-teko tracking-wider">
                    <h1 className="font-semibold text-md opacity-80">{currentUser ? "Welcome Back!" : "Login/Signup"}</h1>
                    <p className="text-sm text-muted-foreground">
                        {currentUser?.email || ""}
                    </p>
                </div>
            </div>
        </DialogTrigger>
        <Login />
    </Dialog>
}

export default User