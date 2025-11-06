import AbstractWrapper from './AbstractWrapper';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '@/service/Api/apiRoutes';
import { apiService } from '@/service/Api/apiService';
import { schoolStaffSchema } from '@/types/School2.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldErrors } from 'react-hook-form';
import DetachedStaff from '../../DetachedForms/Staff/DetachedStaff';
import type z from 'zod';
import { Form } from '@/components/ui/form';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';
import CONSTS from '@/constants/CONST';

type SchoolStaff = z.infer<typeof schoolStaffSchema>;

const StaffForm = () => {
  const form = useForm<SchoolStaff>({ resolver: zodResolver(schoolStaffSchema) });
  const { detailedSchool } = useDetailedSchool();
  const schoolId = detailedSchool!.schoolGeneral!.id;
  const mutationFn = (formData: SchoolStaff) =>
    apiService.postThrowable(apiRoutes.form.staff.create(schoolId), formData);

  const queriesKeys = [['school', 'detailed', schoolId], ['user-schools']];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolStaff) => {
    const response = await safeAsyncMutate(data);

    if (response.success === false) {
      console.error('Failed to submit staff form', response.error);
      return;
    }

    const schoolId = detailedSchool.schoolGeneral!.id;
    navigate(`/dashboard/add-school/${schoolId}/form/media`);
  };

  const onError = (errors: FieldErrors<SchoolStaff>) => {
    console.error('Form validation errors:', errors);
  };

  return (
    <>
      <AbstractWrapper currentStep={CONSTS.formSteps.Staff}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachedStaff form={form} />

            <NavigationButtons
              currentStep={0}
              isSubmitting={isPending}
              onNext={() => {}}
              onPrevious={() => {}}
              onSubmit={() => {}}
            />
          </form>
        </Form>
      </AbstractWrapper>
    </>
  );
};

export default StaffForm;
