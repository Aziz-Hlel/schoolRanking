package com.example.TechnoShark.SchoolRanking.SchoolFees.Model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolFeeItem {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false, length = 3)
    private String currency;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(name = "is_additional_fee", nullable = false)
    private Boolean isAdditionalFee = false; // true = food/transport, false = academic fees

}
