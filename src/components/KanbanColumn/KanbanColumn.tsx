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
    <div ref={ref} className="bg-[#0f1010] p-4 rounded-[14px] flex-1 h-full">
      <div className="flex gap-2 items-center mb-4">
        <div className="text-base">{statusLabels[status]}</div>
        <div className="text-xs text-gray-400">{issues.length}</div>
      </div>

      <div className="grid gap-4">
        {issues.map((issue, index) => {
          return <IssueCard key={issue.id} issue={issue} index={index} />;
        })}
      </div>
    </div>
  );
};
export default KanbanColumn;
