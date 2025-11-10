package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import java.util.Set;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolStudentsRequest {

    @Min(value = 0, message = "Total students must be a positive number")
    @Nullable
    private Integer totalStudents;

    @Size(max = 50, message = "You can include up to 50 nationalities")
    private Set<@NotBlank String> nationalities;

    @Size(max = 50, message = "You can include up to 50 extracurricular activities")
    private Set<@NotNull ExtracurricularActivityRequest> extracurricularActivities;

    @Size(max = 50, message = "You can include up to 50 classroom entries")
    private Set<@NotNull AverageStudentsPerClassroomRequest> averageStudentsPerClassroom;

    @NotNull
    private Boolean hasParentsCommittee = false;

}
