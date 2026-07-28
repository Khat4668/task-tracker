import type { UpdateIssueParams } from "@/api/issues";
import DeleteIssueDialog from "@/components/DeleteIssueDialog/DeleteIssueDialog";
import EditableMultilineText from "@/components/EditableMultilineText/EditableMultilineText";
import EditableText from "@/components/EditableText/EditableText";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { Priority, Status } from "@/lib/issue-constants";
import {
  priorities,
  priorityColors,
  priorityLabels,
  statusLabels,
  statuses,
} from "@/lib/issue-constants";
import { issueSchema } from "@/lib/issue-schema";
import { cn } from "@/lib/utils";
import { useGetIssuesQuery, useUpdateIssueMutation } from "@/store/issuesApi";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const triggerClass =
  "inline-flex w-fit items-center gap-1 rounded-4xl border border-border px-2 py-1 text-sm text-foreground transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:border-ring";

const IssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { issue, isLoading } = useGetIssuesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      issue: data?.find((i) => i.id === id),
      isLoading,
    }),
  });

  const [updateIssue] = useUpdateIssueMutation();

  const handleUpdateIssue = async ({ id, ...patch }: UpdateIssueParams) => {
    try {
      await updateIssue({
        id,
        ...patch,
      }).unwrap();
    } catch {
      toast.error("Failed to update issue");
    }
  };

  const validateTitle = (value: string): string | null => {
    const result = issueSchema.shape.title.safeParse(value);
    if (result.success) {
      return null;
    }

    return result.error.issues[0].message;
  };

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
            onSave={(title) => handleUpdateIssue({ id: issue.id, title })}
            validate={validateTitle}
            className={
              "mt-1 text-2xl font-semibold tracking-tight block w-full"
            }
            placeholder={"Issue title"}
          />

          <Separator className="my-6" />

          <EditableMultilineText
            value={issue.description ?? ""}
            onSave={(description) =>
              handleUpdateIssue({
                id: issue.id,
                description: description || null,
              })
            }
            className={"text-sm leading-relaxed text-foreground/80 w-full"}
            placeholder={"Add description..."}
          />
        </div>

        <div className="space-y-5 border-t pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Status
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(triggerClass, "hover:bg-muted")}
              >
                {statusLabels[issue.status]}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuRadioGroup
                  value={issue.status}
                  onValueChange={(status) =>
                    handleUpdateIssue({
                      id: issue.id,
                      status: status as Status,
                    })
                  }
                >
                  {statuses.map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {statusLabels[status]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Priority
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(triggerClass, priorityColors[issue.priority])}
              >
                {priorityLabels[issue.priority]}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuRadioGroup
                  value={issue.priority}
                  onValueChange={(priority) =>
                    handleUpdateIssue({
                      id: issue.id,
                      priority: priority as Priority,
                    })
                  }
                >
                  {priorities.map((priority) => (
                    <DropdownMenuRadioItem key={priority} value={priority}>
                      {priorityLabels[priority]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Tag
            </p>
            <div className="inline-flex items-center gap-1">
              <TagIcon className="h-3.5 w-3.5 shrink-0" />
              <EditableText
                value={issue.tag ?? ""}
                onSave={(tag) =>
                  handleUpdateIssue({ id: issue.id, tag: tag || null })
                }
                className={"text-sm"}
                placeholder={"Add tag"}
              />
            </div>
          </div>

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
