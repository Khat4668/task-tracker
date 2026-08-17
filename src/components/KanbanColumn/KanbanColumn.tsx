import IssueCard from "@/components/IssueCard/IssueCard";
import type { Status } from "@/lib/issue-constants";
import { statusLabels } from "@/lib/issue-constants";
import type { Issue } from "@/types";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";

type Props = {
  status: Status;
  issues: Issue[];
};

const KanbanColumn = ({ status, issues }: Props) => {
  const { ref } = useDroppable({
    id: status,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className="bg-[#0f1010] p-4 rounded-[14px] flex-1 flex flex-col min-h-0"
    >
      <div className="flex gap-2 items-center mb-4 shrink-0">
        <div className="text-base">{statusLabels[status]}</div>
        <div className="text-xs text-gray-400">{issues.length}</div>
      </div>

      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto *:shrink-0 pr-2 -mr-2 py-px pl-px -ml-px">
        {issues.map((issue, index) => {
          return <IssueCard key={issue.id} issue={issue} index={index} />;
        })}
      </div>
    </div>
  );
};
export default KanbanColumn;
