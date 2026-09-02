import type { IssueFormData } from "@/lib/issue-schema";
import type { Issue, IssueUpdate } from "@/types";
import { supabase } from "./supabase";

export type UpdateIssueParams = { id: string } & Omit<
  IssueUpdate,
  "id" | "created_at" | "user_id"
>;

export type CreateIssueParams = Omit<IssueFormData, "tag" | "description"> & {
  tag: string | null;
  description: string | null;
};

export const getIssues = async (): Promise<Issue[]> => {
  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .order("position");

  if (error) throw error;
  return data;
};

export const createIssue = async (issue: CreateIssueParams) => {
  const { data: minData, error: minError } = await supabase
    .from("issues")
    .select("position")
    .eq("status", issue.status)
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (minError) throw minError;

  const position = minData ? minData.position / 2 : 1;

  const { data, error } = await supabase
    .from("issues")
    .insert({ ...issue, position })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateIssue = async ({ id, ...patch }: UpdateIssueParams) => {
  const { data, error } = await supabase
    .from("issues")
    .update(patch)
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
