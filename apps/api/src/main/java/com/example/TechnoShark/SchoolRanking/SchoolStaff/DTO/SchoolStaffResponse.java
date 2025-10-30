package com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO;

import java.time.LocalDate;
import java.util.List;

import com.example.TechnoShark.SchoolRanking.Enums.LanguageEnums;

public record SchoolStaffResponse(
                String id,
                String leadershipTeam,
                String leadershipProfileLink,
                int staffSizeEstimate,
                String teacherQualifications,
                List<String> teacherNationalities,
                List<LanguageEnums> teacherLanguages,
                String professionalDevelopment,
                LocalDate lastInspectionDate) {
}
