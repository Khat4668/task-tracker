import KanbanColumn from "@/components/KanbanColumn/KanbanColumn";
import type { Issue, Status } from "@/types";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
import { DragDropProvider } from "@dnd-kit/react";
import { useKanbanDnd } from "./useKanbanDnd";

type Props = {
  issues: Issue[];
};

const statuses: Status[] = ["backlog", "in_progress", "review", "done"];

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
