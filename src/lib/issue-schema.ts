import { priorities, statuses } from "@/lib/issue-constants";
import * as z from "zod";

export const issueSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(statuses),
  priority: z.enum(priorities),
  tag: z.string().optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;
