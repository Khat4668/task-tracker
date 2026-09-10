import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { priorityColors, priorityLabels } from "@/lib/issue-constants";
import { cn } from "@/lib/utils";
import type { Issue } from "@/types";
import { useSortable } from "@dnd-kit/react/sortable";
import { Calendar } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";

type Props = {
  issue: Issue;
  index: number;
};

const IssueCard = memo(({ issue, index }: Props) => {
  const { ref, isDragging } = useSortable({
    id: issue.id,
    index,
    group: issue.status,
    type: "item",
  });
  return (
    <Card
      ref={ref}
      className={cn(
        "w-full min-w-0 relative cursor-pointer transition-colors hover:bg-surface-raised outline-none focus-visible:ring-ring",
        isDragging &&
          "bg-surface-raised border-white/10 shadow-[0_20px_50px_-16px_rgba(0,0,0,1)]",
      )}
      aria-label={`Drag ${issue.title}`}
    >
      <Link
        to={`/issues/${issue.id}`}
        draggable={false}
        className="absolute inset-0 rounded-[inherit] select-none [-webkit-touch-callout:none] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label={issue.title}
      />
      <CardContent className="px-4">
        <p className="mb-2 wrap-anywhere">{issue.title}</p>
        <div className="flex gap-2 mb-3">
          <Badge className={priorityColors[issue.priority]} variant="outline">
            {priorityLabels[issue.priority]}
          </Badge>
          {issue.tag && (
            <Badge
              variant="outline"
              className="text-muted-foreground border-white/15"
            >
              {issue.tag}
            </Badge>
          )}
        </div>
        <div className="flex gap-2 items-center text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" aria-hidden />
          <p className="text-xs">
            Created {new Date(issue.created_at).toLocaleDateString("en-US")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

export default IssueCard;
