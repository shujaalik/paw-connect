import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="w-full flex items-center justify-center">
          <Logo small={false} />
        </div>
        <div className="w-full px-4">
          <NavMenu orientation="vertical" className="mt-12" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
