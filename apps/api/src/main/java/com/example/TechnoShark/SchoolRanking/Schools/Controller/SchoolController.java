package com.example.TechnoShark.SchoolRanking.Schools.Controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.TechnoShark.SchoolRanking.Auth.Util.UserContext;
import com.example.TechnoShark.SchoolRanking.Enums.RoleEnums;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolDetailedResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolPageRequest;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolPageResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolProgressResponse;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolRequest;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.SchoolResponse;
import com.example.TechnoShark.SchoolRanking.Schools.Service.SchoolService;
import com.example.TechnoShark.SchoolRanking.UserSchool.Service.SchoolAuthorizationService;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResponse;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResult;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(path = { "/schools", "/school" })
@AllArgsConstructor
@Slf4j
public class SchoolController {

    private final SchoolService schoolService;
    private final SchoolAuthorizationService schoolAuthService;

    @PostMapping({ "", "/" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UUID>> createSchool(@Valid @RequestBody SchoolRequest schoolRequest) {

        UUID userId = UserContext.getCurrentUserId();

        UUID schooldId = schoolService.create(schoolRequest, userId);

        return ApiResult.of(schooldId)
                .withMessage("School created successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @PutMapping({ "/{schoolGeneralId}" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolResponse>> updateSchool(@PathVariable UUID schoolGeneralId,
            @Valid @RequestBody SchoolRequest schoolRequest) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolGeneralId)
                && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        SchoolResponse school = schoolService.update(schoolRequest, schoolGeneralId);

        return ApiResult.of(school)
                .withMessage("School updated successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @GetMapping({ "/{schoolId}" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolResponse>> getSchool(@PathVariable UUID schoolId) {

        SchoolResponse school = schoolService.get(schoolId);

        return ApiResult.of(school)
                .withMessage("School retrieved successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @GetMapping({ "", "/" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<SchoolPageResponse>>> getPageSchool(
            @Valid @ModelAttribute SchoolPageRequest schoolPageRequest) {

        Pageable pageable = PageRequest.of(schoolPageRequest.getPage() - 1, schoolPageRequest.getSize());

        Page<SchoolPageResponse> schools = schoolService.getPage(pageable);

        return ApiResult.of(schools)
                .withMessage("Schools retrieved successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @GetMapping("/infos/{schoolId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolDetailedResponse>> getDetailedSchool(@PathVariable UUID schoolId) {
        SchoolDetailedResponse school = schoolService.getDetailed(schoolId);

        return ApiResult.of(school)
                .withMessage("School retrieved successfully")
                .withStatus(HttpStatus.OK).toResponse();

    }

    @GetMapping("/{schoolId}/form-progress")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<SchoolProgressResponse>> getFormProgress(@PathVariable UUID schoolId) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId)
                && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        SchoolProgressResponse schoolProgressResponse = schoolService.getFormProgress(schoolId);

        return ApiResult.of(schoolProgressResponse)
                .withMessage("School form progress retrieved successfully")
                .withStatus(HttpStatus.OK).toResponse();

    }

}
