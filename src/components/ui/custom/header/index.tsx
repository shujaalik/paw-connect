import User from "./user";
import Logo from "@/assets/paw-connect-logo.png";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {

    return <div className="flex w-full justify-between items-center">
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="border">Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>
                                <ul className="grid w-[300px] gap-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <div>
                                                <div className="font-medium">Components</div>
                                                <div className="text-muted-foreground">
                                                    Browse all components in the library.
                                                </div>
                                            </div>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <div>
                                                <div className="font-medium">Documentation</div>
                                                <div className="text-muted-foreground">
                                                    Learn how to use the library.
                                                </div>
                                            </div>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <div>
                                                <div className="font-medium">Blog</div>
                                                <div className="text-muted-foreground">
                                                    Read our latest blog posts.
                                                </div>
                                            </div>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        <div className="text-center">
            <img src={Logo} className="h-32 w-auto" />
        </div>
        <div className="flex justify-center items-center gap-4">
            <User />
        </div>
    </div>
}

export default Header