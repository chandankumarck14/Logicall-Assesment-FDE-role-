import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FavoriteFilters as Filters } from "@/types/favorite";

interface FavoriteFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export const FavoriteFilters = ({ filters, onFilterChange }: FavoriteFiltersProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border mb-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg ">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search title or director..."
              value={filters.search || ""}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="pl-10 bg-muted border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={filters.type || "all"}
            onValueChange={(value) =>
              onFilterChange({ ...filters, type: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="bg-muted border-border">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Movie">Movie</SelectItem>
              <SelectItem value="TV Show">TV Show</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <Select
            value={filters.year || "all"}
            onValueChange={(value) =>
              onFilterChange({ ...filters, year: value === "all" ? undefined : value })
            }
          >
            <SelectTrigger className="bg-muted border-border">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
