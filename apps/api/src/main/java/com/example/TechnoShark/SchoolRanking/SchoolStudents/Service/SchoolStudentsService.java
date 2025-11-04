package com.example.TechnoShark.SchoolRanking.SchoolStudents.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsRequestDto;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponseDto;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Mapper.SchoolStudentsMapper;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.SchoolStudents;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Repo.SchoolStudentsRepo;
import com.example.TechnoShark.SchoolRanking.Schools.Model.School;
import com.example.TechnoShark.SchoolRanking.Schools.Repo.SchoolRepo;
import com.example.TechnoShark.SchoolRanking.Schools.Service.FormProgressService;
import com.example.TechnoShark.SchoolRanking.Utils.CurrentProgressForm;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SchoolStudentsService implements SchoolStudentsServiceImp {

    private final SchoolRepo schoolRepo;
    private final SchoolStudentsRepo schoolStudentsRepo;
    private final SchoolStudentsMapper schoolStudentsMapper;
    private final FormProgressService formProgressService;

    @Override
    public UUID create(SchoolStudentsRequestDto schoolStudentsRequest, UUID schoolId) {
        School school = schoolRepo.findById(schoolId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "School not found"));

        SchoolStudents entity = schoolStudentsMapper.toEntity(schoolStudentsRequest, school);
        SchoolStudents saved = schoolStudentsRepo.save(entity);

        formProgressService.updateFormProgress(schoolId, CurrentProgressForm.SCHOOL_STUDENTS);

        return saved.getId();
    }

    @Override
    public String update(SchoolStudentsRequestDto schoolStudentsRequest, UUID schoolStudentsId) {
        Optional<SchoolStudents> existing = schoolStudentsRepo.findById(schoolStudentsId);

        if (existing.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "School Students not found");

        schoolStudentsMapper.updateEntity(schoolStudentsRequest, schoolStudentsId, existing.get());
        SchoolStudents saved = schoolStudentsRepo.save(existing.get());

        return saved.getId().toString();
    }

    @Override
    public SchoolStudentsResponseDto get(UUID schoolStudentsId) {
        SchoolStudents entity = schoolStudentsRepo.findById(schoolStudentsId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "School Students not found"));
        return schoolStudentsMapper.toDto(entity);
    }
}
