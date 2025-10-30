export interface Favorite {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  posterUrl: string | null;
  created_at: string;
}

export interface FavoriteFilters {
  type?: string;
  year?: string;
  budgetMin?: string;
  budgetMax?: string;
  search?: string;
}
