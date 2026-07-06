import type { IssueFormData } from "@/components/CreateIssueModal/schema";
import type { Issue, Status } from "@/types";
import { supabase } from "./supabase";

export type UpdateIssueParams = {
  id: string;
  status: Status;
  position: number;
};

export const getIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .order("position");

  if (error) throw error;
  return data;
};

export const createIssue = async (issue: IssueFormData) => {
  const { data: maxData } = await supabase
    .from("issues")
    .select("position")
    .eq("status", issue.status)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = maxData ? maxData.position + 1 : 1;

  const { data, error } = await supabase
    .from("issues")
    .insert({ ...issue, position })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateIssue = async ({
  id,
  status,
  position,
}: UpdateIssueParams) => {
  const { data, error } = await supabase
    .from("issues")
    .update({ status, position })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteIssue = async (id: string) => {
  const { data, error } = await supabase
    .from("issues")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  if (!data.length) throw new Error("Issue not found or no permission");
  return data;
};
