package com.example.TechnoShark.SchoolRanking.SchoolStudents.Mapper;

import org.mapstruct.*;

import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsRequestDto;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponseDto;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.SchoolStudents;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;

import java.util.UUID;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface SchoolStudentsMapper {

    @Mapping(target = "school", source = "school")
    @Mapping(target = "id", ignore = true) // uses school ID (MapsId)
    SchoolStudents toEntity(SchoolStudentsRequestDto request, School school);

    @Mapping(target = "id", source = "schoolStudentsId")
    @Mapping(target = "school", ignore = true)
    SchoolStudents updateEntity(SchoolStudentsRequestDto request, UUID schoolStudentsId,
            @MappingTarget SchoolStudents schoolStudents);

    SchoolStudentsResponseDto toDto(SchoolStudents entity);
}