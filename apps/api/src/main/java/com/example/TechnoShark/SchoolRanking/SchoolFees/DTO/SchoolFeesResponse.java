package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.util.Set;
import java.util.UUID;

public record SchoolFeesResponse(UUID id, Set<SchoolFeeItemResponse> tuitionFees,
        Set<SchoolFeeItemResponse> additionalFees) {

}
