import type { Issue, Status } from "@/types";
import IssueCard from "../IssueCard/IssueCard";

type Props = {
  status: Status;
  issues: Issue[];
};

const KanbanColumn = ({ status, issues }: Props) => {
  const statusLabels = {
    backlog: "Backlog",
    in_progress: "In Progress",
    review: "Review",
    done: "Done",
  };

  return (
    <div className="bg-[#0f1010] p-4 rounded-[14px] flex-1 h-full">
      <div className="flex gap-2 items-center mb-4">
        <div className="text-base">{statusLabels[status]}</div>
        <div className="text-xs text-gray-400">{issues.length}</div>
      </div>

      <div className="grid gap-4">
        {issues.map((issue) => {
          return <IssueCard key={issue.id} issue={issue} />;
        })}
      </div>
    </div>
  );
};
export default KanbanColumn;
