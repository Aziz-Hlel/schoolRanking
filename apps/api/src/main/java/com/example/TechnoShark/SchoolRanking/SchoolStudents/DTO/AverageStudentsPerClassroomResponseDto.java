package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import com.example.TechnoShark.SchoolRanking.Enums.EstimateType;

import lombok.Data;

@Data
public class AverageStudentsPerClassroomResponseDto {
    private String grade;
    private Integer numberOfStudents;
    private EstimateType estimateType;
}