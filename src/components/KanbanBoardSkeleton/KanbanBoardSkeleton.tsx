import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Status } from "@/lib/issue-constants";
import { statuses, statusIcons, statusLabels } from "@/lib/issue-constants";
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
      className="flex flex-1 min-h-0 gap-3 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:gap-4"
    >
      {statuses.map((status) => {
        const Icon = statusIcons[status];

        return (
          <div
            key={status}
            aria-hidden
            className="bg-column p-4 rounded-[14px] border border-border flex flex-col min-h-0 w-[78vw] shrink-0 md:w-auto md:flex-1 md:min-w-70"
          >
            <div className="flex gap-2 items-center shrink-0 border-b border-border -mx-4 px-4 pb-4 mb-4">
              <Icon className="w-5 h-5" aria-hidden />
              <div className="text-base">{statusLabels[status]}</div>
              <Skeleton className="h-5 w-6 rounded-md" />
            </div>

            <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden py-px px-px -mx-px">
              {Array.from({ length: CARD_COUNTS[status] }).map(
                (_, cardIndex) => (
                  <Card key={cardIndex} className="w-full min-w-0 shrink-0">
                    <CardContent className="px-4">
                      <Skeleton
                        className={cn(
                          "h-5 mb-2",
                          TITLE_WIDTHS[cardIndex % TITLE_WIDTHS.length],
                        )}
                      />
                      <div className="flex gap-2 mb-3">
                        <Skeleton className="h-5 w-16 rounded-md" />
                        <Skeleton className="h-5 w-12 rounded-md" />
                      </div>
                      <div className="flex gap-2 items-center">
                        <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                        <Skeleton className="h-4 w-25" />
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoardSkeleton;
