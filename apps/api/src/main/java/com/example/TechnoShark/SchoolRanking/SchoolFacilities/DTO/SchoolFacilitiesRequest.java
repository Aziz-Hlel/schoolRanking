package com.example.TechnoShark.SchoolRanking.SchoolFacilities.DTO;

import java.util.List;

import com.example.TechnoShark.SchoolRanking.Enums.AccessibilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.FacilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.RatingLevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SustainabilityEnums;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchoolFacilitiesRequest {

    @NotNull
    private List<FacilityEnums> facilities;

    @NotNull
    private List<AccessibilityEnums> accessibilityFeatures;

    @NotNull
    private List<SustainabilityEnums> sustainabilityPractices;

    @NotNull
    private List<String> universityDestinations;

    @NotBlank
    private String csrActivities;

    @NotNull
    private Boolean safetyCompliance;

    @NotNull
    private Boolean aiIntegration;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    @Nullable
    private String aiIntegrationDescription;

    // @NotNull
    private RatingLevelEnums technologyReadiness;

    @NotNull
    private List<String> industryPartnerships;

    private String awardsAndRecognitions;

    @NotNull
    private Boolean hasNurse;

    @NotNull // ? even though you can use boolean , you should always use the wrapper Boolean
             // in order to assure validation the variable not null, otherwise it ll default
             // to false if it s empty with type boolean
    private Boolean hasPsychologist;

    @NotNull
    private Boolean hasFoodService;

    @NotNull
    private Boolean hasNutritionist;

    @NotNull
    private Boolean hasTransportationServices;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String transportationPolicies;

}
