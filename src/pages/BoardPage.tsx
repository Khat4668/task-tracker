import IssueCard from "@/components/IssueCard/IssueCard";
import type { Issue } from "@/types";

const BoardPage = () => {
  const issue: Issue = {
    id: "1",
    title: "Настроить роутинг",
    description: "Добавить React Router",
    status: "backlog",
    priority: "high",
    tag: "Frontend",
    created_at: "2024-06-13",
    user_id: "123",
  };

  return (
    <div className="p-8">
      <IssueCard issue={issue} />
    </div>
  );
};

export default BoardPage;
