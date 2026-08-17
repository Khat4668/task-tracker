import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { priorityColors, priorityLabels } from "@/lib/issue-constants";
import type { Issue } from "@/types";
import { useSortable } from "@dnd-kit/react/sortable";
import { memo } from "react";
import { useNavigate } from "react-router";

type Props = {
  issue: Issue;
  index: number;
};

const IssueCard = memo(({ issue, index }: Props) => {
  const navigate = useNavigate();

  const { ref } = useSortable({
    id: issue.id,
    index,
    group: issue.status,
    type: "item",
  });
  return (
    <Card
      ref={ref}
      className="w-full min-w-0 outline-none focus-visible:ring-ring"
      onClick={() => navigate(`/issues/${issue.id}`)}
    >
      <CardContent className="px-4">
        <p className="mb-2 wrap-anywhere">{issue.title}</p>
        <div className="flex gap-2 mb-2">
          <Badge className={priorityColors[issue.priority]} variant="outline">
            {priorityLabels[issue.priority]}
          </Badge>
          {issue.tag && (
            <Badge className="bg-muted text-muted-foreground">
              {issue.tag}
            </Badge>
          )}
        </div>
        <p className="text-xs">
          Created {new Date(issue.created_at).toLocaleDateString("en-US")}
        </p>
      </CardContent>
    </Card>
  );
});

export default IssueCard;
