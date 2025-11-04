package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ExtracurricularActivityRequestDto {

    @NotBlank
    private String name;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
}