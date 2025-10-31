package com.example.TechnoShark.SchoolRanking.UserSchool.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TechnoShark.SchoolRanking.Auth.Util.UserContext;
import com.example.TechnoShark.SchoolRanking.Schools.DTO.MySchoolsPreview;
import com.example.TechnoShark.SchoolRanking.UserSchool.Service.UserSchoolService;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResponse;
import com.example.TechnoShark.SchoolRanking.Utils.ApiResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user-schools")
@RequiredArgsConstructor
public class UserSchoolController {

    private final UserSchoolService userSchoolService;

    @GetMapping({ "/", "" })
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<MySchoolsPreview>>> getMySchools() {

        UUID userId = UserContext.getCurrentUserId();

        List<MySchoolsPreview> userSchools = userSchoolService.getUserSchools(userId);

        return ApiResult.of(userSchools)
                .withMessage("User Schools retrieved successfully")
                .withStatus(HttpStatus.OK)
                .toResponse();

    }
}
