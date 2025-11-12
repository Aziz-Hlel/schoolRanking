import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { SchoolStudentsNoID, schoolStudentsSchema } from '@/types/School2.type';
import React from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import NumberStudentsPerClass from './NumberStudentsPerClass';
import ExtracurricularActivities from './ExtracurricularActivities';
import InputNumberForm from '@/Custom/InputNumberForm';
import { MultiSelect } from '@/components/ui/multi-select';
import { type Country } from '@/components/ui/countries-dropdown';
import { countries } from 'country-data-list';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

  console.log('errors: ', form.formState.errors);

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="hasParentsCommittee"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Label className="p-4 space-x-2 cursor-pointer  flex items-start rounded-lg border has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
                <div className="space-y-1 leading-none">
                  <div className=" cursor-pointer">Parents Commitee</div>
                  <FormDescription>Does your school have a parents committee?</FormDescription>
                  <FormMessage />
                </div>
              </Label>
            </FormControl>
          </FormItem>
        )}
      />

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
