package com.example.TechnoShark.SchoolRanking.SchoolStaff.Mapper;

import com.example.TechnoShark.SchoolRanking.Enums.CountryEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LanguageEnums;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO.SchoolStaffRequestDTO;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO.SchoolStaffResponse;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.Model.SchoolStaff;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:47:41+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251001-1143, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class SchoolStaffMapperImpl implements SchoolStaffMapper {

    @Override
    public SchoolStaff toEntity(SchoolStaffRequestDTO dto, School school) {
        if ( dto == null && school == null ) {
            return null;
        }

        SchoolStaff schoolStaff = new SchoolStaff();

        if ( dto != null ) {
            schoolStaff.setLastInspectionDate( dto.getLastInspectionDate() );
            schoolStaff.setLeadershipProfileLink( dto.getLeadershipProfileLink() );
            schoolStaff.setLeadershipTeam( dto.getLeadershipTeam() );
            schoolStaff.setProfessionalDevelopment( dto.getProfessionalDevelopment() );
            schoolStaff.setStaffSizeEstimate( dto.getStaffSizeEstimate() );
            Set<LanguageEnums> set = dto.getTeacherLanguages();
            if ( set != null ) {
                schoolStaff.setTeacherLanguages( new LinkedHashSet<LanguageEnums>( set ) );
            }
            Set<CountryEnums> set1 = dto.getTeacherNationalities();
            if ( set1 != null ) {
                schoolStaff.setTeacherNationalities( new LinkedHashSet<CountryEnums>( set1 ) );
            }
            schoolStaff.setTeacherQualifications( dto.getTeacherQualifications() );
        }
        schoolStaff.setSchool( school );

        return schoolStaff;
    }

    @Override
    public SchoolStaff UpdateEntity(SchoolStaffRequestDTO dto, SchoolStaff entity) {
        if ( dto == null ) {
            return entity;
        }

        entity.setLastInspectionDate( dto.getLastInspectionDate() );
        entity.setLeadershipProfileLink( dto.getLeadershipProfileLink() );
        entity.setLeadershipTeam( dto.getLeadershipTeam() );
        entity.setProfessionalDevelopment( dto.getProfessionalDevelopment() );
        entity.setStaffSizeEstimate( dto.getStaffSizeEstimate() );
        if ( entity.getTeacherLanguages() != null ) {
            Set<LanguageEnums> set = dto.getTeacherLanguages();
            if ( set != null ) {
                entity.getTeacherLanguages().clear();
                entity.getTeacherLanguages().addAll( set );
            }
            else {
                entity.setTeacherLanguages( null );
            }
        }
        else {
            Set<LanguageEnums> set = dto.getTeacherLanguages();
            if ( set != null ) {
                entity.setTeacherLanguages( new LinkedHashSet<LanguageEnums>( set ) );
            }
        }
        if ( entity.getTeacherNationalities() != null ) {
            Set<CountryEnums> set1 = dto.getTeacherNationalities();
            if ( set1 != null ) {
                entity.getTeacherNationalities().clear();
                entity.getTeacherNationalities().addAll( set1 );
            }
            else {
                entity.setTeacherNationalities( null );
            }
        }
        else {
            Set<CountryEnums> set1 = dto.getTeacherNationalities();
            if ( set1 != null ) {
                entity.setTeacherNationalities( new LinkedHashSet<CountryEnums>( set1 ) );
            }
        }
        entity.setTeacherQualifications( dto.getTeacherQualifications() );

        return entity;
    }

    @Override
    public SchoolStaffResponse toDTO(SchoolStaff school_Staff) {
        if ( school_Staff == null ) {
            return null;
        }

        String leadershipTeam = null;
        String leadershipProfileLink = null;
        int staffSizeEstimate = 0;
        String teacherQualifications = null;
        List<CountryEnums> teacherNationalities = null;
        List<LanguageEnums> teacherLanguages = null;
        String professionalDevelopment = null;
        LocalDate lastInspectionDate = null;

        leadershipTeam = school_Staff.getLeadershipTeam();
        leadershipProfileLink = school_Staff.getLeadershipProfileLink();
        staffSizeEstimate = school_Staff.getStaffSizeEstimate();
        teacherQualifications = school_Staff.getTeacherQualifications();
        Set<CountryEnums> set = school_Staff.getTeacherNationalities();
        if ( set != null ) {
            teacherNationalities = new ArrayList<CountryEnums>( set );
        }
        Set<LanguageEnums> set1 = school_Staff.getTeacherLanguages();
        if ( set1 != null ) {
            teacherLanguages = new ArrayList<LanguageEnums>( set1 );
        }
        professionalDevelopment = school_Staff.getProfessionalDevelopment();
        lastInspectionDate = school_Staff.getLastInspectionDate();

        SchoolStaffResponse schoolStaffResponse = new SchoolStaffResponse( leadershipTeam, leadershipProfileLink, staffSizeEstimate, teacherQualifications, teacherNationalities, teacherLanguages, professionalDevelopment, lastInspectionDate );

        return schoolStaffResponse;
    }
}
