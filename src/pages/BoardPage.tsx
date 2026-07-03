import { supabase } from "@/api/supabase";
import CreateIssueModal from "@/components/CreateIssueModal/CreateIssueModal";
import FilterBar from "@/components/FilterBar/FilterBar";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { LogOut } from "lucide-react";
import { useState } from "react";

const BoardPage = () => {
  const { data, error, isLoading } = useGetIssuesQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filters = useAppSelector((state) => state.filters);

  const clearSearchQueryTitle = filters.title.trim().toLowerCase();
  const clearSearchQueryTag = filters.tag.trim().toLowerCase();

  const filteredIssues = data?.filter((issue) => {
    const matchesTitle = issue.title
      .toLowerCase()
      .includes(clearSearchQueryTitle);
    const matchesPriority =
      filters.priority === "" || issue.priority === filters.priority;
    const matchesTag =
      clearSearchQueryTag === "" ||
      issue.tag?.toLowerCase().includes(clearSearchQueryTag);

    return matchesTitle && matchesPriority && matchesTag;
  });

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

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
      <KanbanBoard issues={filteredIssues ?? []} />

      <CreateIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BoardPage;
