import { storage } from "./supabase";

const upload = async (bucket: string, filePath: string, file: File) => {
  const { data, error } = await storage.from(bucket).upload(filePath, file);
  if (error) throw error;
  return data;
};

const getPublicUrls = async (bucket: string, path: string) => {
  return storage
    .from(bucket)
    .list(path)
    .then(async (files) => {
      if (files.error) throw files.error;
      const publicUrls = files.data.map((file) => {
        return storage.from(bucket).getPublicUrl(`${path}/${file.name}`).data
          .publicUrl;
      });
      return publicUrls;
    })
    .catch((error) => {
      console.error("Error fetching public URLs:", error);
      throw error;
    });
};

export { upload, getPublicUrls };
