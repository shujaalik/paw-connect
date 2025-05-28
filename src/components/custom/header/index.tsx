
const Header = () => {
    return <div className="flex w-full justify-between items-center">
        <div>
            {/* <Clock /> */}
            <h1 className="uppercase font-teko scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
                Paw Connect
            </h1>
            <p className="text-sm text-muted-foreground font-medium">A Digital Network for Stray and Homeless Animal Welfare</p>
        </div>
        <div className="flex justify-center items-center gap-4">
            {/* <ResetAll />
            <Button size={"icon"} variant={"outline"} onClick={toggleColorMode}>
                {theme === "dark" ? <IoSunnyOutline />
                    : <IoMoonOutline />}
            </Button> */}
        </div>
    </div>
}

export default Header