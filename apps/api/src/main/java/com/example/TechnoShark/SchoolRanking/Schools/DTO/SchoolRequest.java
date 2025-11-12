package com.example.TechnoShark.SchoolRanking.Schools.DTO;

import java.util.Set;

import com.example.TechnoShark.SchoolRanking.Enums.CountryEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SchoolTypeEnums;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolRequest {

    @NotBlank
    private String name;

    @NotNull
    private CountryEnums country;

    @NotBlank
    private String city;

    @NotBlank
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @NotBlank
    @Size(max = 100, message = "Address must be less than 100 characters")
    private String address;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    @Email
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;

    @NotNull
    @Min(value = 1800, message = "Year must not be before 1800")
    @Max(value = 2027, message = "Year cannot be in the future")
    private Integer yearEstablished;

    // @URL(protocol = "https", regexp = "^(https?://).*$", message = "Must be a
    // valid URL starting with http:// or https://") // !
    // // not
    // // mrigla
    @Nullable // You don’t need to explicitly say @Null because both @Pattern and @URL allow
    @Size(max = 100, message = "Website must be less than 100 characters")
    // null by default
    private String website;

    @NotNull
    private SchoolTypeEnums type;

    @Size(max = 50, message = "At least one campus country must be provided or set to null")
    private Set<@NotBlank @Size(max = 100, message = "Campus country must be less than 100 characters") String> campusCountries = Set
            .of();

}
