export type Status = "backlog" | "in_progress" | "review" | "done";
export type Priority = "low" | "medium" | "high";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tag: string;
  created_at: string;
  user_id: string;
};
