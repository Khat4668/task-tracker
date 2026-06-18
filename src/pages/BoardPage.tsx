import CreateIssueModal from "@/components/CreateIssueModal/CreateIssueModal";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { Button } from "@/components/ui/button";
import { useGetIssuesQuery } from "@/store/issuesApi";
import { useState } from "react";

const BoardPage = () => {
  const { data, error, isLoading } = useGetIssuesQuery();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <KanbanBoard issues={data ?? []} />

      <CreateIssueModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default BoardPage;
