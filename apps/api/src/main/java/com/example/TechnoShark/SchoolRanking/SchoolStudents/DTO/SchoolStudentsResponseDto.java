package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import java.util.Set;

public record SchoolStudentsResponseDto(
                Integer totalStudents,
                Set<String> nationalities,
                Set<ExtracurricularActivityResponseDto> extracurricularActivities,
                Set<AverageStudentsPerClassroomResponseDto> averageStudentsPerClassroom) {
}
