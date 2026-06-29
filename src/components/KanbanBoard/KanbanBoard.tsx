import KanbanColumn from "@/components/KanbanColumn/KanbanColumn";
import { useUpdateIssueMutation } from "@/store/issuesApi";
import type { Issue, Status } from "@/types";
import { move } from "@dnd-kit/helpers";
import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useEffect, useRef, useState } from "react";
import { groupByStatus } from "./groupByStatus";

type Props = {
  issues: Issue[];
};

const KanbanBoard = ({ issues }: Props) => {
  const statuses: Status[] = ["backlog", "in_progress", "review", "done"];

  const [updateIssue] = useUpdateIssueMutation();

  const [columns, setColumns] = useState(() => groupByStatus(issues));

  const isDragging = useRef(false);

  useEffect(() => {
    if (isDragging.current) return;

    setColumns(groupByStatus(issues));
  }, [issues]);

  const handleDragEnd = async (event: DragEndEvent) => {
    isDragging.current = false;
    if (event.canceled) return;

    const { source } = event.operation;
    if (!isSortable(source)) return;

    const found = Object.entries(columns).find(([, items]) =>
      items.some((issue) => issue.id === source.id),
    );

    if (!found) return;

    const [destStatus, destItems] = found;

    const realIndex = destItems.findIndex((issue) => issue.id === source.id);

    const prev = destItems[realIndex - 1];
    const next = destItems[realIndex + 1];

    let position: number;

    if (!prev && !next) {
      position = 1;
    } else if (!prev) {
      position = next.position / 2;
    } else if (!next) {
      position = prev.position + 1;
    } else {
      position = (prev.position + next.position) / 2;
    }

    try {
      await updateIssue({
        id: source.id as string,
        status: destStatus as Status,
        position,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update issue:", error);
    }
  };

  return (
    <DragDropProvider
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragOver={(event) => {
        const { source, target } = event.operation;
        if (!target || source?.id === target?.id) return;
        setColumns((columns) => move(columns, event));
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full">
        {statuses.map((item) => {
          return (
            <KanbanColumn key={item} status={item} issues={columns[item]} />
          );
        })}
      </div>
    </DragDropProvider>
  );
};
export default KanbanBoard;
