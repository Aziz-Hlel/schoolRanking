import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import DeleteDialogView from './DeleteDialogView';
import type { SchoolPage } from '@/types/SchoolPage';

const DeleteDialog = ({
  schoolToDelete,
  handleCancel,
}: {
  schoolToDelete: SchoolPage | null;
  handleCancel: () => void;
}) => {
  const dialogOpen = schoolToDelete !== null;

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleCancel}>
      <AlertDialogContent>
        {dialogOpen && (
          <DeleteDialogView schoolToDelete={schoolToDelete} handleCancel={handleCancel} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
