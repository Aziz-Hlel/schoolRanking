import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import apiRoutes from '@/service/Api/apiRoutes';
import { apiService } from '@/service/Api/apiService';
import { schoolStudentsSchema, type SchoolStudentsNoID } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import AbstractWrapper from './AbstractWrapper';
import DetachedStudents from '../../DetachedForms/Students/DetachedStudents';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import CONSTS from '@/constants/CONST';
import { Form } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { produce } from 'immer';

const StudentsUpdateForm = () => {
  const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
  const school = detailedSchool!;
  const schoolId = school.schoolGeneral!.id;

  const form = useForm<SchoolStudentsNoID>({
    resolver: zodResolver(schoolStudentsSchema),
    defaultValues: school.schoolStudents,
  });

  const mutationFn = (payload: SchoolStudentsNoID) =>
    apiService.putThrowable(apiRoutes.form.students.update(schoolId, schoolId), payload);

  const { mutateAsync, isPending } = useMutation({ mutationFn });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolStudentsNoID) => {
    const payload = produce(data, (draft) => {
      draft.averageStudentsPerClassroom.forEach((classroom, index) => {
        classroom.sortOrder = index;
      });
      draft.extracurricularActivities.forEach((activity, index) => {
        activity.sortOrder = index;
      });
    });
    const response = await safeAsyncMutate(mutateAsync, payload);

    if (response.success === false) {
      console.error('Failed to submit general form', response.error);
      return;
    }
    await fetchMyDetailedSchool();
    navigate('../../');
  };

  return (
    <>
      <AbstractWrapper currentStep={0}>
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
