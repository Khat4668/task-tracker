import KanbanColumn from "@/components/KanbanColumn/KanbanColumn";
import { statuses } from "@/lib/issue-constants";
import type { Issue } from "@/types";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { DragDropProvider } from "@dnd-kit/react";
import { useKanbanDnd } from "./useKanbanDnd";

type Props = {
  issues: Issue[];
};

const KanbanBoard = ({ issues }: Props) => {
  const { columns, dndHandlers } = useKanbanDnd(issues);

  return (
    <DragDropProvider
      sensors={(defaults) => [
        ...defaults.filter((sensor) => sensor !== PointerSensor),
        PointerSensor.configure({
          activationConstraints: [
            new PointerActivationConstraints.Distance({ value: 6 }),
          ],
        }),
      ]}
      {...dndHandlers}
    >
      <div className="flex flex-1 min-h-0 gap-3 overflow-x-auto -mx-4 px-7 md:mx-0 md:px-0 md:gap-4">
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
