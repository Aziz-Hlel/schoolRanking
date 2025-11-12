package com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO;

import java.util.Set;

import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.InnovativeTeachingMethods;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolAcademicsRequest {

    @NotNull
    @Min(value = 1, message = "Languages of instruction must be at least 1")
    @Max(value = 20, message = "Languages of instruction cannot exceed 20")
    private int languagesOfInstruction;

    @NotNull
    private Set<@NotNull AccreditationEnums> internationalAccreditations = Set.of();

    @NotNull
    @Size(max = 50, message = "Additional accreditations must be less than 50")
    private Set<@NotBlank(message = "Accreditation name cannot be blank") @Size(max = 50, message = "Accreditation name must be at most 50 characters") String> additionalAccreditations = Set
            .of();

    @Nullable
    @Size(max = 100, message = "Accreditation documents links must be less than 100 characters")
    private String accreditationDocsLinks;

    @NotNull
    private Set<@NotNull LevelEnums> levelsOffered = Set.of();

    @NotNull
    private Set<@NotNull CurriculumEnums> curriculums = Set.of();

    @NotNull
    @Size(max = 50, message = "Additional curriculums must be less than 50")
    private Set<@NotBlank(message = "Curriculum name cannot be blank") @Size(max = 50, message = "Curriculum name must be at most 50 characters") String> additionalCurriculums = Set
            .of();

    private boolean hasGiftedPrograms;

    private boolean hasSpecialNeedsSupport;

    @Size(max = 50, message = "Extra languages taught must be less than 50")
    private Set<@NotBlank(message = "Language name cannot be blank") @Size(max = 50, message = "Language name must be at most 50 characters") String> extraLanguagesTaught = Set
            .of();

    @NotNull
    @Size(max = 50, message = "Innovative teaching methods must be less than 50")
    private Set<@NotNull InnovativeTeachingMethods> innovativeTeachingMethods = Set.of();
}
