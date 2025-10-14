import { createClient } from "@supabase/supabase-js";
import path from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
);

export async function storageUpload(fileName: string, file: any) {
  const { data, error } = await supabase.storage.from("photos").upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  return path.resolve(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    "storage/v1/object/public/photos/",
    data.path,
  );
}

export const urlFor = (url: string) =>
  new URL(`storage/v1/object/public/${url}`, process.env.NEXT_PUBLIC_SUPABASE_URL!).href;
