import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";
import type { Issue } from "@/types";

const BoardPage = () => {
  const issues: Issue[] = [
    {
      id: "1",
      title: "Настроить роутинг",
      description: "Добавить React Router",
      status: "backlog",
      priority: "high",
      tag: "Frontend",
      created_at: "2024-06-13",
      user_id: "123",
    },
    {
      id: "2",
      title: "Настроить компонент",
      description: "Добавить компонент BoardPage",
      status: "in_progress",
      priority: "low",
      tag: "Frontend",
      created_at: "2024-06-15",
      user_id: "213",
    },
    {
      id: "3",
      title: "Изучить shadecn",
      description: "Изучить докментацию shadecn",
      status: "review",
      priority: "medium",
      tag: "Frontend",
      created_at: "2024-06-15",
      user_id: "223",
    },
    {
      id: "4",
      title: "Изучить Redux",
      description: "Изучить докментацию Redux",
      status: "done",
      priority: "high",
      tag: "Frontend",
      created_at: "2024-06-15",
      user_id: "224",
    },
    {
      id: "5",
      title: "Изучить dnd",
      description: "Изучить докментацию dnd",
      status: "backlog",
      priority: "high",
      tag: "Frontend",
      created_at: "2024-06-15",
      user_id: "224",
    },
  ];

  if (!issues) {
    return <div>Loading</div>;
  }

  if (issues.length === 0) {
    return (
      <div>
        <span>No issues</span>
      </div>
    );
  }

  return (
    <div className="p-8 h-full">
      <KanbanBoard issues={issues} />
    </div>
  );
};

export default BoardPage;
