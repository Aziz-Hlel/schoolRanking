import { useFieldArray, type UseFieldArrayProps, type UseFormReturn } from 'react-hook-form';

interface DetachedFormProps<T> {
  form: UseFormReturn<T>;
  fieldName: UseFieldArrayProps<T>['name'];
}

export const useGetArray = <T>({ form, fieldName }: DetachedFormProps<T>) => {
  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const feesLength = fields.length;

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleMove = (oldIndex: number, newIndex: number) => {
    swap(oldIndex, newIndex);
  };

  return {
    fields,
    feesLength,
    append,
    handleDelete,
    handleMove,
  };
};
