import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://hmvtacvdmzeevhieywgo.supabase.co",
  import.meta.env.VITE_API_SUPABASE_ANON_KEY || "NONE",
);

const { auth, storage } = supabase;

export default supabase;
export { auth, storage };
