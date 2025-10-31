package com.example.TechnoShark.SchoolRanking.Schools.Repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.TechnoShark.SchoolRanking.Schools.Model.School;

@Repository
public interface SchoolRepo extends JpaRepository<School, UUID> {

    @EntityGraph(attributePaths = { "schoolAcademics", "schoolFacilities", "schoolMedia", "schoolStaff" })
    Optional<School> findWithDetailsById(UUID id);



}
