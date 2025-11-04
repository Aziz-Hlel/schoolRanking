package com.example.TechnoShark.SchoolRanking.SchoolStudents.Repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TechnoShark.SchoolRanking.SchoolStudents.Model.SchoolStudents;

public interface SchoolStudentsRepo extends JpaRepository<SchoolStudents, UUID> {

}
