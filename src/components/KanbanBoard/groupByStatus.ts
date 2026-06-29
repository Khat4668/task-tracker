import type { Issue, Status } from "@/types";

export const groupByStatus = (issues: Issue[]): Record<Status, Issue[]> => {
  const initial: Record<Status, Issue[]> = {
    backlog: [],
    in_progress: [],
    review: [],
    done: [],
  };
  const grouped = issues.reduce((acc, item) => {
    acc[item.status].push(item);
    return acc;
  }, initial);

  (Object.keys(grouped) as Status[]).forEach((status) => {
    grouped[status].sort((a, b) => a.position - b.position);
  });

  return grouped;
};
