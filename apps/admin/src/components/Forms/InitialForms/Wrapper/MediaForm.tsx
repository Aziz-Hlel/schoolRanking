import { Form } from '@/components/ui/form';
import AbstractWrapper from './AbstractWrapper';
import DetachedMedia from '../../DetachedForms/Media/DetachedMedia';
import { schoolMediaSchema } from '@/types/School2.type';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';
import CONSTS from '@/constants/CONST';

type SchoolMedia = z.infer<typeof schoolMediaSchema>;

const MediaForm = () => {
  const { fetchDetailedSchool } = useDetailedSchool();

  const form = useForm<SchoolMedia>({ resolver: zodResolver(schoolMediaSchema) });
  const { detailedSchool } = useDetailedSchool();

  const schoolId = detailedSchool!.schoolGeneral!.id;

  const mutationFn = (formData: SchoolMedia) =>
    apiService.postThrowable(apiGateway.form.media.create(schoolId), formData);

  const queriesKeys = [['school', 'detailed', schoolId], ['user-schools']];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolMedia) => {
    const response = await safeAsyncMutate(data);

    if (response.success === false) {
      console.error('Failed to submit media form', response.error);
      return;
    }

    const schoolId = detailedSchool.schoolGeneral!.id;
    fetchDetailedSchool(schoolId);
    navigate(`/dashboard/add-school/${schoolId}/form/fees`);
  };

  return (
    <>
      <AbstractWrapper currentStep={CONSTS.formSteps.Media}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachedMedia form={form} />

            <NavigationButtons
              currentStep={4}
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

export default MediaForm;
