package com.example.TechnoShark.SchoolRanking.Schools.DTO;

import com.example.TechnoShark.SchoolRanking.SchoolAcademics.DTO.SchoolAcademicsResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.DTO.SchoolFacilitiesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaResponse;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.DTO.SchoolStaffResponse;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponse;

public record SchoolDetailedResponse(
                SchoolResponse schoolGeneral,
                SchoolStaffResponse schoolStaff,
                SchoolFacilitiesResponse schoolFacilities,
                SchoolMediaResponse schoolMedia,
                SchoolAcademicsResponse schoolAcademics,
                SchoolFeesResponse schoolFees,
                SchoolStudentsResponse schoolStudents) {

}
