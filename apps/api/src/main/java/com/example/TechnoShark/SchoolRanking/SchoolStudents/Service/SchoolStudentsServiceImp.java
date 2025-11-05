package com.example.TechnoShark.SchoolRanking.SchoolStudents.Service;

import java.util.UUID;

import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsRequest;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponse;

public interface SchoolStudentsServiceImp {

    public UUID create(SchoolStudentsRequest schoolStudentsRequest, UUID schoolId);

    public String update(SchoolStudentsRequest schoolStudentsRequest, UUID schoolMediaId);

    public SchoolStudentsResponse get(UUID schoolMediaId);
}
