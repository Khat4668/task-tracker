import type { Issue } from "@/types/";
import { supabase } from "./supabase";

export const getIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase.from("issues").select("*");
  if (error) throw error;

  return data;
};
