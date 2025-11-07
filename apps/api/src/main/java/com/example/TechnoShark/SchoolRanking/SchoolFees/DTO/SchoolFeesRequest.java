package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.util.List;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolFeesRequest {

    @Nullable
    @Size(max = 50, message = "Tuition fees must be less than 50")
    private List<SchoolFeeItemRequestDto> tuitionFees = List.of();

    @Nullable
    @Size(max = 50, message = "Tuition fees must be less than 50")
    private List<SchoolFeeItemRequestDto> additionalFees = List.of();

}
