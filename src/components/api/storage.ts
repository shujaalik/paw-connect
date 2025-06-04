import { storage } from "./supabase";

const upload = async (bucket: string, filePath: string, file: File) => {
  const { data, error } = await storage.from(bucket).upload(filePath, file);
  if (error) throw error;
  return data;
};

export { upload };
