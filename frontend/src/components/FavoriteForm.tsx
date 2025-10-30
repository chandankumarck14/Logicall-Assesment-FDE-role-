import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { favoriteSchema, FavoriteFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Favorite } from "@/types/favorite";

interface FavoriteFormProps {
  onSubmit: (data: FavoriteFormValues) => void;
  initialData?: Favorite;
  isLoading?: boolean;
}

export const FavoriteForm = ({ onSubmit, initialData, isLoading }: FavoriteFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FavoriteFormValues>({
    resolver: zodResolver(favoriteSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          type: initialData.type as "Movie" | "TV Show",
          director: initialData.director,
          budget: initialData.budget,
          location: initialData.location,
          duration: initialData.duration,
          year: initialData.year,
          posterUrl: initialData.posterUrl || "",
        }
      : {
          type: "Movie",
        },
  });

  const typeValue = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Enter title"
          {...register("title")}
          className="bg-muted border-border"
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type *</Label>
        <Select
          value={typeValue}
          onValueChange={(value) => setValue("type", value as "Movie" | "TV Show")}
        >
          <SelectTrigger className="bg-muted border-border">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="TV Show">TV Show</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="director">Director *</Label>
        <Input
          id="director"
          placeholder="Enter director name"
          {...register("director")}
          className="bg-muted border-border"
        />
        {errors.director && <p className="text-sm text-destructive">{errors.director.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget *</Label>
          <Input
            id="budget"
            placeholder="e.g., $10M"
            {...register("budget")}
            className="bg-muted border-border"
          />
          {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            placeholder="e.g., 2024"
            {...register("year")}
            className="bg-muted border-border"
          />
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="Filming location"
          {...register("location")}
          className="bg-muted border-border"
        />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration *</Label>
        <Input
          id="duration"
          placeholder="e.g., 120 min"
          {...register("duration")}
          className="bg-muted border-border"
        />
        {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="posterUrl">Poster URL</Label>
        <Input
          id="posterUrl"
          placeholder="https://example.com/poster.jpg"
          {...register("posterUrl")}
          className="bg-muted border-border"
        />
        {errors.posterUrl && <p className="text-sm text-destructive">{errors.posterUrl.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update" : "Add Favorite"}
      </Button>
    </form>
  );
};
