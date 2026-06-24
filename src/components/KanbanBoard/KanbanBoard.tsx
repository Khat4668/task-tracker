import KanbanColumn from "@/components/KanbanColumn/KanbanColumn";
import { useUpdateIssueMutation } from "@/store/issuesApi";
import type { Issue, Status } from "@/types";
import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";

type Props = {
  issues: Issue[];
};

const KanbanBoard = ({ issues }: Props) => {
  const statuses: Status[] = ["backlog", "in_progress", "review", "done"];

  const [updateIssue] = useUpdateIssueMutation();

  const handleDragEnd = async (event: DragEndEvent) => {
    const sourceId = event.operation.source?.id;
    const targetId = event.operation.target?.id;

    if (event.canceled) return;
    if (!sourceId || !targetId) return;

    try {
      await updateIssue({
        id: sourceId as string,
        status: targetId as Status,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update issue:", error);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
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
    </DragDropProvider>
  );
};
export default KanbanBoard;
