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
    date = "2025-10-28T09:41:26+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.16 (Eclipse Adoptium)"
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
            schoolStaff.setLeadershipTeam( dto.getLeadershipTeam() );
            schoolStaff.setLeadershipProfileLink( dto.getLeadershipProfileLink() );
            schoolStaff.setStaffSizeEstimate( dto.getStaffSizeEstimate() );
            schoolStaff.setTeacherQualifications( dto.getTeacherQualifications() );
            schoolStaff.setProfessionalDevelopment( dto.getProfessionalDevelopment() );
            Set<CountryEnums> set = dto.getTeacherNationalities();
            if ( set != null ) {
                schoolStaff.setTeacherNationalities( new LinkedHashSet<CountryEnums>( set ) );
            }
            Set<LanguageEnums> set1 = dto.getTeacherLanguages();
            if ( set1 != null ) {
                schoolStaff.setTeacherLanguages( new LinkedHashSet<LanguageEnums>( set1 ) );
            }
            schoolStaff.setLastInspectionDate( dto.getLastInspectionDate() );
        }
        schoolStaff.setSchool( school );

        return schoolStaff;
    }

    @Override
    public SchoolStaff UpdateEntity(SchoolStaffRequestDTO dto, SchoolStaff entity) {
        if ( dto == null ) {
            return entity;
        }

        entity.setLeadershipTeam( dto.getLeadershipTeam() );
        entity.setLeadershipProfileLink( dto.getLeadershipProfileLink() );
        entity.setStaffSizeEstimate( dto.getStaffSizeEstimate() );
        entity.setTeacherQualifications( dto.getTeacherQualifications() );
        entity.setProfessionalDevelopment( dto.getProfessionalDevelopment() );
        if ( entity.getTeacherNationalities() != null ) {
            Set<CountryEnums> set = dto.getTeacherNationalities();
            if ( set != null ) {
                entity.getTeacherNationalities().clear();
                entity.getTeacherNationalities().addAll( set );
            }
            else {
                entity.setTeacherNationalities( null );
            }
        }
        else {
            Set<CountryEnums> set = dto.getTeacherNationalities();
            if ( set != null ) {
                entity.setTeacherNationalities( new LinkedHashSet<CountryEnums>( set ) );
            }
        }
        if ( entity.getTeacherLanguages() != null ) {
            Set<LanguageEnums> set1 = dto.getTeacherLanguages();
            if ( set1 != null ) {
                entity.getTeacherLanguages().clear();
                entity.getTeacherLanguages().addAll( set1 );
            }
            else {
                entity.setTeacherLanguages( null );
            }
        }
        else {
            Set<LanguageEnums> set1 = dto.getTeacherLanguages();
            if ( set1 != null ) {
                entity.setTeacherLanguages( new LinkedHashSet<LanguageEnums>( set1 ) );
            }
        }
        entity.setLastInspectionDate( dto.getLastInspectionDate() );

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
