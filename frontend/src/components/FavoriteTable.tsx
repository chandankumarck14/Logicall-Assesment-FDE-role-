import { Pencil, Trash2, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Favorite } from "@/types/favorite";

interface FavoriteTableProps {
  favorites: Favorite[];
  onEdit: (favorite: Favorite) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const FavoriteTable = ({ favorites, onEdit, onDelete, isLoading }: FavoriteTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Film className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl mb-2">No favorites yet</h3>
        <p className="text-muted-foreground">Add your first movie or TV show to get started!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Poster</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Director</TableHead>
              <TableHead className="font-semibold">Year</TableHead>
              <TableHead className="font-semibold">Budget</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  {favorite.posterUrl ? (
                    <img
                      src={favorite.posterUrl}
                      alt={favorite.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                      <Film className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{favorite.title}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      favorite.type === "Movie"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary/20 text-blue-400"
                    }`}
                  >
                    {favorite.type}
                  </span>
                </TableCell>
                <TableCell>{favorite.director}</TableCell>
                <TableCell>{favorite.year}</TableCell>
                <TableCell>{favorite.budget}</TableCell>
                <TableCell>{favorite.location}</TableCell>
                <TableCell>{favorite.duration}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(favorite)}
                      className="hover:bg-primary/20 hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(favorite.id)}
                      className="hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
