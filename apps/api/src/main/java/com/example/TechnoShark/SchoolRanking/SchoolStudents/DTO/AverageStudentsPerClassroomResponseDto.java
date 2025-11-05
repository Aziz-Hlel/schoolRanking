package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;


import lombok.Data;

@Data
public class AverageStudentsPerClassroomResponseDto {
    private String grade;
    private Integer numberOfStudents;
}