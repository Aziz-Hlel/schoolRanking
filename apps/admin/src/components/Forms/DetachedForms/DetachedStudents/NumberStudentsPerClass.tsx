import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { Input } from '@/components/ui/input';

import React, { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, CirclePlus, Trash } from 'lucide-react';
import { useGetArray } from './use-Get-Array';
import type { UseFormReturn } from 'react-hook-form';
import type { SchoolStudentsNoID } from '@/types/School2.type';

interface NumberStudentsPerClassProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

const NumberStudentsPerClass: FC<NumberStudentsPerClassProps> = ({ form }) => {
  const { fields, feesLength, otherFeesLength, append, handleDelete, handleMove } = useGetArray({
    form,
    fieldName: 'averageStudentsPerClassroom',
  });

  return (
    <>
      <div>
        <Label className="text-2xl ">Average Number of Students per Classroom *</Label>
        <p className=" ">
          Include this optional field, if data is available, to provide insight into the typical
          class size for each grade level.
        </p>
      </div>

      <div className="flex flex-col items-center w-10/12 mx-auto space-y-4 ">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`averageStudentsPerClassroom.${index}.grade`}
            render={({ field }) => (
              <Card className="w-full ">
                <CardContent>
                  <div className="flex flex-col  space-y-8">
                    <div className="grid grid-cols-4 space-x-2">
                      <FormItem className=" col-span-2 row-span-1  flex flex-col items-start">
                        <FormLabel className=" h-fit">Grade</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Elementary (Ages 6-11)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <div className=" flex flex-col col-span-2 gap-2">
                        <Label>Average number of students per classroom</Label>
                        <div className="flex  w-full">
                          <FormField
                            control={form.control}
                            name={`averageStudentsPerClassroom.${index}.numberOfStudents`}
                            render={({ field }) => (
                              <FormItem className=" flex flex-col items-start">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder=""
                                    type="number"
                                    className=" w-20"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(value === '' ? undefined : parseInt(value));
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className=" flex space-x-2   justify-end">
                  <Button
                    variant="destructive"
                    className="hover:bg-red-500 rounded-full p-0  h-8 w-8"
                    type="button"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash className=" size-4 mx-4 " />
                  </Button>

                  <Button
                    variant="default"
                    className="rounded-full p-0  h-8 w-8"
                    type="button"
                    disabled={(index === 0 && feesLength === 1) || index === feesLength - 1}
                    onClick={() => handleMove(index, index + 1)}
                  >
                    <ArrowUpFromLine className=" size-4 rotate-180  " />
                  </Button>

                  <Button
                    variant="default"
                    className="rounded-full p-0  h-8 w-8"
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, index - 1)}
                  >
                    <ArrowUpFromLine className=" size-4  " />
                  </Button>
                </CardFooter>
              </Card>
            )}
          />
        ))}

        <Button
          className=" w-full"
          onClick={() =>
            append({
              grade: '',
              numberOfStudents: 0,
            })
          }
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  );
};

export default NumberStudentsPerClass;
