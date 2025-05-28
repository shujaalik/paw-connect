import { useEffect, useState } from "react"
import { auth } from "../api/supabase";
import type { User } from "@supabase/supabase-js";

const GetUser = () => {
    const [state, setState] = useState<User | null>(null);

    useEffect(() => {
        auth.getSession().then(({ data: { session } }) => {
            setState(session?.user || null);
        })
        const {
            data: { subscription },
        } = auth.onAuthStateChange((_event, session) => {
            setState(session?.user || null);
        })
        return () => subscription.unsubscribe()
    }, []);

    return state;
}

export default GetUser