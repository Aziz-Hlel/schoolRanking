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
    date = "2025-10-28T09:47:21+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251001-1143, environment: Java 21.0.8 (Eclipse Adoptium)"
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
            List<AccessibilityEnums> list = request.getAccessibilityFeatures();
            if ( list != null ) {
                schoolFacilities.accessibilityFeatures( new LinkedHashSet<AccessibilityEnums>( list ) );
            }
            schoolFacilities.aiIntegration( request.getAiIntegration() );
            schoolFacilities.awardsAndRecognitions( request.getAwardsAndRecognitions() );
            schoolFacilities.csrActivities( request.getCsrActivities() );
            List<FacilityEnums> list1 = request.getFacilities();
            if ( list1 != null ) {
                schoolFacilities.facilities( new LinkedHashSet<FacilityEnums>( list1 ) );
            }
            List<String> list2 = request.getIndustryPartnerships();
            if ( list2 != null ) {
                schoolFacilities.industryPartnerships( new LinkedHashSet<String>( list2 ) );
            }
            schoolFacilities.safetyCompliance( request.getSafetyCompliance() );
            List<SustainabilityEnums> list3 = request.getSustainabilityPractices();
            if ( list3 != null ) {
                schoolFacilities.sustainabilityPractices( new LinkedHashSet<SustainabilityEnums>( list3 ) );
            }
            schoolFacilities.technologyReadiness( request.getTechnologyReadiness() );
            List<String> list4 = request.getUniversityDestinations();
            if ( list4 != null ) {
                schoolFacilities.universityDestinations( new LinkedHashSet<String>( list4 ) );
            }
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
            if ( schoolFacilities.getAccessibilityFeatures() != null ) {
                List<AccessibilityEnums> list = request.getAccessibilityFeatures();
                if ( list != null ) {
                    schoolFacilities.getAccessibilityFeatures().clear();
                    schoolFacilities.getAccessibilityFeatures().addAll( list );
                }
                else {
                    schoolFacilities.setAccessibilityFeatures( null );
                }
            }
            else {
                List<AccessibilityEnums> list = request.getAccessibilityFeatures();
                if ( list != null ) {
                    schoolFacilities.setAccessibilityFeatures( new LinkedHashSet<AccessibilityEnums>( list ) );
                }
            }
            schoolFacilities.setAiIntegration( request.getAiIntegration() );
            schoolFacilities.setAwardsAndRecognitions( request.getAwardsAndRecognitions() );
            schoolFacilities.setCsrActivities( request.getCsrActivities() );
            if ( schoolFacilities.getFacilities() != null ) {
                List<FacilityEnums> list1 = request.getFacilities();
                if ( list1 != null ) {
                    schoolFacilities.getFacilities().clear();
                    schoolFacilities.getFacilities().addAll( list1 );
                }
                else {
                    schoolFacilities.setFacilities( null );
                }
            }
            else {
                List<FacilityEnums> list1 = request.getFacilities();
                if ( list1 != null ) {
                    schoolFacilities.setFacilities( new LinkedHashSet<FacilityEnums>( list1 ) );
                }
            }
            if ( schoolFacilities.getIndustryPartnerships() != null ) {
                List<String> list2 = request.getIndustryPartnerships();
                if ( list2 != null ) {
                    schoolFacilities.getIndustryPartnerships().clear();
                    schoolFacilities.getIndustryPartnerships().addAll( list2 );
                }
                else {
                    schoolFacilities.setIndustryPartnerships( null );
                }
            }
            else {
                List<String> list2 = request.getIndustryPartnerships();
                if ( list2 != null ) {
                    schoolFacilities.setIndustryPartnerships( new LinkedHashSet<String>( list2 ) );
                }
            }
            schoolFacilities.setSafetyCompliance( request.getSafetyCompliance() );
            if ( schoolFacilities.getSustainabilityPractices() != null ) {
                List<SustainabilityEnums> list3 = request.getSustainabilityPractices();
                if ( list3 != null ) {
                    schoolFacilities.getSustainabilityPractices().clear();
                    schoolFacilities.getSustainabilityPractices().addAll( list3 );
                }
                else {
                    schoolFacilities.setSustainabilityPractices( null );
                }
            }
            else {
                List<SustainabilityEnums> list3 = request.getSustainabilityPractices();
                if ( list3 != null ) {
                    schoolFacilities.setSustainabilityPractices( new LinkedHashSet<SustainabilityEnums>( list3 ) );
                }
            }
            schoolFacilities.setTechnologyReadiness( request.getTechnologyReadiness() );
            if ( schoolFacilities.getUniversityDestinations() != null ) {
                List<String> list4 = request.getUniversityDestinations();
                if ( list4 != null ) {
                    schoolFacilities.getUniversityDestinations().clear();
                    schoolFacilities.getUniversityDestinations().addAll( list4 );
                }
                else {
                    schoolFacilities.setUniversityDestinations( null );
                }
            }
            else {
                List<String> list4 = request.getUniversityDestinations();
                if ( list4 != null ) {
                    schoolFacilities.setUniversityDestinations( new LinkedHashSet<String>( list4 ) );
                }
            }
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
