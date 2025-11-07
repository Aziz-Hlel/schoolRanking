import type { SchoolFeesNoID } from '@/types/School2.type';
import { type FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { ArrowUpFromLine, CirclePlus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useGetArray } from './use-Get-Array';

interface AdditionalFeesProps {
  form: UseFormReturn<SchoolFeesNoID>;
}

const PrimaryFees: FC<AdditionalFeesProps> = ({ form }) => {
  const { fields, append, handleDelete, handleMove } = useGetArray({
    form,
    fieldName: 'tuitionFees',
  });

  return (
    <>
      <div>
        <Label className=" text-2xl">Tuition Fees by Level</Label>
        <p className="">
          Specify the main tuition fees for each grade or level (e.g., Kindergarten, Elementary,
          High School). This helps represent the school’s affordability and the variation in pricing
          across educational stages.
        </p>
      </div>

      <div className="flex flex-col items-center w-10/12 mx-auto space-y-4 ">
        {fields.map((feeItem, index) => (
          <FormField
            control={form.control}
            key={feeItem.id}
            name={`tuitionFees.${index}.title`}
            render={({ field }) => (
              <Card className="w-full ">
                <CardContent>
                  <div className="flex flex-col  space-y-8">
                    <div className="grid grid-cols-4 space-x-2">
                      <FormItem className=" col-span-3 row-span-1 ">
                        <FormLabel className=" h-fit">Fee Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Elementary (Ages 6-11)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <div className=" flex flex-col row-span-1 gap-2">
                        <Label>Amount</Label>
                        <div className="flex  w-full">
                          <FormField
                            control={form.control}
                            name={`tuitionFees.${index}.price`}
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
                          <FormField
                            control={form.control}
                            name={`tuitionFees.${index}.currency`}
                            render={({ field }) => (
                              <FormItem className="">
                                <FormControl>
                                  <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Currency</SelectLabel>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="BHD">BHD</SelectItem>
                                        <SelectItem value="QAR">QAR</SelectItem>
                                        <SelectItem value="SAR">SAR</SelectItem>
                                        <SelectItem value="KWD">KWD</SelectItem>
                                        <SelectItem value="OMR">OMR</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name={`tuitionFees.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="  col-span-3 row-span-1">
                          <FormLabel>Fee Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-40 h-40"
                              rows={5}
                              placeholder={`Tuition per semester (USD 1,000). Transportation not included.
                                \nAnnual fee covering tuition and materials, fee for after-school activities billed separately.
                                \nThe tuition fee is non-refundable and non-transferable.
                                `}
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
              title: '',
              price: 1,
              currency: 'USD',
              description: '',
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

export default PrimaryFees;
