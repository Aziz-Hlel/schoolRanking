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
import lombok.Data;

@Data
public class SchoolFacilitiesRequest {

    @Size(max = 50, message = "You can include up to 50 facilities")
    private List<@NotNull FacilityEnums> facilities = List.of();

    @Size(max = 50, message = "You can include up to 50 accessibility features")
    private List<@NotNull AccessibilityEnums> accessibilityFeatures = List.of();

    @Size(max = 50, message = "You can include up to 50 sustainability practices")
    private List<@NotNull SustainabilityEnums> sustainabilityPractices = List.of();

    @Size(min = 1, message = "You must include at least 1 university destination")
    @Size(max = 50, message = "You can include up to 50 university destinations")
    private List<@NotBlank(message = "University destination cannot be blank") @Size(max = 50, message = "University destination must be at most 50 characters") String> universityDestinations = List
            .of();

    @NotBlank(message = "CSR activities cannot be blank")
    @Size(max = 1000, message = "CSR activities must be less than 1000 characters")
    private String csrActivities;

    @NotNull(message = "Safety compliance cannot be null")
    private Boolean safetyCompliance;

    @NotNull(message = "AI integration cannot be null")
    private Boolean aiIntegration;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    @Nullable
    private String aiIntegrationDescription;

    // @NotNull
    private RatingLevelEnums technologyReadiness;

    @NotNull

    private List<@NotBlank(message = "Industry partnership cannot be blank") @Size(max = 50, message = "Industry partnership must be at most 50 characters") String> industryPartnerships = List
            .of();

    @Size(max = 255, message = "Description must be less than 255 characters")
    @Nullable
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

    @Nullable
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String transportationPolicies;

}
