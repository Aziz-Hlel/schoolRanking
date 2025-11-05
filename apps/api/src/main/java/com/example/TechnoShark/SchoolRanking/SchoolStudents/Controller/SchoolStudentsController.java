package com.example.TechnoShark.SchoolRanking.SchoolStudents.Controller;

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
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsRequest;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.DTO.SchoolStudentsResponse;
import com.example.TechnoShark.SchoolRanking.SchoolStudents.Service.SchoolStudentsService;
import com.example.TechnoShark.SchoolRanking.UserSchool.Service.SchoolAuthorizationService;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResponse;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResult;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/schools/{schoolId}/school-students")
@AllArgsConstructor
public class SchoolStudentsController {

    private final SchoolStudentsService schoolStudentsService;
    private final SchoolAuthorizationService schoolAuthService;

    @PostMapping({ "", "/" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UUID>> create(
            @PathVariable UUID schoolId,
            @RequestBody @Valid SchoolStudentsRequest SchoolStudentsRequestDto) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        UUID schoolStudentsId = schoolStudentsService.create(SchoolStudentsRequestDto, schoolId);

        return ApiResult.of(schoolStudentsId)
                .withMessage("School students created successfully")
                .withStatus(HttpStatus.CREATED)
                .toResponse();
    }

    @PutMapping("/{schoolStudentsId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<String>> update(
            @PathVariable UUID schoolId,
            @PathVariable UUID schoolStudentsId,
            @RequestBody @Valid SchoolStudentsRequest SchoolStudentsRequestDto) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        String updatedId = schoolStudentsService.update(SchoolStudentsRequestDto, schoolStudentsId);

        return ApiResult.of(updatedId)
                .withMessage("School students updated successfully")
                .withStatus(HttpStatus.OK)
                .toResponse();
    }

    @GetMapping("/{schoolStudentsId}")
    public ResponseEntity<ApiResponse<SchoolStudentsResponse>> get(@PathVariable UUID schoolStudentsId) {
        SchoolStudentsResponse response = schoolStudentsService.get(schoolStudentsId);

        return ApiResult.of(response)
                .withMessage("School students found successfully")
                .withStatus(HttpStatus.OK)
                .toResponse();
    }
}
