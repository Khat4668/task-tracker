import type { Issue, Status } from "@/types";
import IssueCard from "../IssueCard/IssueCard";

type Props = {
  status: Status;
  issues: Issue[];
};

const KanbanColumn = ({ status, issues }: Props) => {
  return (
    <div>
      <div>
        <div>{status}</div>
        <div>{issues.length}</div>
      </div>

      <div>
        {issues.map((issue) => {
          return <IssueCard key={issue.id} issue={issue} />;
        })}
      </div>
    </div>
  );
};
export default KanbanColumn;
