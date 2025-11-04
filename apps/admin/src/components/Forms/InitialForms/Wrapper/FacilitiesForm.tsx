import { Form } from '@/components/ui/form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolFacilitiesSchema } from '@/types/School2.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import DetachedFacilities from '../../DetachedForms/Facilities/DetachedFacilities';
import AbstractWrapper from './AbstractWrapper';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';
import { produce } from 'immer';
import CONSTS from '@/constants/CONST';

export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;

const FacilitiesForm = () => {
  const { detailedSchool } = useDetailedSchool();
  const schoolId = detailedSchool.schoolGeneral!.id;

  const form = useForm<SchoolFacilitiesData>({
    resolver: zodResolver(schoolFacilitiesSchema),
    defaultValues: {
      facilities: [],
      accessibilityFeatures: [],
      sustainabilityPractices: [],
      universityDestinations: [],
      csrActivities: '',
      safetyCompliance: false, // required and default false
      aiIntegration: false, // required and default false
      technologyReadiness: undefined,
      industryPartnerships: [],
      awardsAndRecognitions: '',
    },
  });

  const mutationFn = (formData: SchoolFacilitiesData) =>
    apiService.postThrowable(apiGateway.form.facilities.create(schoolId), formData);

  const queriesKeys = [['school', 'detailed', schoolId], ['user-schools']];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolFacilitiesData) => {
    const payload = produce(data, (draft) => {
      if (!draft.hasTransportationServices) {
        draft.transportationPolicies = undefined;
      }
    });

    const response = await safeAsyncMutate(payload);

    if (response.success === false) {
      console.error('Failed to submit facilities form', response.error);
      return;
    }

    navigate(`/dashboard/add-school/${schoolId}/form/staff`);
  };

  return (
    <>
      <AbstractWrapper currentStep={CONSTS.formSteps.Facilities}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DetachedFacilities form={form} />

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

export default FacilitiesForm;
