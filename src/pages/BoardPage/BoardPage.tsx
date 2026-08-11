import CreateIssueModal from "@/components/CreateIssueModal/CreateIssueModal";
import EmptyState from "@/components/EmptyState/EmptyState";
import FilterBar from "@/components/FilterBar/FilterBar";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { FilterX, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { filterIssues } from "./filterIssues";

const BoardPage = () => {
  const { data, error, isLoading } = useGetIssuesQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filters = useAppSelector((state) => state.filters);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) return null;

  const filteredIssues = filterIssues(data, filters);

  const renderContent = () => {
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
    } else if (filteredIssues.length === 0) {
      return (
        <EmptyState
          icon={<FilterX className="w-6 h-6" />}
          title="No issues match your filters"
          description="Adjust the filters or clear them to see everything."
        />
      );
    } else {
      return <KanbanBoard issues={filteredIssues} />;
    }
  };

  return (
    <div className="p-8 h-full">
      <div className="flex justify-between mb-8">
        <FilterBar />
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Add Issue
        </Button>
      </div>
      {renderContent()}
      <CreateIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BoardPage;
