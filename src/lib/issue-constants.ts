import type { Priority, Status } from "@/types";

export const priorityColors: Record<Priority, string> = {
  low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

export const statusLabels: Record<Status, string> = {
  backlog: "Backlog",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const statuses = Object.keys(statusLabels) as Status[];
export const priorities = Object.keys(priorityColors) as Priority[];
