import type { UpdateIssueParams } from "@/api/issues";
import DeleteIssueDialog from "@/components/DeleteIssueDialog/DeleteIssueDialog";
import EditableMultilineText from "@/components/EditableMultilineText/EditableMultilineText";
import EditableText from "@/components/EditableText/EditableText";
import EmptyState from "@/components/EmptyState/EmptyState";
import IssueDetailSkeleton from "@/components/IssueDetailSkeleton/IssueDetailSkeleton";
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
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  SearchX,
  Tag as TagIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const fieldClass =
  "-ml-2 inline-flex w-fit items-center gap-1 rounded-md border border-transparent px-2 py-1 text-base md:text-sm text-foreground transition-all hover:bg-muted/50";

const triggerClass = `${fieldClass} outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`;

const IssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { issue, isLoading, error } = useGetIssuesQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      issue: data?.find((i) => i.id === id),
      isLoading,
      error,
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

  const renderContent = () => {
    if (isLoading) return <IssueDetailSkeleton />;

    if (error && !issue) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={<AlertCircle className="w-6 h-6" />}
            title="Couldn't load issue"
            description="Something went wrong. Check your connection and try again."
            actionLabel="Back to board"
            onAction={() => navigate("/board")}
          />
        </div>
      );
    }

    if (!issue) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={<SearchX className="w-6 h-6" />}
            title="Issue not found"
            description="This issue may have been deleted."
            actionLabel="Back to board"
            onAction={() => navigate("/board")}
          />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <span className="font-mono text-xs text-muted-foreground">
            {issue.id.slice(0, 8).toUpperCase()}
          </span>

          <EditableText
            value={issue.title}
            onSave={(title) => handleUpdateIssue({ id: issue.id, title })}
            validate={validateTitle}
            className={
              "mt-1 mb-2 md:mb-6 -ml-2 text-2xl font-semibold tracking-tight w-full wrap-anywhere"
            }
            placeholder={"Issue title"}
          />

          <EditableMultilineText
            value={issue.description ?? ""}
            onSave={(description) =>
              handleUpdateIssue({
                id: issue.id,
                description: description || null,
              })
            }
            className={
              "text-base md:text-sm leading-relaxed text-foreground/80 w-full -ml-2"
            }
            placeholder={"Add description..."}
          />
        </div>

        <div className="space-y-4 md:space-y-5 border-t pt-6 md:border-t-0 md:pl-6 md:pt-0">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Status
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={triggerClass}
                aria-label={`Status: ${statusLabels[issue.status]}`}
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
                className={cn(
                  triggerClass,
                  priorityColors[issue.priority],
                  "border-transparent bg-transparent",
                )}
                aria-label={`Priority: ${priorityLabels[issue.priority]}`}
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
            <div
              className={cn(
                fieldClass,
                "transition-[border-color,box-shadow] has-[input]:hover:bg-transparent",
              )}
            >
              <TagIcon className="h-3.5 w-3.5 shrink-0" />
              <EditableText
                value={issue.tag ?? ""}
                onSave={(tag) =>
                  handleUpdateIssue({ id: issue.id, tag: tag || null })
                }
                className={"text-base md:text-sm px-0 py-0 border-0"}
                placeholder={"Add tag"}
                aria-label={`Tag: ${issue.tag || "empty"}`}
              />
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Created
            </p>
            <span className="inline-flex items-center gap-1 text-base md:text-sm text-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(issue.created_at).toLocaleDateString("en-US")}
            </span>
          </div>

          <Separator />

          <div className="-ml-2.5">
            <DeleteIssueDialog issueId={issue.id} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto min-h-full flex max-w-6xl flex-col px-4 py-4 md:px-8 md:py-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-3 md:mb-6 -ml-2.5 self-start text-muted-foreground"
        onClick={() => navigate("/board")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Board
      </Button>

      {renderContent()}
    </div>
  );
};

export default IssuePage;
