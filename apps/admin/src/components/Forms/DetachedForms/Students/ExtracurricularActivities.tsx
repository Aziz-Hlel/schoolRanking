import { type FC } from 'react';
import { useGetArray } from './use-Get-Array';
import type { UseFormReturn } from 'react-hook-form';
import type { SchoolStudentsNoID } from '@/types/School2.type';
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
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, CirclePlus, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ExtracurricularActivitiesProps {
  form: UseFormReturn<SchoolStudentsNoID>;
}

const ExtracurricularActivities: FC<ExtracurricularActivitiesProps> = ({ form }) => {
  const { fields, append, handleDelete, handleMove } = useGetArray<SchoolStudentsNoID>({
    form,
    fieldName: 'extracurricularActivities',
  });

  return (
    <>
      <div>
        <Label className="text-2xl ">Extracurricular Activities Offered *</Label>
        <p className=" ">
          List the available clubs, sports, arts, and other activities. You can include
          opportunities like festivals, volunteer work, music, or drama programs.
        </p>
      </div>

      <div className="flex flex-col items-center w-10/12 mx-auto space-y-4 ">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`extracurricularActivities.${index}.name`}
            render={({ field }) => (
              <Card className="w-full ">
                <CardContent>
                  <div className="flex flex-col  space-y-4">
                    <FormItem className=" col-span-2 row-span-1 flex flex-col ">
                      <FormLabel className=" h-fit">Extra Curricular Activity</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Math Club" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name={`extracurricularActivities.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="  col-span-3 row-span-1 flex flex-col items-start">
                          <FormLabel>Fee Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-20 h-20"
                              rows={2}
                              placeholder={`Student gatherings to explore advanced mathematical concepts and problem-solving.`}
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
                    disabled={(index === 0 && fields.length === 1) || index === fields.length - 1}
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
              sortOrder: fields.length,
            })
          }
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  );
};

export default ExtracurricularActivities;
