import FilterBar from "@/components/FilterBar/FilterBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { selectHasActiveFilters } from "@/store/filtersSlice";
import { useAppSelector } from "@/store/hooks";
import { Filter } from "lucide-react";

type Props = {
  className?: string;
};

const FiltersSheet = ({ className }: Props) => {
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Filters"
          className={cn("relative", className)}
        >
          <Filter />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          <FilterBar />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default FiltersSheet;
