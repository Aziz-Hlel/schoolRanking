package com.example.TechnoShark.SchoolRanking.Schools.Mapper;

import com.example.TechnoShark.SchoolRanking.Enums.AccessibilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.AccreditationEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CountryEnums;
import com.example.TechnoShark.SchoolRanking.Enums.CurriculumEnums;
import com.example.TechnoShark.SchoolRanking.Enums.FacilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LanguageEnums;
import com.example.TechnoShark.SchoolRanking.Enums.LevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.RatingLevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SchoolTypeEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SustainabilityEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO.SchoolAcademicsResponse;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.SchoolAcademics;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.DTO.SchoolFacilitiesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.Model.SchoolFacilities;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaResponse;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Model.SchoolMedia;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO.SchoolStaffResponse;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.Model.SchoolStaff;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.MySchoolsPreview;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolDetailedResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolDetailedResponse2;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolPageResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolProgressResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolRequest;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolResponse;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import com.example.TechnoShark.SchoolRanking.Users.Model.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:47:20+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251001-1143, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class SchoolMapperImpl implements SchoolMapper {

    @Override
    public School toEntity(SchoolRequest dto, User user) {
        if ( dto == null && user == null ) {
            return null;
        }

        School school = new School();

        if ( dto != null ) {
            school.setEmail( dto.getEmail() );
            school.setAddress( dto.getAddress() );
            school.setCity( dto.getCity() );
            school.setCountry( dto.getCountry() );
            school.setName( dto.getName() );
            school.setPhoneNumber( dto.getPhoneNumber() );
            school.setType( dto.getType() );
            school.setWebsite( dto.getWebsite() );
            school.setYearEstablished( dto.getYearEstablished() );
        }
        if ( user != null ) {
            if ( user.getCreatedAt() != null ) {
                school.setCreatedAt( LocalDateTime.ofInstant( user.getCreatedAt().toInstant(), ZoneId.of( "UTC" ) ) );
            }
            if ( user.getUpdatedAt() != null ) {
                school.setUpdatedAt( LocalDateTime.ofInstant( user.getUpdatedAt().toInstant(), ZoneId.of( "UTC" ) ) );
            }
        }
        school.setLastFormStep( 1 );

        return school;
    }

    @Override
    public School updateSchoolFromDto(SchoolRequest dto, School entity) {
        if ( dto == null ) {
            return entity;
        }

        entity.setAddress( dto.getAddress() );
        entity.setCity( dto.getCity() );
        entity.setCountry( dto.getCountry() );
        entity.setEmail( dto.getEmail() );
        entity.setName( dto.getName() );
        entity.setPhoneNumber( dto.getPhoneNumber() );
        entity.setType( dto.getType() );
        entity.setWebsite( dto.getWebsite() );
        entity.setYearEstablished( dto.getYearEstablished() );

        return entity;
    }

    @Override
    public SchoolResponse toDto(School school) {
        if ( school == null ) {
            return null;
        }

        SchoolResponse.SchoolResponseBuilder schoolResponse = SchoolResponse.builder();

        schoolResponse.address( school.getAddress() );
        schoolResponse.city( school.getCity() );
        schoolResponse.country( school.getCountry() );
        schoolResponse.email( school.getEmail() );
        schoolResponse.id( school.getId() );
        schoolResponse.name( school.getName() );
        schoolResponse.phoneNumber( school.getPhoneNumber() );
        schoolResponse.type( school.getType() );
        schoolResponse.website( school.getWebsite() );
        schoolResponse.yearEstablished( school.getYearEstablished() );

        return schoolResponse.build();
    }

    @Override
    public SchoolPageResponse toPageDto(School school) {
        if ( school == null ) {
            return null;
        }

        boolean isComplete = false;
        UUID id = null;
        String name = null;
        CountryEnums country = null;
        String city = null;
        String address = null;
        String phoneNumber = null;
        String email = null;
        String website = null;

        if ( school.getFormsCompleted() != null ) {
            isComplete = school.getFormsCompleted();
        }
        id = school.getId();
        name = school.getName();
        country = school.getCountry();
        city = school.getCity();
        address = school.getAddress();
        phoneNumber = school.getPhoneNumber();
        email = school.getEmail();
        website = school.getWebsite();

        String adminUsername = "admin";

        SchoolPageResponse schoolPageResponse = new SchoolPageResponse( id, name, country, city, address, phoneNumber, email, adminUsername, website, isComplete );

        return schoolPageResponse;
    }

    @Override
    public SchoolDetailedResponse toDetailedDto(School school) {
        if ( school == null ) {
            return null;
        }

        UUID id = null;
        String name = null;
        String city = null;
        String address = null;
        String phoneNumber = null;
        String email = null;
        Integer yearEstablished = null;
        SchoolTypeEnums type = null;
        String website = null;
        CountryEnums country = null;
        SchoolStaffResponse schoolStaff = null;
        SchoolFacilitiesResponse schoolFacilities = null;
        SchoolMediaResponse schoolMedia = null;
        SchoolAcademicsResponse schoolAcademics = null;

        id = school.getId();
        name = school.getName();
        city = school.getCity();
        address = school.getAddress();
        phoneNumber = school.getPhoneNumber();
        email = school.getEmail();
        yearEstablished = school.getYearEstablished();
        type = school.getType();
        website = school.getWebsite();
        country = school.getCountry();
        schoolStaff = schoolStaffToSchoolStaffResponse( school.getSchoolStaff() );
        schoolFacilities = schoolFacilitiesToSchoolFacilitiesResponse( school.getSchoolFacilities() );
        schoolMedia = schoolMediaToSchoolMediaResponse( school.getSchoolMedia() );
        schoolAcademics = schoolAcademicsToSchoolAcademicsResponse( school.getSchoolAcademics() );

        SchoolDetailedResponse schoolDetailedResponse = new SchoolDetailedResponse( id, name, city, address, phoneNumber, email, yearEstablished, type, website, country, schoolStaff, schoolFacilities, schoolMedia, schoolAcademics );

        return schoolDetailedResponse;
    }

    @Override
    public SchoolDetailedResponse2 toDetailedDto2(School school) {
        if ( school == null ) {
            return null;
        }

        SchoolResponse schoolGeneral = null;
        SchoolStaffResponse schoolStaff = null;
        SchoolFacilitiesResponse schoolFacilities = null;
        SchoolMediaResponse schoolMedia = null;
        SchoolAcademicsResponse schoolAcademics = null;

        schoolGeneral = toDto( school );
        schoolStaff = schoolStaffToSchoolStaffResponse( school.getSchoolStaff() );
        schoolFacilities = schoolFacilitiesToSchoolFacilitiesResponse( school.getSchoolFacilities() );
        schoolMedia = schoolMediaToSchoolMediaResponse( school.getSchoolMedia() );
        schoolAcademics = schoolAcademicsToSchoolAcademicsResponse( school.getSchoolAcademics() );

        SchoolDetailedResponse2 schoolDetailedResponse2 = new SchoolDetailedResponse2( schoolGeneral, schoolStaff, schoolFacilities, schoolMedia, schoolAcademics );

        return schoolDetailedResponse2;
    }

    @Override
    public SchoolProgressResponse toProgressDto(School school) {
        if ( school == null ) {
            return null;
        }

        Boolean formsCompleted = null;
        Integer lastFormStep = null;

        formsCompleted = school.getFormsCompleted();
        lastFormStep = school.getLastFormStep();

        SchoolProgressResponse schoolProgressResponse = new SchoolProgressResponse( formsCompleted, lastFormStep );

        return schoolProgressResponse;
    }

    @Override
    public List<MySchoolsPreview> toSideBarSchoolDto(List<School> schools) {
        if ( schools == null ) {
            return null;
        }

        List<MySchoolsPreview> list = new ArrayList<MySchoolsPreview>( schools.size() );
        for ( School school : schools ) {
            list.add( schoolToMySchoolsPreview( school ) );
        }

        return list;
    }

    protected SchoolStaffResponse schoolStaffToSchoolStaffResponse(SchoolStaff schoolStaff) {
        if ( schoolStaff == null ) {
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

        leadershipTeam = schoolStaff.getLeadershipTeam();
        leadershipProfileLink = schoolStaff.getLeadershipProfileLink();
        staffSizeEstimate = schoolStaff.getStaffSizeEstimate();
        teacherQualifications = schoolStaff.getTeacherQualifications();
        Set<CountryEnums> set = schoolStaff.getTeacherNationalities();
        if ( set != null ) {
            teacherNationalities = new ArrayList<CountryEnums>( set );
        }
        Set<LanguageEnums> set1 = schoolStaff.getTeacherLanguages();
        if ( set1 != null ) {
            teacherLanguages = new ArrayList<LanguageEnums>( set1 );
        }
        professionalDevelopment = schoolStaff.getProfessionalDevelopment();
        lastInspectionDate = schoolStaff.getLastInspectionDate();

        SchoolStaffResponse schoolStaffResponse = new SchoolStaffResponse( leadershipTeam, leadershipProfileLink, staffSizeEstimate, teacherQualifications, teacherNationalities, teacherLanguages, professionalDevelopment, lastInspectionDate );

        return schoolStaffResponse;
    }

    protected SchoolFacilitiesResponse schoolFacilitiesToSchoolFacilitiesResponse(SchoolFacilities schoolFacilities) {
        if ( schoolFacilities == null ) {
            return null;
        }

        UUID id = null;
        List<FacilityEnums> facilities = null;
        List<AccessibilityEnums> accessibilityFeatures = null;
        List<SustainabilityEnums> sustainabilityPractices = null;
        List<String> universityDestinations = null;
        String csrActivities = null;
        List<String> industryPartnerships = null;
        boolean safetyCompliance = false;
        boolean aiIntegration = false;
        RatingLevelEnums technologyReadiness = null;
        String awardsAndRecognitions = null;

        id = schoolFacilities.getId();
        Set<FacilityEnums> set = schoolFacilities.getFacilities();
        if ( set != null ) {
            facilities = new ArrayList<FacilityEnums>( set );
        }
        Set<AccessibilityEnums> set1 = schoolFacilities.getAccessibilityFeatures();
        if ( set1 != null ) {
            accessibilityFeatures = new ArrayList<AccessibilityEnums>( set1 );
        }
        Set<SustainabilityEnums> set2 = schoolFacilities.getSustainabilityPractices();
        if ( set2 != null ) {
            sustainabilityPractices = new ArrayList<SustainabilityEnums>( set2 );
        }
        Set<String> set3 = schoolFacilities.getUniversityDestinations();
        if ( set3 != null ) {
            universityDestinations = new ArrayList<String>( set3 );
        }
        csrActivities = schoolFacilities.getCsrActivities();
        Set<String> set4 = schoolFacilities.getIndustryPartnerships();
        if ( set4 != null ) {
            industryPartnerships = new ArrayList<String>( set4 );
        }
        if ( schoolFacilities.getSafetyCompliance() != null ) {
            safetyCompliance = schoolFacilities.getSafetyCompliance();
        }
        if ( schoolFacilities.getAiIntegration() != null ) {
            aiIntegration = schoolFacilities.getAiIntegration();
        }
        technologyReadiness = schoolFacilities.getTechnologyReadiness();
        awardsAndRecognitions = schoolFacilities.getAwardsAndRecognitions();

        SchoolFacilitiesResponse schoolFacilitiesResponse = new SchoolFacilitiesResponse( id, facilities, accessibilityFeatures, sustainabilityPractices, universityDestinations, csrActivities, industryPartnerships, safetyCompliance, aiIntegration, technologyReadiness, awardsAndRecognitions );

        return schoolFacilitiesResponse;
    }

    protected SchoolMediaResponse schoolMediaToSchoolMediaResponse(SchoolMedia schoolMedia) {
        if ( schoolMedia == null ) {
            return null;
        }

        String id = null;
        String bqaReportLink = null;
        String brochureLink = null;
        String galleryLink = null;
        String videoTourLink = null;

        if ( schoolMedia.getId() != null ) {
            id = schoolMedia.getId().toString();
        }
        bqaReportLink = schoolMedia.getBqaReportLink();
        brochureLink = schoolMedia.getBrochureLink();
        galleryLink = schoolMedia.getGalleryLink();
        videoTourLink = schoolMedia.getVideoTourLink();

        SchoolMediaResponse schoolMediaResponse = new SchoolMediaResponse( id, bqaReportLink, brochureLink, galleryLink, videoTourLink );

        return schoolMediaResponse;
    }

    protected SchoolAcademicsResponse schoolAcademicsToSchoolAcademicsResponse(SchoolAcademics schoolAcademics) {
        if ( schoolAcademics == null ) {
            return null;
        }

        UUID id = null;
        int languagesOfInstruction = 0;
        Set<AccreditationEnums> internationalAccreditations = null;
        String accreditationDocsLinks = null;
        Set<LevelEnums> levelsOffered = null;
        Set<CurriculumEnums> curriculums = null;

        id = schoolAcademics.getId();
        languagesOfInstruction = schoolAcademics.getLanguagesOfInstruction();
        Set<AccreditationEnums> set = schoolAcademics.getInternationalAccreditations();
        if ( set != null ) {
            internationalAccreditations = new LinkedHashSet<AccreditationEnums>( set );
        }
        accreditationDocsLinks = schoolAcademics.getAccreditationDocsLinks();
        Set<LevelEnums> set1 = schoolAcademics.getLevelsOffered();
        if ( set1 != null ) {
            levelsOffered = new LinkedHashSet<LevelEnums>( set1 );
        }
        Set<CurriculumEnums> set2 = schoolAcademics.getCurriculums();
        if ( set2 != null ) {
            curriculums = new LinkedHashSet<CurriculumEnums>( set2 );
        }

        SchoolAcademicsResponse schoolAcademicsResponse = new SchoolAcademicsResponse( id, languagesOfInstruction, internationalAccreditations, accreditationDocsLinks, levelsOffered, curriculums );

        return schoolAcademicsResponse;
    }

    protected MySchoolsPreview schoolToMySchoolsPreview(School school) {
        if ( school == null ) {
            return null;
        }

        UUID id = null;
        String name = null;
        boolean formsCompleted = false;
        int lastFormStep = 0;

        id = school.getId();
        name = school.getName();
        if ( school.getFormsCompleted() != null ) {
            formsCompleted = school.getFormsCompleted();
        }
        if ( school.getLastFormStep() != null ) {
            lastFormStep = school.getLastFormStep();
        }

        MySchoolsPreview mySchoolsPreview = new MySchoolsPreview( id, name, formsCompleted, lastFormStep );

        return mySchoolsPreview;
    }
}
