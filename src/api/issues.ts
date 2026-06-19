import type { IssueFormData } from "@/components/CreateIssueModal/schema";
import type { Issue } from "@/types/";
import { supabase } from "./supabase";

export const getIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase.from("issues").select("*");
  if (error) throw error;

  return data;
};

export const createIssue = async (issue: IssueFormData) => {
  const { data, error } = await supabase
    .from("issues")
    .insert(issue)
    .select()
    .single();

  if (error) throw error;

  return data;
};
