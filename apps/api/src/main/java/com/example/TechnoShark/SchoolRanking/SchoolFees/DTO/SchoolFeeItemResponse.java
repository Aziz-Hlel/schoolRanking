package com.example.TechnoShark.SchoolRanking.SchoolFees.DTO;

import java.math.BigDecimal;

public record SchoolFeeItemResponse(
                String title,
                BigDecimal price,
                String currency,
                String description,
                Integer sortOrder) {
}
