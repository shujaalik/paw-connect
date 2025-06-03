import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner";
import Spinner from "../../spinner"
import { signin, signup } from "@/components/api/auth"

const Login = ({
    onOpenChange,
    ...props
}: {
    onOpenChange: (open: boolean) => void,
    [key: string]: any
}) => {
    const [loading, setLoading] = useState<string | null>(null);
    const [option, setOption] = useState<"signin" | "signup">("signin");
    return <div className={"flex flex-col gap-6"} {...props}>
        {loading && <Spinner message={loading} />}
        <DialogContent>
            <DialogHeader className="text-left">
                <DialogTitle>{option === "signin" ? "Login to your account" : "Create a new account"}</DialogTitle>
                <DialogDescription>
                    {option === "signin" ? "Enter your email below to login to your account" : "Enter your email below to create a new account"}
                </DialogDescription>
            </DialogHeader>
            {option === "signin" ? <SignIn onOpenChange={onOpenChange} setLoading={setLoading} stateChange={setOption} /> : <SignUp onOpenChange={onOpenChange} setLoading={setLoading} stateChange={setOption} />}
        </DialogContent>
    </div>
}

const SignUp = ({
    onOpenChange,
    stateChange,
    setLoading
}: {
    onOpenChange: (open: boolean) => void,
    stateChange: React.Dispatch<React.SetStateAction<"signin" | "signup">>,
    setLoading: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const handle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading("Creating account...");
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const re_password = formData.get("re_password") as string;
            if (!email || !password || !re_password) {
                toast.error("All fields are required");
                return;
            }
            if (password !== re_password) {
                toast.error("Passwords do not match");
                return;
            }
            await signup(email, password);
            // e.currentTarget.reset();
            toast.success("Account created successfully!");
            stateChange("signin");
            onOpenChange(false);
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("An error occurred while signing up. Please try again.");
        } finally {
            setLoading(null);
        }
    }

    return <form onSubmit={handle}>
        <div className="flex flex-col gap-6">
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="re_password">Confirm Password</Label>
                <Input id="re_password" name="re_password" type="password" required />
            </div>
            <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </div>
        </div>
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <span onClick={() => stateChange("signin")} className="underline underline-offset-4">
                Sign in
            </span>
        </div>
    </form>

}

const SignIn = ({
    onOpenChange,
    stateChange,
    setLoading
}: {
    onOpenChange: (open: boolean) => void,
    stateChange: React.Dispatch<React.SetStateAction<"signin" | "signup">>,
    setLoading: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const handle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading("Logging in...");
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            if (!email || !password) {
                toast.error("All fields are required");
                return;
            }
            // Call your login API here
            await signin(email, password);
            // e.currentTarget.reset();
            toast.success("Logged in successfully!");
            onOpenChange(false);
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred while logging in. Please try again.");
        } finally {
            setLoading(null);
        }
    }
    return <form onSubmit={handle}>
        <div className="flex flex-col gap-6">
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-3">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </a> */}
                </div>
                <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </div>
        </div>
        <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span onClick={() => stateChange("signup")} className="underline underline-offset-4">
                Sign up
            </span>
        </div>
    </form>
}

export default Login