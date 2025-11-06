package com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO;

import java.util.Set;

import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.InnovativeTeachingMethods;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolAcademicsRequest {

    @NotNull
    private int languagesOfInstruction;

    @NotNull
    private Set<AccreditationEnums> internationalAccreditations;

    @NotNull
    @Size(max = 50, message = "Additional accreditations must be less than 50")
    private Set<@NotNull String> additionalAccreditations = Set.of();

    private String accreditationDocsLinks;

    @NotNull
    private Set<LevelEnums> levelsOffered;

    @NotNull
    private Set<CurriculumEnums> curriculums;

    @NotNull
    @Size(max = 50, message = "Additional curriculums must be less than 50")
    private Set<@NotNull String> additionalCurriculums = Set.of();

    private boolean hasGiftedPrograms;

    private boolean hasSpecialNeedsSupport;

    @Size(min = 1, message = "At least one extra language must be provided or set to null")
    private Set<@NotNull String> extraLanguagesTaught;

    @NotNull
    @Size(max = 50, message = "Innovative teaching methods must be less than 50")
    private Set<InnovativeTeachingMethods> innovativeTeachingMethods = Set.of();
}
