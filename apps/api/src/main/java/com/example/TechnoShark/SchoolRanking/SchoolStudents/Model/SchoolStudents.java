package com.example.TechnoShark.SchoolRanking.SchoolStudents.Model;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.example.TechnoShark.SchoolRanking.Schools.Model.School;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "school_students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolStudents {

    @Id
    private UUID id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private School school;

    @Column(nullable = true)
    private Integer totalStudents;

    @ElementCollection
    @CollectionTable(name = "school_student_nationalities", joinColumns = @JoinColumn(name = "school_students_id"))
    @Column(name = "nationality", nullable = false)
    @Builder.Default
    private Set<String> nationalities = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "school_extracurricular_activities", joinColumns = @JoinColumn(name = "school_students_id"))
    @Builder.Default
    private Set<ExtracurricularActivity> extracurricularActivities = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "school_average_students_per_classroom", joinColumns = @JoinColumn(name = "school_students_id"))
    @Builder.Default
    private Set<AverageStudentsPerClassroom> averageStudentsPerClassroom = new HashSet<>();
}
