package com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO;

import java.util.Set;

public record SchoolStudentsResponse(
                Integer totalStudents,
                Set<String> nationalities,
                Set<ExtracurricularActivityResponse> extracurricularActivities,
                Set<AverageStudentsPerClassroomResponse> averageStudentsPerClassroom,
                Boolean hasParentsCommittee) {
}
