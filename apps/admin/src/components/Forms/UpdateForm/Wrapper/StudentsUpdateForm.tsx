import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolStudentsSchema, type SchoolStudentsNoID } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import z from 'zod';
import AbstractWrapper from './AbstractWrapper';
import DetachedStudents from '../../DetachedForms/DetachedStudents/DetachedStudents';
import NavigationButtons from '../NavigationButton/NavigationButtons';

const StudentsUpdateForm = () => {
  const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
  const school = detailedSchool!;
  const schoolId = school.schoolGeneral!.id;

  const form = useForm<SchoolStudentsNoID>({
    resolver: zodResolver(schoolStudentsSchema.extend({ id: z.string() })),
    defaultValues: school.schoolStudents,
  });

  const mutationFn = (payload: SchoolStudentsNoID) =>
    apiService.putThrowable(apiGateway.form.students.update(schoolId, schoolId), payload);

  const { mutateAsync, isPending } = useMutation({ mutationFn });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolStudentsNoID) => {
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
      <AbstractWrapper currentStep={6}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachedStudents form={form} />

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

export default StudentsUpdateForm;
