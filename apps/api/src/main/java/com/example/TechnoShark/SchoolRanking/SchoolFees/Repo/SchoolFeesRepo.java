package com.example.TechnoShark.SchoolRanking.SchoolFees.Repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFees;

@Repository
public interface SchoolFeesRepo extends JpaRepository<SchoolFees, UUID> {

}
