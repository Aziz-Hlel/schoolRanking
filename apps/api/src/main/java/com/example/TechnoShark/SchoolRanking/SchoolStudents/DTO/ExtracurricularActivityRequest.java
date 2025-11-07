package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ExtracurricularActivityRequest {

    @NotBlank
    private String name;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @NotNull
    @Min(value = 0, message = "Sort order must be greater than or equal to 0")
    private Integer sortOrder;
}