package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import com.example.TechnoShark.SchoolRanking.Enums.EstimateType;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AverageStudentsPerClassroomRequestDto {

    @NotBlank
    private String grade;

    @NotNull
    @Min(value = 0, message = "Number of students must be greater than or equal to 0")
    private Integer numberOfStudents;

    @Nullable
    private EstimateType estimateType; // can be null (optional)
}