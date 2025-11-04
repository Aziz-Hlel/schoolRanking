package com.example.TechnoShark.SchoolRanking.SchoolStudents.Model;

import com.example.TechnoShark.SchoolRanking.Enums.EstimateType;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AverageStudentsPerClassroom {

    @Column(nullable = false)
    private String grade; // e.g. "Grade 6", "High School"

    @Column(nullable = false)
    private Integer numberOfStudents;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 50)
    private EstimateType estimateType;
}
