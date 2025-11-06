import useApiMutation from '@/hooks/useApiMutation';
import apiRoutes from '@/service/Api/apiRoutes';
import { apiService } from '@/service/Api/apiService';
import { schoolFeesSchema, type SchoolFeesNoID } from '@/types/School2.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { produce } from 'immer';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AbstractWrapper from './AbstractWrapper';
import { Form } from '@/components/ui/form';
import DetachdFees from '../../DetachedForms/Fees/DetachdFees';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import CONSTS from '@/constants/CONST';

const FeesForm = () => {
  const { detailedSchool } = useDetailedSchool();
  const schoolId = detailedSchool.schoolGeneral!.id;

  const form = useForm<SchoolFeesNoID>({
    resolver: zodResolver(schoolFeesSchema),
    defaultValues: {
      feeItems: [
        {
          title: '',
          currency: 'USD',
          price: 0,
          description: '',
          isAdditionalFee: false,
          sortOrder: 0,
        },
        {
          title: '',
          currency: 'USD',
          price: 0,
          description: '',
          isAdditionalFee: true,
          sortOrder: 0,
        },
      ],
    },
  });

  const mutationFn = (formData: SchoolFeesNoID) =>
    apiService.postThrowable(apiRoutes.form.fees.create(schoolId), formData);

  const queriesKeys = [['school', 'detailed', schoolId], ['user-schools']];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolFeesNoID) => {
    const payload = produce(data, (draft) => {
      let additionalFeesIndex = 0;
      let primaryFeesIndex = 0;

      draft.feeItems.forEach((feeItem, index) => {
        if (feeItem.isAdditionalFee) {
          draft.feeItems[index].sortOrder = additionalFeesIndex;
          additionalFeesIndex++;
        } else {
          draft.feeItems[index].sortOrder = primaryFeesIndex;
          primaryFeesIndex++;
        }
      });
    });

    console.log('payload : ', payload);
    const response = await safeAsyncMutate(payload);

    if (response.success === false) {
      console.error('Failed to submit fees form', response.error);
      return;
    }
    navigate(`/dashboard/add-school/${schoolId}/form/students`);
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

export default FeesForm;
