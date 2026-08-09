import type { FiltersState } from "@/store/filtersSlice";
import type { Issue } from "@/types";

export const filterIssues = (issues: Issue[], filters: FiltersState) => {
  const normalizedTitle = filters.title.trim().toLowerCase();
  const normalizedTag = filters.tag.trim().toLowerCase();

  return issues.filter((issue) => {
    const matchesTitle = issue.title.toLowerCase().includes(normalizedTitle);
    const matchesPriority =
      filters.priority === "" || issue.priority === filters.priority;
    const matchesTag =
      normalizedTag === "" || issue.tag?.toLowerCase().includes(normalizedTag);

    return matchesTitle && matchesPriority && matchesTag;
  });
};
