package com.example.TechnoShark.SchoolRanking.Schools.Model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.TechnoShark.SchoolRanking.Enums.CountryEnums;
import com.example.TechnoShark.SchoolRanking.Enums.SchoolTypeEnums;
import com.example.TechnoShark.SchoolRanking.SchoolAcademics.Model.SchoolAcademics;
import com.example.TechnoShark.SchoolRanking.SchoolFacilities.Model.SchoolFacilities;
import com.example.TechnoShark.SchoolRanking.SchoolFees.Model.SchoolFees;
import com.example.TechnoShark.SchoolRanking.SchoolMedia.Model.SchoolMedia;
import com.example.TechnoShark.SchoolRanking.SchoolStaff.Model.SchoolStaff;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schools")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class School {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CountryEnums country;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Integer yearEstablished; // * Naming conventions (Java best practices) than year_established , snake_case
                                     // is more of a database convention

    @Column(nullable = false)
    // @Enumerated(EnumType.STRING)
    private SchoolTypeEnums type;

    @Column
    private String website;

    @ElementCollection
    @CollectionTable(name = "school_campus_countries",joinColumns = @JoinColumn(name = "school_id"))
    @Column(name = "country")
    private Set<String> campusCountries;

    // //
    @Column(nullable = false)
    private Boolean formsCompleted = false;

    @Column(nullable = true)
    private Integer lastFormStep = 0;

    @OneToOne(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private SchoolStaff schoolStaff;

    @OneToOne(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private SchoolFacilities schoolFacilities;

    @OneToOne(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private SchoolMedia schoolMedia;

    @OneToOne(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private SchoolAcademics schoolAcademics;

    @OneToOne(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private SchoolFees schoolFees;

    // Add audit fields - industry standard
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

}
