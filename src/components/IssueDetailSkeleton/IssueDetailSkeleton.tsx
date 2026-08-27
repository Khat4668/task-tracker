import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SIDEBAR_FIELDS = ["Status", "Priority", "Tag"];

const IssueDetailSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Loading issue"
      className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-[1fr_260px]"
    >
      <div aria-hidden>
        <Skeleton className="h-3.5 w-16 mb-5" />

        <Skeleton className="mt-1 mb-4 md:mb-6 h-10.5 w-3/4" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>

      <div
        aria-hidden
        className="space-y-4 md:space-y-5 border-t pt-6 md:border-t-0 md:pl-6 md:pt-0"
      >
        {SIDEBAR_FIELDS.map((label) => (
          <div key={label}>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              {label}
            </p>
            <Skeleton className="h-8.5 md:h-7.5 w-24" />
          </div>
        ))}

        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            Created
          </p>
          <Skeleton className="h-6 md:h-5 w-24" />
        </div>

        <Separator />

        <Skeleton className="h-7.5 w-32" />
      </div>
    </div>
  );
};

export default IssueDetailSkeleton;
