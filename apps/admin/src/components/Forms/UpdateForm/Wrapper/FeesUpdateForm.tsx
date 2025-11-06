import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import apiRoutes from '@/service/Api/apiRoutes';
import { apiService } from '@/service/Api/apiService';
import { schoolFeesSchema, type SchoolFeesNoID } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AbstractWrapper from './AbstractWrapper';
import { Form } from '@/components/ui/form';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import DetachdFees from '../../DetachedForms/Fees/DetachdFees';
import z from 'zod';
import CONSTS from '@/constants/CONST';

const FeesUpdateForm = () => {
  const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
  const school = detailedSchool!;
  const schoolId = school.schoolGeneral!.id;

  const form = useForm<SchoolFeesNoID>({
    resolver: zodResolver(schoolFeesSchema.extend({ id: z.string() })),
    defaultValues: school.schoolFees,
  });

  const mutationFn = (payload: SchoolFeesNoID) =>
    apiService.putThrowable(apiRoutes.form.fees.update(schoolId, schoolId), payload);

  const { mutateAsync, isPending } = useMutation({ mutationFn });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolFeesNoID) => {
    const response = await safeAsyncMutate(mutateAsync, data);

    if (response.success === false) {
      console.error('Failed to submit general form', response.error);
      return;
    }
    await fetchMyDetailedSchool();
    navigate('../../');
  };

  return (
    <>
      <AbstractWrapper currentStep={CONSTS.formSteps.Fees}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachdFees form={form} />

            <NavigationButtons
              currentStep={0}
              cancelPath="../../"
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

export default FeesUpdateForm;
