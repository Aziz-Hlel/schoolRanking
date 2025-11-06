package com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO;

import java.util.Set;
import java.util.UUID;

import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.InnovativeTeachingMethods;

public record SchoolAcademicsResponse(
        UUID id,
        int languagesOfInstruction,
        Set<AccreditationEnums> internationalAccreditations,
        Set<String> additionalAccreditations,
        String accreditationDocsLinks,
        Set<LevelEnums> levelsOffered,
        Set<CurriculumEnums> curriculums,
        Set<String> additionalCurriculums,
        boolean hasGiftedPrograms,
        boolean hasSpecialNeedsSupport,
        Set<String> extraLanguagesTaught,
        Set<InnovativeTeachingMethods> innovativeTeachingMethods) {
}