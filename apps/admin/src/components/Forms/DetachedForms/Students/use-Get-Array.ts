import {
  useFieldArray,
  type FieldName,
  type UseFieldArrayProps,
  type UseFormReturn,
} from 'react-hook-form';

interface DetachedFormProps<T> {
  form: UseFormReturn<T>;
  fieldName: UseFieldArrayProps<T>['name'];
}

type FieldType<T, K extends keyof T> = T[K];

export const useGetArray = <T>({ form, fieldName }: DetachedFormProps<T>) => {
  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const feesLength = fields.length;

  const handleDelete = (index: number) => {
    // const item = fees[index];
    // const itemIndex = feeItemsFields.findIndex((feeItem) => feeItem.id === item.id)
    remove(index);
  };

  const handleMove = (oldIndex: number, newIndex: number) => {
    swap(oldIndex, newIndex);
  };

  // type FieldType2 = FieldType<T, fieldName>;
  const append2 = (object: UseFormReturn<T>[]) => {};

  return {
    fields,
    feesLength,
    append,
    handleDelete,
    handleMove,
  };
};
