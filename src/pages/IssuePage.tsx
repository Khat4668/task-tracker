import DeleteIssueDialog from "@/components/DeleteIssueDialog/DeleteIssueDialog";
import EditableText from "@/components/EditableText/EditableText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const priorityColors = {
  low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

const statusLabels = {
  backlog: "Backlog",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

const IssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { issue, isLoading } = useGetIssuesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      issue: data?.find((i) => i.id === id),
      isLoading,
    }),
  });

  if (isLoading) {
    return (
      <div className="p-8 text-sm text-muted-foreground">Loading issue...</div>
    );
  }

  if (!issue) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">Issue not found</p>
        <Button variant="outline" size="sm" onClick={() => navigate("/board")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to board
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2 text-muted-foreground"
        onClick={() => navigate("/board")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Board
      </Button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px]">
        <div>
          <span className="font-mono text-xs text-muted-foreground">
            {issue.id.slice(0, 8).toUpperCase()}
          </span>

          <EditableText
            value={issue.title}
            className={"mt-1 text-2xl font-semibold tracking-tight"}
          />

          <Separator className="my-6" />

          <div className="text-sm leading-relaxed text-foreground/80">
            {issue.description || (
              <span className="italic text-muted-foreground">
                No description added
              </span>
            )}
          </div>
        </div>

        <div className="space-y-5 border-t pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Status
            </p>
            <Badge variant="outline">{statusLabels[issue.status]}</Badge>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Priority
            </p>
            <Badge
              className={priorityColors[issue.priority] ?? ""}
              variant="outline"
            >
              {issue.priority}
            </Badge>
          </div>

          {issue.tag && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                Tag
              </p>
              <span className="inline-flex items-center gap-1 text-sm">
                <TagIcon className="h-3.5 w-3.5" /> {issue.tag}
              </span>
            </div>
          )}

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Created
            </p>
            <span className="inline-flex items-center gap-1 text-sm text-foreground/80">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(issue.created_at).toLocaleDateString("en-US")}
            </span>
          </div>

          <Separator />

          <DeleteIssueDialog issueId={issue.id} />
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
