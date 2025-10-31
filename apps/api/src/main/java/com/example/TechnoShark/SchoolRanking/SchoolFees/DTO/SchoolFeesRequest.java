package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.util.Set;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolFeesRequest {

    @NotNull
    @Size(max = 50, message = "Fee items must be less than 50")
    private Set<SchoolFeeItemRequestDto> feeItems;

}
