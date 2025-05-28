import { Button } from "@/components/ui/button";
import User from "./user";
import { FiMenu } from "react-icons/fi";
import Logo from "@/assets/paw-connect-logo.png";

const Header = () => {

    return <div className="flex w-full justify-between items-center">
        <div>
            <Button variant={"outline"}>
                <FiMenu />
            </Button>
        </div>
        <div className="text-center">
            <img src={Logo} className="h-32 w-auto" />
            {/* <h1 className="uppercase font-teko scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
                Paw Connect
            </h1>
            <p className="text-sm text-muted-foreground font-medium">A Digital Network for Stray and Homeless Animal Welfare</p> */}
        </div>
        <div className="flex justify-center items-center gap-4">
            <User />
        </div>
    </div>
}

export default Header