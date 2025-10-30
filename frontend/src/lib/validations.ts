import { z } from "zod";

export const favoriteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  type: z.enum(["Movie", "TV Show"], {
    required_error: "Please select a type",
  }),
  director: z.string().min(1, "Director is required").max(200, "Director name is too long"),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required").max(200, "Location is too long"),
  duration: z.string().min(1, "Duration is required"),
  year: z.string().min(4, "Year must be 4 digits").max(4, "Year must be 4 digits"),
  posterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type FavoriteFormValues = z.infer<typeof favoriteSchema>;
