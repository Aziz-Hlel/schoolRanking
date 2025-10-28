package com.example.TechnoShark.SchoolRanking.SchoolFacilities.Mapper;

import com.example.TechnoShark.SchoolRanking.Enums.AccessibilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.FacilityEnums;
import com.example.TechnoShark.SchoolRanking.Enums.RatingLevelEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SustainabilityEnums;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.DTO.SchoolFacilitiesRequest;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.DTO.SchoolFacilitiesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.Model.SchoolFacilities;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-28T09:41:26+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.16 (Eclipse Adoptium)"
)
@Component
public class SchoolFacilitiesMapperImpl implements SchoolFacilitiesMapper {

    @Override
    public SchoolFacilities toEntity(SchoolFacilitiesRequest request, School school) {
        if ( request == null && school == null ) {
            return null;
        }

        SchoolFacilities.SchoolFacilitiesBuilder schoolFacilities = SchoolFacilities.builder();

        if ( request != null ) {
            List<FacilityEnums> list = request.getFacilities();
            if ( list != null ) {
                schoolFacilities.facilities( new LinkedHashSet<FacilityEnums>( list ) );
            }
            List<AccessibilityEnums> list1 = request.getAccessibilityFeatures();
            if ( list1 != null ) {
                schoolFacilities.accessibilityFeatures( new LinkedHashSet<AccessibilityEnums>( list1 ) );
            }
            List<SustainabilityEnums> list2 = request.getSustainabilityPractices();
            if ( list2 != null ) {
                schoolFacilities.sustainabilityPractices( new LinkedHashSet<SustainabilityEnums>( list2 ) );
            }
            List<String> list3 = request.getUniversityDestinations();
            if ( list3 != null ) {
                schoolFacilities.universityDestinations( new LinkedHashSet<String>( list3 ) );
            }
            schoolFacilities.csrActivities( request.getCsrActivities() );
            List<String> list4 = request.getIndustryPartnerships();
            if ( list4 != null ) {
                schoolFacilities.industryPartnerships( new LinkedHashSet<String>( list4 ) );
            }
            schoolFacilities.safetyCompliance( request.getSafetyCompliance() );
            schoolFacilities.aiIntegration( request.getAiIntegration() );
            schoolFacilities.technologyReadiness( request.getTechnologyReadiness() );
            schoolFacilities.awardsAndRecognitions( request.getAwardsAndRecognitions() );
        }
        schoolFacilities.school( school );

        return schoolFacilities.build();
    }

    @Override
    public SchoolFacilities updateEntity(SchoolFacilitiesRequest request, UUID schoolFacilitiesId, SchoolFacilities schoolFacilities) {
        if ( request == null && schoolFacilitiesId == null ) {
            return schoolFacilities;
        }

        if ( request != null ) {
            if ( schoolFacilities.getFacilities() != null ) {
                List<FacilityEnums> list = request.getFacilities();
                if ( list != null ) {
                    schoolFacilities.getFacilities().clear();
                    schoolFacilities.getFacilities().addAll( list );
                }
                else {
                    schoolFacilities.setFacilities( null );
                }
            }
            else {
                List<FacilityEnums> list = request.getFacilities();
                if ( list != null ) {
                    schoolFacilities.setFacilities( new LinkedHashSet<FacilityEnums>( list ) );
                }
            }
            if ( schoolFacilities.getAccessibilityFeatures() != null ) {
                List<AccessibilityEnums> list1 = request.getAccessibilityFeatures();
                if ( list1 != null ) {
                    schoolFacilities.getAccessibilityFeatures().clear();
                    schoolFacilities.getAccessibilityFeatures().addAll( list1 );
                }
                else {
                    schoolFacilities.setAccessibilityFeatures( null );
                }
            }
            else {
                List<AccessibilityEnums> list1 = request.getAccessibilityFeatures();
                if ( list1 != null ) {
                    schoolFacilities.setAccessibilityFeatures( new LinkedHashSet<AccessibilityEnums>( list1 ) );
                }
            }
            if ( schoolFacilities.getSustainabilityPractices() != null ) {
                List<SustainabilityEnums> list2 = request.getSustainabilityPractices();
                if ( list2 != null ) {
                    schoolFacilities.getSustainabilityPractices().clear();
                    schoolFacilities.getSustainabilityPractices().addAll( list2 );
                }
                else {
                    schoolFacilities.setSustainabilityPractices( null );
                }
            }
            else {
                List<SustainabilityEnums> list2 = request.getSustainabilityPractices();
                if ( list2 != null ) {
                    schoolFacilities.setSustainabilityPractices( new LinkedHashSet<SustainabilityEnums>( list2 ) );
                }
            }
            if ( schoolFacilities.getUniversityDestinations() != null ) {
                List<String> list3 = request.getUniversityDestinations();
                if ( list3 != null ) {
                    schoolFacilities.getUniversityDestinations().clear();
                    schoolFacilities.getUniversityDestinations().addAll( list3 );
                }
                else {
                    schoolFacilities.setUniversityDestinations( null );
                }
            }
            else {
                List<String> list3 = request.getUniversityDestinations();
                if ( list3 != null ) {
                    schoolFacilities.setUniversityDestinations( new LinkedHashSet<String>( list3 ) );
                }
            }
            schoolFacilities.setCsrActivities( request.getCsrActivities() );
            if ( schoolFacilities.getIndustryPartnerships() != null ) {
                List<String> list4 = request.getIndustryPartnerships();
                if ( list4 != null ) {
                    schoolFacilities.getIndustryPartnerships().clear();
                    schoolFacilities.getIndustryPartnerships().addAll( list4 );
                }
                else {
                    schoolFacilities.setIndustryPartnerships( null );
                }
            }
            else {
                List<String> list4 = request.getIndustryPartnerships();
                if ( list4 != null ) {
                    schoolFacilities.setIndustryPartnerships( new LinkedHashSet<String>( list4 ) );
                }
            }
            schoolFacilities.setSafetyCompliance( request.getSafetyCompliance() );
            schoolFacilities.setAiIntegration( request.getAiIntegration() );
            schoolFacilities.setTechnologyReadiness( request.getTechnologyReadiness() );
            schoolFacilities.setAwardsAndRecognitions( request.getAwardsAndRecognitions() );
        }
        schoolFacilities.setId( schoolFacilitiesId );

        return schoolFacilities;
    }

    @Override
    public SchoolFacilitiesResponse toDTO(SchoolFacilities schoolFacilities) {
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
}
