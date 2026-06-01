import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useDelete from './useDelete';
import type { SchoolPage } from '@/types/SchoolPage';

type Props = {
  handleCancel: () => void;
  schoolToDelete: SchoolPage;
};

const DeleteDialogView = ({ schoolToDelete, handleCancel }: Props) => {
  const { handleDelete, isPending } = useDelete({ selectedRow: schoolToDelete, handleCancel });
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete School : {schoolToDelete.name}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this school?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
          Cancel
        </AlertDialogCancel>
        <Button
          onClick={handleDelete}
          disabled={isPending}
          className=" bg-red-600 hover:bg-red-500"
        >
          Delete
        </Button>
      </AlertDialogFooter>
    </>
  );
};

export default DeleteDialogView;
