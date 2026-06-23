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
import {
  resetFilters,
  setPriority,
  setTag,
  setTitle,
} from "@/store/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Priority } from "@/types";

const FilterBar = () => {
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3 mb-4">
      <div className="w-full max-w-2xs">
        <Input
          value={filters.title}
          onChange={(event) => dispatch(setTitle(event.target.value))}
          placeholder="Search issue"
        />
      </div>
      <div className="w-full max-w-2xs">
        <Select
          value={filters.priority}
          onValueChange={(value: Priority) => dispatch(setPriority(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priority</SelectLabel>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full max-w-2xs">
        <Input
          value={filters.tag}
          onChange={(event) => dispatch(setTag(event.target.value))}
          placeholder="Search tag"
        />
      </div>
      <div className="w-full max-w-2xs">
        <Button onClick={() => dispatch(resetFilters())}>Clear filter</Button>
      </div>
    </div>
  );
};

export default FilterBar;
