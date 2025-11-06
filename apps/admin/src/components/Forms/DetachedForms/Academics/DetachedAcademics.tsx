import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { AccreditationEnums } from '@/enums/AccreditationEnums';
import { LevelEnums } from '@/enums/LevelEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';
import { Checkbox } from '@/components/ui/checkbox';
import { schoolAcademicsSchema, type SchoolAcademicsNoID } from '@/types/School2.type';
import type { FC } from 'react';
import type z from 'zod';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { languages } from 'country-data-list';
import { TagInput } from '@/components/ui/TagInput';
import InnovativeTeachingMethods from './InnovativeTeachingMethods';

interface DetachedFormProps {
  form: UseFormReturn<SchoolAcademicsNoID>;
}

const DetachedAcademics: FC<DetachedFormProps> = ({ form }) => {
  const languagesOptions = languages.all.map((language) => ({
    value: language.name,
    label: language.name,
  }));

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="languagesOfInstruction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Languages of Instruction</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter number of languages"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
              />
            </FormControl>
            <FormDescription>
              How many languages are used for instruction at your school?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="internationalAccreditations"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">International Accreditations</FormLabel>
              <FormDescription>
                Select all accreditations your school currently holds.
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(AccreditationEnums).map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="internationalAccreditations"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.value),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalAccreditations"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Additional Accreditations *(click "enter" to add)
            </FormLabel>
            <FormDescription>
              List any further accreditations your school holds beyond the primary one. These are
              endorsements from educational bodies that verify quality standards.
            </FormDescription>
            <FormControl>
              <TagInput value={field.value || []} onChange={field.onChange} placeholder="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accreditationDocsLinks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Accreditation Documentation Links *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide links to accreditation documents or certificates..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please provide links to your accreditation documents or certificates.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="levelsOffered"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Educational Levels Offered</FormLabel>
              <FormDescription>Select all educational levels your school offers.</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(LevelEnums).map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="levelsOffered"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.value),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="curriculums"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Curriculums Offered</FormLabel>
              <FormDescription>Select all curriculum types your school offers.</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(CurriculumEnums).map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="curriculums"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.value),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalCurriculums"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">
              Additional Curriculums *(click "enter" to add)
            </FormLabel>
            <FormDescription>
              Include any other educational frameworks or programs your school offers alongside the
              main curriculum, such as specialized or international programs.
            </FormDescription>
            <FormControl>
              <TagInput value={field.value || []} onChange={field.onChange} placeholder="" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="extraLanguagesTaught"
        render={() => (
          // Corrected FormField implementation
          <FormField
            control={form.control}
            name="extraLanguagesTaught"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Language Programs *</FormLabel>
                <FormDescription>
                  Select to indicate your school offers additional language instruction beyond the
                  main curriculum requirements.
                </FormDescription>
                <MultiSelect
                  options={Object.values(languagesOptions).map((country) => country)}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select languages..."
                  variant="inverted"
                  maxCount={20}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      />
      <FormField
        control={form.control}
        name="hasGiftedPrograms"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Label className="p-4 space-x-2 cursor-pointer  flex items-start rounded-lg border has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <div className="space-y-1 leading-none">
                  <FormLabel>Gifted & Talented Programs</FormLabel>
                  <FormDescription>
                    Check if your school offers specialized programs, advanced curriculum, or
                    dedicated staff for gifted and talented students
                  </FormDescription>
                  <FormMessage />
                </div>
              </Label>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasSpecialNeedsSupport"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Label className="p-4 space-x-2 cursor-pointer  flex items-start rounded-lg border has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <div className="space-y-1 leading-none">
                  <FormLabel>Special Needs Support</FormLabel>
                  <FormDescription>
                    Check if your school provides specialized programs, trained staff, or
                    individualized support for students with special educational needs
                  </FormDescription>
                  <FormMessage />
                </div>
              </Label>
            </FormControl>
          </FormItem>
        )}
      />

      <InnovativeTeachingMethods form={form} />
    </div>
  );
};

export default DetachedAcademics;
