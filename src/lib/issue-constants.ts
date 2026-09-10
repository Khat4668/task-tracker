import type { Enums } from "@/types/database";

export type Status = Enums<"issue_status">;
export type Priority = Enums<"issue_priority">;

export const statuses = [
  "backlog",
  "in_progress",
  "review",
  "done",
] as const satisfies readonly Status[];

export const priorities = [
  "low",
  "medium",
  "high",
] as const satisfies readonly Priority[];

export const statusLabels: Record<Status, string> = {
  backlog: "Backlog",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const priorityColors: Record<Priority, string> = {
  low: "text-sky-400 border-sky-500/40",
  medium: "text-amber-400 border-amber-500/40",
  high: "text-red-400 border-orange-500/40",
};

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
