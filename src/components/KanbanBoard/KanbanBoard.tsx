import type { Issue, Status } from "@/types";
import KanbanColumn from "../KanbanColumn/KanbanColumn";

type Props = {
  issues: Issue[];
};

const KanbanBoard = ({ issues }: Props) => {
  const statuses: Status[] = ["backlog", "in_progress", "review", "done"];

  return (
    <div className="flex gap-4 h-full">
      {statuses.map((item) => {
        return (
          <KanbanColumn
            key={item}
            status={item}
            issues={issues.filter((issue) => issue.status === item)}
          />
        );
      })}
    </div>
  );
};
export default KanbanBoard;
