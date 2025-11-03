import type { SchoolFeesNoID } from '@/types/School2.type';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';

interface DetachedFormProps {
  form: UseFormReturn<SchoolFeesNoID>;
  isAdditionalFee: boolean;
}
export const useGetFees = ({ form, isAdditionalFee }: DetachedFormProps) => {
  const {
    fields: feeItemsFields,
    append: appendFeeItem,
    remove: removeFeeItem,
    move: moveFeeItem,
    swap: swapFeeItem,
  } = useFieldArray({
    control: form.control,
    name: 'feeItems',
  });

  console.log('feeItems', feeItemsFields);
  const fees = feeItemsFields
    .map((feeItem, index) => ({ ...feeItem, index }))
    .filter((feeItem) => feeItem.isAdditionalFee === isAdditionalFee);

  const feesLength = fees.length;
  const otherFeesLength = feeItemsFields.length - feesLength;

  const handleDeleteFeeItem = (index: number) => {
    // const item = fees[index];
    // const itemIndex = feeItemsFields.findIndex((feeItem) => feeItem.id === item.id);
    removeFeeItem(index);
  };

  const handleMoveFeeItem = (oldIndex: number, newIndex: number) => {
    swapFeeItem(oldIndex, newIndex);
  };

  return {
    fees,
    feesLength,
    otherFeesLength,
    appendFeeItem,
    handleDeleteFeeItem,
    handleMoveFeeItem,
  };
};
