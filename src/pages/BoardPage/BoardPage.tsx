import CreateIssueModal from "@/components/CreateIssueModal/CreateIssueModal";
import EmptyState from "@/components/EmptyState/EmptyState";
import FilterBar from "@/components/FilterBar/FilterBar";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import KanbanBoardSkeleton from "@/components/KanbanBoardSkeleton/KanbanBoardSkeleton";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { AlertCircle, FilterX, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { filterIssues } from "./filterIssues";

const BoardPage = () => {
  const { data, error, isLoading, refetch, isFetching } = useGetIssuesQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filters = useAppSelector((state) => state.filters);

  const renderContent = () => {
    if (isLoading || (error && isFetching)) return <KanbanBoardSkeleton />;

    if (error && !data) {
      return (
        <EmptyState
          icon={<AlertCircle className="w-6 h-6" />}
          title="Couldn't load issues"
          description="Something went wrong. Check your connection and try again."
          actionLabel="Try again"
          onAction={refetch}
        />
      );
    }

    if (!data) return null;

    if (data.length === 0) {
      return (
        <EmptyState
          icon={<LayoutGrid className="w-6 h-6" />}
          title="Create your first issue"
          description="Issues you create will show up on the board, grouped by status."
          actionLabel="New issue"
          onAction={() => setIsOpen(true)}
        />
      );
    }

    const filteredIssues = filterIssues(data, filters);

    if (filteredIssues.length === 0) {
      return (
        <EmptyState
          icon={<FilterX className="w-6 h-6" />}
          title="No issues match your filters"
          description="Adjust the filters or clear them to see everything."
        />
      );
    }

    return <KanbanBoard issues={filteredIssues} />;
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between mb-8 shrink-0">
        <FilterBar />
        <Button
          variant="default"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          Add Issue
        </Button>
      </div>
      {renderContent()}
      <CreateIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BoardPage;
