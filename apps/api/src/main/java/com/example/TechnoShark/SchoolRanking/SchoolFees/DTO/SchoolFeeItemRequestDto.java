package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SchoolFeeItemRequestDto {

    @NotNull
    private String title;

    @NotNull
    @Digits(integer = 12, fraction = 2, message = "Price format is invalid")
    private BigDecimal price;

    @NotNull
    @Pattern(regexp = "^[A-Z]{3}$", message = "Currency must be a valid 3-letter code")
    private String currency;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @NotNull
    @Min(value = 0, message = "Sort order must be greater than or equal to 0")
    private Integer sortOrder;

}
