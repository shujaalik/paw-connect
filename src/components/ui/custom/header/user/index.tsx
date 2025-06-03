import { Avatar, AvatarImage } from "@/components/ui/avatar"
import GetUser from "../../../../hooks/GetUser"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import Login from "./login-modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const User = () => {
    const [state, setState] = useState(false);
    const currentUser = GetUser();

    return !currentUser ? <Dialog open={state} onOpenChange={setState}>
        <DialogTrigger>
            <Button>Login</Button>
        </DialogTrigger>
        <Login onOpenChange={setState} />
    </Dialog> : <div className="p-1 flex items-center rounded-full bg-white shadow-md">
        <div>
            <Avatar className="h-10 w-auto">
                <AvatarImage src={"https://github.com/shadcn.png"} />
            </Avatar>
        </div>
        <div className="text-left flex-col justify-center items-start mx-2 font-teko tracking-wider">
            <h1 className="font-semibold text-md opacity-80">Welcome Back!</h1>
            <p className="text-sm text-muted-foreground">
                {currentUser.email}
            </p>
        </div>
    </div>
}

export default User