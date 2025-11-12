package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AverageStudentsPerClassroomRequest {

    @NotBlank
    private String grade;

    @NotNull
    @Min(value = 0, message = "Number of students must be greater than or equal to 0")
    @Max(value = 1000, message = "Number of students must be less than or equal to 1000")
    private Integer numberOfStudents;

    @NotNull
    @Min(value = 0, message = "Sort order must be greater than or equal to 0")
    @Max(value = 1000, message = "Sort order must be less than or equal to 1000")
    private Integer sortOrder;

}