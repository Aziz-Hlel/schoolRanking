package com.example.TechnoShark.SchoolRanking.SchoolFees.Mapper;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesRequest;
import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFees;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface SchoolFeesMapper {

    @Mapping(target = "school", source = "school")
    @Mapping(target = "id", ignore = true)
    SchoolFees toEntity(SchoolFeesRequest schoolFeesRequest, School school);

    @Mapping(target = "id", source = "schoolFacilitiesId")
    @Mapping(target = "school", ignore = true)
    SchoolFees updateEntity(SchoolFeesRequest schoolFeesRequest, UUID schoolFacilitiesId,
            @MappingTarget SchoolFees schoolFees);

    SchoolFeesResponse toResponse(SchoolFees schoolFees);

}
