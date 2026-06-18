import * as z from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  status: z.enum(["backlog", "in_progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  tag: z.string().optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;
