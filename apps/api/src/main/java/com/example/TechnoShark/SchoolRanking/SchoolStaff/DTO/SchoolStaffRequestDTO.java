package com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.example.TechnoShark.SchoolRanking.Enums.LanguageEnums;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolStaffRequestDTO {

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Leadership team must be at most 255 characters")
    private String leadershipTeam;

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Leadership profile link must be at most 255 characters")
    private String leadershipProfileLink;

    @Min(value = 1, message = "Staff size estimate must be at least 1")
    @Max(value = 1000, message = "Staff size estimate must be at most 1000")
    private int staffSizeEstimate;

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Leadership profile link must be at most 255 characters")
    private String teacherQualifications;

    @NotNull(message = "Teacher nationalities must not be null")
    @Size(min = 1, message = "At least one teacher nationality must be provided")
    private Set<@NotBlank @Size(max = 50, message = "Teacher nationality must be at most 50 characters") String> teacherNationalities = new HashSet<>();

    @NotNull(message = "Teacher languages must not be null")
    @Size(min = 1, message = "At least one teacher language must be provided")
    private Set<@NotNull LanguageEnums> teacherLanguages = new HashSet<>();

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Professional development must not be blank")
    @Size(max = 255, message = "Professional development must be at most 255 characters")
    private String professionalDevelopment;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @PastOrPresent(message = "Last inspection date cannot be in the future")
    @Nullable
    private LocalDate lastInspectionDate; // ! the format should be "YYYY-MM-DD" else it will throw a 400 mal JSON erro
                                          // , which is not very vague
}
