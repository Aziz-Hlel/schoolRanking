package com.example.TechnoShark.SchoolRanking.SchoolFees.Controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.TechnoShark.SchoolRanking.Auth.Util.UserContext;
import com.example.TechnoShark.SchoolRanking.Enums.RoleEnums;
import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesRequest;
import com.example.TechnoShark.SchoolRanking.SchoolFees.DTO.SchoolFeesResponse;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Service.SchoolFeesService;
import com.example.TechnoShark.SchoolRanking.UserSchool.Service.SchoolAuthorizationService;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResponse;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResult;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/schools/{schoolId}/school-fees")
@AllArgsConstructor
public class SchoolFeesController {

    private final SchoolFeesService schoolFeesService;
    private final SchoolAuthorizationService schoolAuthService;

    @PostMapping({ "", "/" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UUID>> post(
            @PathVariable UUID schoolId,
            @Valid @RequestBody SchoolFeesRequest schoolFeesRequest) {

        UUID userId = UserContext.getCurrentUserId();
        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");
        UUID schoolFeesId = schoolFeesService.createSchoolFees(schoolFeesRequest, schoolId);

        return ApiResult.of(schoolFeesId)
                .withMessage("School Fees created successfully")
                .withStatus(HttpStatus.CREATED)
                .toResponse();
    }

    @PutMapping("/{schoolFeesId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolFeesResponse>> update(
            @PathVariable UUID schoolId,
            @PathVariable UUID schoolFeesId,
            @RequestBody @Valid SchoolFeesRequest schoolFeesRequest) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        SchoolFeesResponse updatedEntity = schoolFeesService.updateSchoolFees(schoolFeesRequest, schoolFeesId);
        return ApiResult.of(updatedEntity)
                .withMessage("School Fees updated successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @GetMapping("/{schoolFeesId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolFeesResponse>> get(@PathVariable UUID schoolFeesId) {
        SchoolFeesResponse schoolFees = schoolFeesService.getSchoolFees(schoolFeesId);
        return ApiResult.of(schoolFees)
                .withMessage("School Fees found successfully")
                .withStatus(HttpStatus.OK)
                .toResponse();
    }

}
