import KanbanColumn from "@/components/KanbanColumn/KanbanColumn";
import { statuses } from "@/lib/issue-constants";
import type { Issue } from "@/types";
import { DragDropProvider } from "@dnd-kit/react";
import { useKanbanDnd } from "./useKanbanDnd";

type Props = {
  issues: Issue[];
};

const KanbanBoard = ({ issues }: Props) => {
  const { columns, dndHandlers } = useKanbanDnd(issues);

  return (
    <DragDropProvider {...dndHandlers}>
      <div className="flex flex-1 min-h-0 gap-3 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:gap-4">
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
