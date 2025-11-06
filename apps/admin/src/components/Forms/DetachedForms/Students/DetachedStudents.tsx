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
import { MultiSelect } from '@/components/ui/multi-select';
import { type Country } from '@/components/ui/countries-dropdown';
import { countries } from 'country-data-list';

interface DetachedFormProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

export type DetachedFormValues = z.infer<typeof schoolStudentsSchema>;

const DetachedStudents: React.FC<DetachedFormProps> = ({ form }) => {
  const countries2 = countries.all.map((country: Country) => {
    return {
      label: country.name,
      value: country.alpha2,
    };
  });

  return (
    <div className="space-y-8">
      <InputNumberForm fieldName="totalStudents" />

      <FormField
        control={form.control}
        name="nationalities"
        render={() => (
          // Corrected FormField implementation
          <FormField
            control={form.control}
            name="nationalities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-2xl font-medium">Students Nationalities *</FormLabel>
                <FormDescription>Select the nationalities of your students</FormDescription>
                <MultiSelect
                  options={Object.values(countries2).map((country) => country)}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  variant="inverted"
                  maxCount={20}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      />

      <NumberStudentsPerClass form={form} />
      <ExtracurricularActivities form={form} />
    </div>
  );
};

export default DetachedStudents;
