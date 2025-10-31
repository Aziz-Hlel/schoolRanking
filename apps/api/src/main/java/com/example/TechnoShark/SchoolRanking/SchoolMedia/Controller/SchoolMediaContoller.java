package com.example.TechnoShark.SchoolRanking.SchoolMedia.Controller;

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
import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaResponse;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO.SchoolMediaRequest;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Service.SchoolMediaService;
import com.example.TechnoShark.SchoolRanking.UserSchool.Service.SchoolAuthorizationService;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResponse;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResult;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/schools/{schoolId}/school-media")
@AllArgsConstructor
public class SchoolMediaContoller {

    private final SchoolMediaService school_MediaService;
    private final SchoolAuthorizationService schoolAuthService;

    @PostMapping({ "", "/" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UUID>> create(
            @PathVariable UUID schoolId,
            @RequestBody @Valid SchoolMediaRequest school_MediaRequest) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        UUID schoolMediaId = school_MediaService.create(school_MediaRequest, schoolId);

        return ApiResult.of(schoolMediaId)
                .withMessage("School media created successfully")
                .withStatus(HttpStatus.CREATED).toResponse();
    }

    @PutMapping("/{schoolMediaId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<String>> update(
            @PathVariable UUID schoolId,
            @PathVariable UUID schoolMediaId,
            @RequestBody @Valid SchoolMediaRequest school_MediaRequest) {

        UUID userId = UserContext.getCurrentUserId();

        if (!schoolAuthService.canUserAccessSchool(userId, schoolId) && UserContext.getRole() != RoleEnums.SUPER_ADMIN)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this school");

        String schooldId = school_MediaService.update(school_MediaRequest, schoolMediaId);
        return ApiResult.of(schooldId)
                .withMessage("School media updated successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

    @GetMapping("/{schoolMediaId}")
    public ResponseEntity<ApiResponse<SchoolMediaResponse>> get(@PathVariable UUID schoolMediaId) {
        SchoolMediaResponse schooldId = school_MediaService.get(schoolMediaId);

        return ApiResult.of(schooldId)
                .withMessage("School media found successfully")
                .withStatus(HttpStatus.OK).toResponse();
    }

}
