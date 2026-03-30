import apiRoutes from '@/service/Api/apiRoutes';
import { apiService } from '@/service/Api/apiService';
import type { SchoolPage } from '@/types/SchoolPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useDelete = ({
  selectedRow,
  handleCancel,
}: {
  selectedRow: SchoolPage;
  handleCancel: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['schools', 'delete', selectedRow.id],
    mutationFn: () => apiService.deleteThrowable(apiRoutes.school.delete(selectedRow.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'], exact: false });
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success(`School deleted successfully`);
      handleCancel();
    } catch (error) {
      toast.error(`Failed to delete school`);

      handleCancel();
    }
  };

  return { handleDelete, isPending };
};

export default useDelete;
