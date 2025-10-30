import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FavoriteForm } from "./FavoriteForm";
import { Favorite } from "@/types/favorite";
import { FavoriteFormValues } from "@/lib/validations";

interface FavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FavoriteFormValues) => void;
  initialData?: Favorite;
  isLoading?: boolean;
}

export const FavoriteModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: FavoriteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {initialData ? "Edit Favorite" : "Add New Favorite"}
          </DialogTitle>
        </DialogHeader>
        <FavoriteForm onSubmit={onSubmit} initialData={initialData} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
