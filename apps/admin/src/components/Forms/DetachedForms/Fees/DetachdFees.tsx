import type { SchoolFees, SchoolFeesNoID } from "@/types/School2.type";
import { type FC } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus } from "lucide-react";

interface DetachedFormProps {
  form: UseFormReturn<SchoolFeesNoID>;
}
const DetachdFees: FC<DetachedFormProps> = ({ form }) => {
  const {
    fields: feeItemsFields,
    append: appendFeeItem,
    remove: removeFeeItem,
    move: moveFeeItem,
  } = useFieldArray({
    control: form.control,
    name: "feeItems",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      moveFeeItem(active.id, over.id);
    }
  }

  return (
    <div className="flex flex-col items-center w-8/12 mx-auto space-y-4 ">
      {feeItemsFields.map((feeItem, index) => (
        <Card className="w-full ">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={`feeItems.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Elementary (Ages 6-11)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`feeItems.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="5000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`feeItems.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
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
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        className=" w-full"
        onClick={() =>
          appendFeeItem({
            title: "",
            price: 0,
            currency: "USD",
            description: "",
            isAdditionalFee: false,
            sortOrder: feeItemsFields.length,
          })
        }
      >
        <CirclePlus />
      </Button>
    </div>
  );
};

export default DetachdFees;
