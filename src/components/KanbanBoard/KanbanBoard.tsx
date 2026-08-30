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
      {...dndHandlers}
      sensors={(defaults) => [
        ...defaults.filter((sensor) => sensor !== PointerSensor),
        PointerSensor.configure({
          activationConstraints(event) {
            if (event.pointerType === "touch") {
              return [
                new PointerActivationConstraints.Delay({
                  value: 250,
                  tolerance: 5,
                }),
              ];
            }
            return [new PointerActivationConstraints.Distance({ value: 12 })];
          },
          preventActivation: (event) =>
            event.target instanceof Element &&
            event.target.closest("button, input, select, textarea") !== null,
        }),
      ]}
    >
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
