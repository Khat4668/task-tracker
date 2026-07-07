import * as z from "zod";

export const issueSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["backlog", "in_progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  tag: z.string().optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;
