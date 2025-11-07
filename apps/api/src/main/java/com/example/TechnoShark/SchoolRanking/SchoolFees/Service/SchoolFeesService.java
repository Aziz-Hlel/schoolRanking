package com.example.TechnoShark.SchoolRanking.SchoolFees.Service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesRequest;
import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Mapper.SchoolFeesMapper;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFees;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Repo.SchoolFeesRepo;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import com.example.TechnoShark.SchoolRanking.Schools.Repo.SchoolRepo;
import com.example.TechnoShark.SchoolRanking.Schools.Service.FormProgressService;
import com.example.TechnoShark.SchoolRanking.Utils.CurrentProgressForm;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SchoolFeesService {

    private final SchoolFeesRepo schoolFeesRepo;
    private final SchoolRepo schoolRepo;
    private final SchoolFeesMapper schoolFeesMapper;
    private final FormProgressService formProgressService;

    public UUID createSchoolFees(SchoolFeesRequest schoolFeesRequest, UUID schoolId) {

        School school = schoolRepo.findById(schoolId)
                .orElseThrow(() -> new EntityNotFoundException("School not found"));

        SchoolFees entity = schoolFeesMapper.toEntity(schoolFeesRequest, school);
        UUID schoolFeesId = schoolFeesRepo.save(entity).getId();

        formProgressService.updateFormProgress(schoolId, CurrentProgressForm.SCHOOL_STUDENTS);
        // ? removed this function for now cuz the form supposed to be completed on its
        // ? own at this point
        // formProgressService.markFormsCompleted(school.getId());

        return schoolFeesId;

    }

    public SchoolFeesResponse updateSchoolFees(SchoolFeesRequest schoolFeesRequest, UUID schoolId) {

        SchoolFees schoolFees = schoolFeesRepo.findById(schoolId)
                .orElseThrow(() -> new EntityNotFoundException("School Fees not found"));

        schoolFeesMapper.updateEntity(schoolFeesRequest, schoolId, schoolFees);
        SchoolFees updatedEntity = schoolFeesRepo.save(schoolFees);

        SchoolFeesResponse dto = schoolFeesMapper.toResponse(updatedEntity);

        return dto;

    }

    public SchoolFeesResponse getSchoolFees(UUID schoolId) {

        SchoolFees schoolFees = schoolFeesRepo.findById(schoolId)
                .orElseThrow(() -> new EntityNotFoundException("School Fees not found"));

        SchoolFeesResponse dto = schoolFeesMapper.toResponse(schoolFees);

        return dto;
    }

}
