import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Status } from "@/lib/issue-constants";
import { statuses, statusLabels } from "@/lib/issue-constants";
import { cn } from "@/lib/utils";

const CARD_COUNTS: Record<Status, number> = {
  backlog: 3,
  in_progress: 2,
  review: 4,
  done: 2,
};

const TITLE_WIDTHS = ["w-4/5", "w-full", "w-3/5"];

const KanbanBoardSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Loading issues"
      className="flex gap-4 flex-1 min-h-0"
    >
      {statuses.map((status) => (
        <div
          key={status}
          aria-hidden
          className="bg-column p-4 rounded-[14px] flex-1 flex flex-col min-h-0"
        >
          <div className="flex gap-2 items-center mb-4 shrink-0">
            <div className="text-base">{statusLabels[status]}</div>
            <Skeleton className="h-4 w-3" />
          </div>

          <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
            {Array.from({ length: CARD_COUNTS[status] }).map((_, cardIndex) => (
              <Card key={cardIndex} className="w-full min-w-0 shrink-0">
                <CardContent className="px-4">
                  <Skeleton
                    className={cn(
                      "h-5 mb-2",
                      TITLE_WIDTHS[cardIndex % TITLE_WIDTHS.length],
                    )}
                  />
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-12 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-27" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoardSkeleton;
