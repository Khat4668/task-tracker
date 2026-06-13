import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Issue } from "@/types";

type Props = {
  issue: Issue;
};

const IssueCard = ({ issue }: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pl-4 pr-4">
        <p className="mb-2">{issue.title}</p>
        <div className="flex gap-2 mb-2">
          <Badge>{issue.priority}</Badge>
          <Badge>{issue.tag}</Badge>
        </div>
        <p className="text-xs">Created {issue.created_at}</p>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
