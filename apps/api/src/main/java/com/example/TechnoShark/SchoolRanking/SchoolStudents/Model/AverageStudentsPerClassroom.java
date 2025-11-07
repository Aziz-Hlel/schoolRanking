package com.example.TechnoShark.SchoolRanking.SchoolStudents.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

}
