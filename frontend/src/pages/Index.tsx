import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Film, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoriteTable } from "@/components/FavoriteTable";
import { FavoriteModal } from "@/components/FavoriteModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { FavoriteFilters } from "@/components/FavoriteFilters";
import { Favorite, FavoriteFilters as Filters } from "@/types/favorite";
import { FavoriteFormValues } from "@/lib/validations";
import { toast } from "sonner";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 10;

const Index = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<
    Favorite | undefined
  >();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Filters>({});

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const fetchFavorites = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("token");
        const params: any = {
          page: pageNum + 1,
          limit: ITEMS_PER_PAGE,
        };

        if (filters.type) {
          params.type = filters.type;
        }
        if (filters.year) {
          params.year = filters.year;
        }
        if (filters.search) {
          params.search = filters.search;
        }
        if (filters.budgetMin && filters.budgetMax) {
          params.budgetMin = filters.budgetMin;
          params.budgetMax = filters.budgetMax;
        }

        const response = await axios.get(`${API_URL}/api/favorites`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data, hasMore: more } = response.data;

        setFavorites((prev) => (reset ? data : [...prev, ...data]));
        setHasMore(more);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load favorites");
      } finally {
        setIsFetching(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    setPage(0);
    fetchFavorites(0, true);
  }, [filters]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetching &&
      hasMore
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFavorites(nextPage);
    }
  }, [isFetching, hasMore, page, fetchFavorites]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleAddEdit = async (data: FavoriteFormValues) => {
    setIsLoading(true);
    try {
      const favoriteData = {
        title: data.title,
        type: data.type,
        director: data.director,
        budget: data.budget,
        location: data.location,
        duration: data.duration,
        year: data.year,
        posterUrl: data.posterUrl || "",
      };

      if (selectedFavorite) {
        await axios.put(
          `${API_URL}/api/favorites/${selectedFavorite.id}`,
          favoriteData,
          { headers }
        );
        toast.success("Favorite updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/favorites`, favoriteData, { headers });
        toast.success("Favorite added successfully!");
      }

      setIsModalOpen(false);
      setSelectedFavorite(undefined);
      setPage(0);
      fetchFavorites(0, true);
    } catch (error) {
      console.error("Error saving favorite:", error);
      toast.error("Failed to save favorite");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/api/favorites/${deleteTarget.id}`, {
        headers,
      });

      toast.success("Favorite deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
      setPage(0);
      fetchFavorites(0, true);
    } catch (error) {
      console.error("Error deleting favorite:", error);
      toast.error("Failed to delete favorite");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (id: number, title: string) => {
    setDeleteTarget({ id, title });
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen font-poppins bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="md:flex items-center gap-3">
              <div className="md:bg-primary/10 md:p-3 pb-3 rounded-lg">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-[20px] font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Favorite Movies & TV Shows
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Track and manage your entertainment collection
                </p>
              </div>
            </div>
            <div className="md:flex gap-2">
              <Button
                onClick={() => {
                  setSelectedFavorite(undefined);
                  setIsModalOpen(true);
                }}
                size="lg"
                className="gap-2 rounded-full mb-5 md:mb-0"
              >
                <Plus className="h-5 w-5" />
                Add New
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLogout}
                className="gap-2 rounded-full"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FavoriteFilters filters={filters} onFilterChange={setFilters} />
        <FavoriteTable
          favorites={favorites}
          onEdit={openEditModal}
          onDelete={(id) => {
            const fav = favorites.find((f) => f.id === id);
            if (fav) openDeleteDialog(id, fav.title);
          }}
          isLoading={isFetching && page === 0}
        />
        {isFetching && page > 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </main>

      <FavoriteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFavorite(undefined);
        }}
        onSubmit={handleAddEdit}
        initialData={selectedFavorite}
        isLoading={isLoading}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
        title={deleteTarget?.title || ""}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
