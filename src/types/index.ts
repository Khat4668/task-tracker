import type { Priority, Status } from "@/lib/issue-constants";

export type Issue = {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  tag: string | null;
  created_at: string;
  user_id: string;
  position: number;
};
