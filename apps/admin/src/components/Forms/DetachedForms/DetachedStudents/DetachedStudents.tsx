import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { SchoolStudentsNoID, schoolStudentsSchema } from '@/types/School2.type';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type z from 'zod';

interface DetachedFormProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

export type DetachedFormValues = z.infer<typeof schoolStudentsSchema>;

const DetachedStudents: React.FC<DetachedFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name={`totalStudents`}
        render={({ field }) => (
          <FormItem className=" w-8/12 ">
            <FormControl>
              <Input
                {...field}
                placeholder="5000"
                type="number"
                className=" h-full appearance-none"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : parseInt(value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{' '}
    </div>
  );
};

export default DetachedStudents;
