export const statuses = ["backlog", "in_progress", "review", "done"] as const;
export const priorities = ["low", "medium", "high"] as const;

export type Status = (typeof statuses)[number];
export type Priority = (typeof priorities)[number];

export const statusLabels: Record<Status, string> = {
  backlog: "Backlog",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const priorityColors: Record<Priority, string> = {
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

export const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
