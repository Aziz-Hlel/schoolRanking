import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { type FC } from 'react';
import { useFormContext, type FieldPath } from 'react-hook-form';

interface InputNumberFormProps<T> {
  fieldName: FieldPath<T>;
}
const InputNumberForm = <T,>({ fieldName }: InputNumberFormProps<T>) => {
  const { watch, setValue } = useFormContext();
  const totalStudents = watch(fieldName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('t5l rabk');
    if (/^[0-9]*$/.test(value)) {
      setValue(fieldName as any, value === '' ? undefined : Number(value));
    }
  };

  return (
    <>
      <FormItem className=" grid grid-cols-2  group">
        <div>
          <FormLabel className=" text-2xl">Total Students *</FormLabel>
          <FormDescription>Enter the total number of students in your school</FormDescription>
        </div>
        <FormControl className=" h-full my-auto ">
          <Input
            placeholder="Enter the total number of students"
            className="  h-fit w-60"
            type="text"
            pattern="^[0-9]+$"
            inputMode="numeric"
            value={totalStudents}
            onChange={handleChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

export default InputNumberForm;
