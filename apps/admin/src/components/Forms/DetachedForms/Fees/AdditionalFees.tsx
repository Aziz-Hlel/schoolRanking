import React, { type FC } from 'react';
import { useGetFees } from './use-Get-Fees';
import type { UseFormReturn } from 'react-hook-form';
import type { SchoolFeesNoID } from '@/types/School2.type';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Trash, ArrowUpFromLine, CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdditionalFeesProps {
  form: UseFormReturn<SchoolFeesNoID>;
}
const AdditionalFees: FC<AdditionalFeesProps> = ({ form }) => {
  const {
    fees,
    feesLength,
    otherFeesLength,
    appendFeeItem,
    handleDeleteFeeItem,
    handleMoveFeeItem,
  } = useGetFees({
    form,
    isAdditionalFee: true,
  });

  return (
    <>
      <div>
        <Label className="text-2xl ">School Additional fees</Label>
        <p className=" ">
          Include any optional or recurring costs such as transportation, cafeteria/lunch programs,
          uniforms, or other non-tuition services. These help parents understand the full cost of
          attendance.
        </p>
      </div>

      <div className="flex flex-col items-center w-10/12 mx-auto space-y-4 ">
        {fees.map((feeItem, index) => (
          <FormField
            control={form.control}
            key={feeItem.id}
            name={`feeItems.${feeItem.index}.title`}
            render={({ field }) => (
              <Card className="w-full ">
                <CardContent>
                  <div className="flex flex-col  space-y-8">
                    <div className="grid grid-cols-4 space-x-2">
                      <FormItem className=" col-span-3 row-span-1  flex flex-col items-start justify-start">
                        <FormLabel className=" h-fit">Fee Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Elementary (Ages 6-11)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <div className="  row-span-1 gap-2 h-full">
                        <Label>Amount</Label>
                        <div className="flex  w-full">
                          <FormField
                            control={form.control}
                            name={`feeItems.${feeItem.index}.price`}
                            render={({ field }) => (
                              <FormItem className=" w-8/12 flex flex-col items-start">
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
                            name={`feeItems.${feeItem.index}.currency`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col items-start  ">
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
                      name={`feeItems.${feeItem.index}.description`}
                      render={({ field }) => (
                        <FormItem className="  col-span-3 row-span-1 flex flex-col items-start">
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
                    onClick={() => handleDeleteFeeItem(feeItem.index)}
                  >
                    <Trash className=" size-4 mx-4 " />
                  </Button>

                  <Button
                    variant="default"
                    className="rounded-full p-0  h-8 w-8"
                    type="button"
                    disabled={(index === 0 && feesLength === 1) || index === feesLength - 1}
                    onClick={() => handleMoveFeeItem(feeItem.index, feeItem.index + 1)}
                  >
                    <ArrowUpFromLine className=" size-4 rotate-180  " />
                  </Button>

                  <Button
                    variant="default"
                    className="rounded-full p-0  h-8 w-8"
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveFeeItem(feeItem.index, feeItem.index - 1)}
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
            appendFeeItem({
              title: '',
              price: undefined,
              currency: 'USD',
              description: '',
              isAdditionalFee: true,
              sortOrder: fees.length,
            })
          }
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  );
};

export default AdditionalFees;
