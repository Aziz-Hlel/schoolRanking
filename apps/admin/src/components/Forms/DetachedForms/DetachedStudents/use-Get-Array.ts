import type { SchoolStudentsNoID } from '@/types/School2.type';
import {
  useFieldArray,
  type UseFieldArrayProps,
  type UseFormReturn,
  type FieldPath,
} from 'react-hook-form';

interface DetachedFormProps {
  form: UseFormReturn<SchoolStudentsNoID>;
  fieldName: UseFieldArrayProps<SchoolStudentsNoID>['name'];
  aa?: FieldPath<SchoolStudentsNoID>;
}
export const useGetArray = ({ form, fieldName }: DetachedFormProps) => {
  const { fields, append, remove, move, swap } = useFieldArray({
    control: form.control,
    name: fieldName,
  });

  const feesLength = fields.length;
  const otherFeesLength = fields.length - feesLength;

  const handleDelete = (index: number) => {
    // const item = fees[index];
    // const itemIndex = feeItemsFields.findIndex((feeItem) => feeItem.id === item.id);
    remove(index);
  };

  const handleMove = (oldIndex: number, newIndex: number) => {
    swap(oldIndex, newIndex);
  };

  return {
    fields,
    feesLength,
    otherFeesLength,
    append,
    handleDelete,
    handleMove,
  };
};
