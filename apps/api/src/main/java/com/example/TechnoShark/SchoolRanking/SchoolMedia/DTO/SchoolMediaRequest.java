package com.example.TechnoShark.SchoolRanking.SchoolMedia.DTO;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchoolMediaRequest {

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "BQA report link must be less than 255 characters")
    private String bqaReportLink;

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Brochure link must be less than 255 characters")
    private String brochureLink;

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Gallery link must be less than 255 characters")
    private String galleryLink;

    @Nullable
    @Pattern(regexp = "^\\s*\\S.*$", message = "Leadership team must not be blank")
    @Size(max = 255, message = "Video tour link must be less than 255 characters")
    private String videoTourLink;

}
