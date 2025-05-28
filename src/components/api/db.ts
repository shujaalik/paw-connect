import supabase from "./supabase";

const get = async (table: string, query?: string) => {
  const { data, error } = await supabase.from(table).select(query);
  if (error) throw error;
  return data;
};

export { get };
