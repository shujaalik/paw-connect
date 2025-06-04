import supabase from "./supabase";

const get = async (table: string, query?: string) => {
  const { data, error } = await supabase.from(table).select(query);
  if (error) throw error;
  return data;
};

const insert = async (table: string, values: Record<string, any>) => {
  const { data, error } = await supabase.from(table).insert(values);
  if (error) throw error;
  return data;
};

export { get, insert };
