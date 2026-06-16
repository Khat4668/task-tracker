import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import { useGetIssuesQuery } from "@/store/issuesApi";

const BoardPage = () => {
  const { data, error, isLoading } = useGetIssuesQuery();

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-8 h-full">
      <KanbanBoard issues={data ?? []} />
    </div>
  );
};

export default BoardPage;
