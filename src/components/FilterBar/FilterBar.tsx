import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority } from "@/lib/issue-constants";
import { priorities, priorityLabels } from "@/lib/issue-constants";
import { cn } from "@/lib/utils";
import {
  resetFilters,
  selectHasActiveFilters,
  setPriority,
  setTag,
  setTitle,
} from "@/store/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Search } from "lucide-react";

type Props = {
  className?: string;
};

const FilterBar = ({ className }: Props) => {
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  return (
    <div className={cn("flex flex-col gap-3 md:flex-row", className)}>
      <div className="w-full md:w-48 relative">
        <Input
          value={filters.title}
          onChange={(event) => dispatch(setTitle(event.target.value))}
          placeholder="Search issue"
          className="pl-7"
        />
        <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none text-muted-foreground" />
      </div>
      <div className="w-full md:w-48">
        <Select
          value={filters.priority}
          onValueChange={(value: Priority) => dispatch(setPriority(value))}
        >
          <SelectTrigger className="w-full text-base md:text-sm">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priority</SelectLabel>
              {priorities.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priorityLabels[priority]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-48">
        <Input
          value={filters.tag}
          onChange={(event) => dispatch(setTag(event.target.value))}
          placeholder="Search tag"
        />
      </div>
      {hasActiveFilters && (
        <Button
          className="w-full md:w-auto"
          variant="outline"
          onClick={() => dispatch(resetFilters())}
        >
          Clear filter
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
