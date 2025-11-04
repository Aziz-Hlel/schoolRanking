import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolStudentsSchema } from '@/types/School2.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import AbstractWrapper from './AbstractWrapper';
import { Form } from '@/components/ui/form';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import DetachedStudents from '../../DetachedForms/DetachedStudents/DetachedStudents';
import CONSTS from '@/constants/CONST';

type SchoolStudents = z.infer<typeof schoolStudentsSchema>;

const StudentsForm = () => {
  const form = useForm<SchoolStudents>({ resolver: zodResolver(schoolStudentsSchema) });
  const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
  const schoolId = detailedSchool!.schoolGeneral!.id;
  const mutationFn = (formData: SchoolStudents) =>
    apiService.postThrowable(apiGateway.form.students.create(schoolId), formData);

  const queriesKeys = [['school', 'detailed', schoolId], ['user-schools']];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolStudents) => {
    const response = await safeAsyncMutate(data);

    if (response.success === false) {
      console.error('Failed to submit students form', response.error);
      return;
    }
    await fetchMyDetailedSchool();
    navigate(`/dashboard/add-school/${schoolId}`);
  };
  return (
    <>
      <AbstractWrapper currentStep={CONSTS.formSteps.Students}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachedStudents form={form} />

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

export default StudentsForm;
