import { useUpdateIssueMutation } from "@/store/issuesApi";
import type { Issue, Status } from "@/types";
import { move } from "@dnd-kit/helpers";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useEffect, useRef, useState } from "react";
import { calculatePosition } from "./calculatePosition";
import { groupByStatus } from "./groupByStatus";

export const useKanbanDnd = (issues: Issue[]) => {
  const [updateIssue] = useUpdateIssueMutation();

  const [columns, setColumns] = useState(() => groupByStatus(issues));

  const isDragging = useRef(false);

  useEffect(() => {
    if (isDragging.current) return;

    setColumns(groupByStatus(issues));
  }, [issues]);

  const onDragStart = () => {
    isDragging.current = true;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { source, target } = event.operation;
    if (!target || source?.id === target?.id) return;
    setColumns((columns) => move(columns, event));
  };

  const onDragEnd = async (event: DragEndEvent) => {
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

    const position = calculatePosition(
      destItems[realIndex - 1]?.position,
      destItems[realIndex + 1]?.position,
    );

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

  return {
    columns,
    dndHandlers: { onDragStart, onDragOver, onDragEnd },
  };
};
