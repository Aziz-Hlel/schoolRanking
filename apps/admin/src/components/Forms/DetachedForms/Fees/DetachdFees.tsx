import type { SchoolFeesNoID } from '@/types/School2.type';
import { type FC } from 'react';
import PrimaryFees from './PrimaryFees';
import AdditionalFees from './AdditionalFees';
import type { UseFormReturn } from 'react-hook-form';

interface DetachedFormProps {
  form: UseFormReturn<SchoolFeesNoID>;
}
const DetachdFees: FC<DetachedFormProps> = ({ form }) => {
  console.log(form.formState.errors);
  return (
    <>
      <PrimaryFees form={form} />
      <AdditionalFees form={form} />
    </>
  );
};

export default DetachdFees;
