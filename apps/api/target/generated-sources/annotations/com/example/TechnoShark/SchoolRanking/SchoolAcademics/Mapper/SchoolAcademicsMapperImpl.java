package com.example.TechnoShark.SchoolRanking.SchoolAcademics.Mapper;

import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO.SchoolAcademicsRequest;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO.SchoolAcademicsResponse;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.SchoolAcademics;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:47:41+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251001-1143, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class SchoolAcademicsMapperImpl implements SchoolAcademicsMapper {

    @Override
    public SchoolAcademics toEntity(SchoolAcademicsRequest Dto, School school) {
        if ( Dto == null && school == null ) {
            return null;
        }

        SchoolAcademics.SchoolAcademicsBuilder schoolAcademics = SchoolAcademics.builder();

        if ( Dto != null ) {
            schoolAcademics.accreditationDocsLinks( Dto.getAccreditationDocsLinks() );
            Set<CurriculumEnums> set = Dto.getCurriculums();
            if ( set != null ) {
                schoolAcademics.curriculums( new LinkedHashSet<CurriculumEnums>( set ) );
            }
            Set<AccreditationEnums> set1 = Dto.getInternationalAccreditations();
            if ( set1 != null ) {
                schoolAcademics.internationalAccreditations( new LinkedHashSet<AccreditationEnums>( set1 ) );
            }
            schoolAcademics.languagesOfInstruction( Dto.getLanguagesOfInstruction() );
            Set<LevelEnums> set2 = Dto.getLevelsOffered();
            if ( set2 != null ) {
                schoolAcademics.levelsOffered( new LinkedHashSet<LevelEnums>( set2 ) );
            }
        }
        schoolAcademics.school( school );

        return schoolAcademics.build();
    }

    @Override
    public SchoolAcademics updateEntity(SchoolAcademicsRequest Dto, UUID schooId, SchoolAcademics schoolAcademics) {
        if ( Dto == null && schooId == null ) {
            return schoolAcademics;
        }

        if ( Dto != null ) {
            schoolAcademics.setAccreditationDocsLinks( Dto.getAccreditationDocsLinks() );
            if ( schoolAcademics.getCurriculums() != null ) {
                Set<CurriculumEnums> set = Dto.getCurriculums();
                if ( set != null ) {
                    schoolAcademics.getCurriculums().clear();
                    schoolAcademics.getCurriculums().addAll( set );
                }
                else {
                    schoolAcademics.setCurriculums( null );
                }
            }
            else {
                Set<CurriculumEnums> set = Dto.getCurriculums();
                if ( set != null ) {
                    schoolAcademics.setCurriculums( new LinkedHashSet<CurriculumEnums>( set ) );
                }
            }
            if ( schoolAcademics.getInternationalAccreditations() != null ) {
                Set<AccreditationEnums> set1 = Dto.getInternationalAccreditations();
                if ( set1 != null ) {
                    schoolAcademics.getInternationalAccreditations().clear();
                    schoolAcademics.getInternationalAccreditations().addAll( set1 );
                }
                else {
                    schoolAcademics.setInternationalAccreditations( null );
                }
            }
            else {
                Set<AccreditationEnums> set1 = Dto.getInternationalAccreditations();
                if ( set1 != null ) {
                    schoolAcademics.setInternationalAccreditations( new LinkedHashSet<AccreditationEnums>( set1 ) );
                }
            }
            schoolAcademics.setLanguagesOfInstruction( Dto.getLanguagesOfInstruction() );
            if ( schoolAcademics.getLevelsOffered() != null ) {
                Set<LevelEnums> set2 = Dto.getLevelsOffered();
                if ( set2 != null ) {
                    schoolAcademics.getLevelsOffered().clear();
                    schoolAcademics.getLevelsOffered().addAll( set2 );
                }
                else {
                    schoolAcademics.setLevelsOffered( null );
                }
            }
            else {
                Set<LevelEnums> set2 = Dto.getLevelsOffered();
                if ( set2 != null ) {
                    schoolAcademics.setLevelsOffered( new LinkedHashSet<LevelEnums>( set2 ) );
                }
            }
        }
        schoolAcademics.setId( schooId );

        return schoolAcademics;
    }

    @Override
    public SchoolAcademicsResponse toDto(SchoolAcademics Entity) {
        if ( Entity == null ) {
            return null;
        }

        UUID id = null;
        int languagesOfInstruction = 0;
        Set<AccreditationEnums> internationalAccreditations = null;
        String accreditationDocsLinks = null;
        Set<LevelEnums> levelsOffered = null;
        Set<CurriculumEnums> curriculums = null;

        id = Entity.getId();
        languagesOfInstruction = Entity.getLanguagesOfInstruction();
        Set<AccreditationEnums> set = Entity.getInternationalAccreditations();
        if ( set != null ) {
            internationalAccreditations = new LinkedHashSet<AccreditationEnums>( set );
        }
        accreditationDocsLinks = Entity.getAccreditationDocsLinks();
        Set<LevelEnums> set1 = Entity.getLevelsOffered();
        if ( set1 != null ) {
            levelsOffered = new LinkedHashSet<LevelEnums>( set1 );
        }
        Set<CurriculumEnums> set2 = Entity.getCurriculums();
        if ( set2 != null ) {
            curriculums = new LinkedHashSet<CurriculumEnums>( set2 );
        }

        SchoolAcademicsResponse schoolAcademicsResponse = new SchoolAcademicsResponse( id, languagesOfInstruction, internationalAccreditations, accreditationDocsLinks, levelsOffered, curriculums );

        return schoolAcademicsResponse;
    }
}
