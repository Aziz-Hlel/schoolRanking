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
import type { UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import { useGetArray } from './use-Get-Array';
import NumberStudentsPerClass from './NumberStudentsPerClass';
import ExtracurricularActivities from './ExtracurricularActivities';

interface DetachedFormProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

export type DetachedFormValues = z.infer<typeof schoolStudentsSchema>;

const DetachedStudents: React.FC<DetachedFormProps> = ({ form }) => {
  const { fields, feesLength, otherFeesLength, append, handleDelete, handleMove } = useGetArray({
    form,
  });

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="totalStudents"
        render={({ field }) => (
          <FormItem className=" grid grid-cols-2  group">
            <div>
              <FormLabel>Total Students</FormLabel>
              <FormDescription>Enter the total number of students in your school</FormDescription>
            </div>
            <FormControl className="">
              <Input
                type="number"
                placeholder="Enter the total number of students"
                className=" group-focus:focus"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <NumberStudentsPerClass form={form} />
      <ExtracurricularActivities form={form} />
    </div>
  );
};

export default DetachedStudents;
