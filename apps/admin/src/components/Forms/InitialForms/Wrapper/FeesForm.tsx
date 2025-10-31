import useApiMutation from "@/hooks/useApiMutation";
import apiGateway from "@/service/Api/apiGateway";
import { apiService } from "@/service/Api/apiService";
import { schoolFeesSchema, type SchoolFeesNoID } from "@/types/School2.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AbstractWrapper from "./AbstractWrapper";
import { Form } from "@/components/ui/form";
import DetachdFees from "../../DetachedForms/Fees/DetachdFees";
import NavigationButtons from "../NavigationButton/NavigationButtons";
import { useDetailedSchool } from "@/contexts/DetailedSchoolProvider";

const FeesForm = () => {
  const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
  const schoolId = detailedSchool.schoolGeneral!.id;

  const form = useForm<SchoolFeesNoID>({
    resolver: zodResolver(schoolFeesSchema),
    defaultValues: {
      feeItems: [
        {
          title: "",
          currency: "USD",
          price: 0,
          description: "",
          isAdditionalFee: false,
        },
      ],
    },
  });

  const mutationFn = (formData: SchoolFeesNoID) =>
    apiService.postThrowable(apiGateway.form.fees.create(schoolId), formData);

  const queriesKeys = [["school", "detailed", schoolId], ["user-schools"]];

  const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queriesKeys });

  const navigate = useNavigate();

  const onSubmit = async (data: SchoolFeesNoID) => {
    const payload = produce(data, () => {
      //   if (!draft.hasTransportationServices) {
      // draft.transportationPolicies = undefined;
      //   }
    });

    const response = await safeAsyncMutate(payload);

    if (response.success === false) {
      console.error("Failed to submit general form", response.error);
      return;
    }
    await fetchMyDetailedSchool();
    navigate(`/dashboard/add-school/${schoolId}`);
  };

  return (
    <>
      <AbstractWrapper currentStep={5}>
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
