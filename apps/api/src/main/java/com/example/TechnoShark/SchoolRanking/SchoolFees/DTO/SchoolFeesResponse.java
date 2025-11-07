package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.util.List;
import java.util.UUID;

public record SchoolFeesResponse(UUID id, List<SchoolFeeItemResponse> tuitionFees,
                List<SchoolFeeItemResponse> additionalFees) {
}
