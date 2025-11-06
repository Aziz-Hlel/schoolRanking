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
import type { SchoolAcademicsNoID } from '@/types/School2.type';
import { Textarea } from '@/components/ui/textarea';

interface InnovativeTeachingMethodsProps {
  form: UseFormReturn<SchoolAcademicsNoID>;
}

const InnovativeTeachingMethods: FC<InnovativeTeachingMethodsProps> = ({ form }) => {
  const { fields, feesLength, otherFeesLength, append, handleDelete, handleMove } = useGetArray({
    form,
    fieldName: 'innovativeTeachingMethods',
  });

  return (
    <>
      <div>
        <Label className="text-2xl ">Technology Use & Teaching Methods *</Label>
        <p className=" ">
          Provide details on classroom technology use, device programs (like Bring Your Own Device),
          and any innovative or alternative teaching practices employed.
        </p>
      </div>

      <div className="flex flex-col items-center w-10/12 mx-auto space-y-4 ">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`innovativeTeachingMethods.${index}.title`}
            render={({ field }) => (
              <Card className="w-full ">
                <CardContent>
                  <div className="flex flex-col  space-y-8">
                    <FormItem className=" col-span-2 row-span-1  flex flex-col items-start">
                      <FormLabel className=" h-fit">Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bring Your Own Device" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name={`innovativeTeachingMethods.${index}.description`}
                      render={({ field }) => (
                        <FormItem className=" flex flex-col items-start">
                          <FormLabel className=" h-fit">Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="A program where students use their personal laptops or tablets for learning activities in the classroom."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
              title: '',
              description: undefined,
            })
          }
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  );
};

export default InnovativeTeachingMethods;
