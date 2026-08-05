import { supabase } from "@/api/supabase";
import CreateIssueModal from "@/components/CreateIssueModal/CreateIssueModal";
import EmptyState from "@/components/EmptyState/EmptyState";
import FilterBar from "@/components/FilterBar/FilterBar";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { FilterX, LayoutGrid, LogOut } from "lucide-react";
import { useState } from "react";

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

  const normalizedTitle = filters.title.trim().toLowerCase();
  const normalizedTag = filters.tag.trim().toLowerCase();

  const filteredIssues = data.filter((issue) => {
    const matchesTitle = issue.title.toLowerCase().includes(normalizedTitle);
    const matchesPriority =
      filters.priority === "" || issue.priority === filters.priority;
    const matchesTag =
      normalizedTag === "" || issue.tag?.toLowerCase().includes(normalizedTag);

    return matchesTitle && matchesPriority && matchesTag;
  });

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
      <Button
        variant="default"
        className="mb-4"
        onClick={() => setIsOpen(true)}
      >
        Add Issue
      </Button>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => supabase.auth.signOut()}
      >
        <LogOut />
        Sign out
      </Button>
      <FilterBar />
      {renderContent()}
      <CreateIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BoardPage;
