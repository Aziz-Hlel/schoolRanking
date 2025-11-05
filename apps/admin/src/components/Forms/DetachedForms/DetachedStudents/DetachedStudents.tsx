import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { SchoolStudentsNoID, schoolStudentsSchema } from '@/types/School2.type';
import React from 'react';
import { useFormContext, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { useGetArray } from './use-Get-Array';
import NumberStudentsPerClass from './NumberStudentsPerClass';
import ExtracurricularActivities from './ExtracurricularActivities';
import InputNumberForm from '@/Custom/InputNumberForm';

interface DetachedFormProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

export type DetachedFormValues = z.infer<typeof schoolStudentsSchema>;

const DetachedStudents: React.FC<DetachedFormProps> = ({ form }) => {
  const { watch, setValue } = useFormContext();
  const totalStudents = watch('totalStudents');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('t5l rabk');
    if (/^[0-9]*$/.test(value)) {
      setValue('totalStudents', value === '' ? undefined : Number(value));
    }
  };
  return (
    <div className="space-y-6">
      <InputNumberForm fieldName="totalStudents" />
      <NumberStudentsPerClass form={form} />
      <ExtracurricularActivities form={form} />
    </div>
  );
};

export default DetachedStudents;
