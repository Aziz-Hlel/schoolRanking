import {
  useFieldArray,
  type UseFieldArrayProps,
  type UseFormReturn,
  type FieldPath,
} from 'react-hook-form';

interface DetachedFormProps<T> {
  form: UseFormReturn<T>;
  fieldName: UseFieldArrayProps<T>['name'];
}
export const useGetArray = <T>({ form, fieldName }: DetachedFormProps<T>) => {
  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleMove = (oldIndex: number, newIndex: number) => {
    swap(oldIndex, newIndex);
  };

  return {
    fields,
    append,
    handleDelete,
    handleMove,
  };
};
