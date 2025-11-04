package com.example.TechnoShark.SchoolRanking.SchoolStudents.Service;

import java.util.UUID;

import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsRequestDto;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponseDto;

public interface SchoolStudentsServiceImp {

    public UUID create(SchoolStudentsRequestDto schoolStudentsRequest, UUID schoolId);

    public String update(SchoolStudentsRequestDto schoolStudentsRequest, UUID schoolMediaId);

    public SchoolStudentsResponseDto get(UUID schoolMediaId);
}
