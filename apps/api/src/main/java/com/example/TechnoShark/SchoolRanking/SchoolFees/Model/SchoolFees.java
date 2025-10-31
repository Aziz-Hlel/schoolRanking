package com.example.TechnoShark.SchoolRanking.SchoolFees.Model;

import java.util.Set;
import java.util.UUID;

import com.example.TechnoShark.SchoolRanking.Schools.Model.School;

import jakarta.persistence.CollectionTable;
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
@Table(name = "school_fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolFees {

    @Id
    private UUID id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    private School school;

    @ElementCollection
    @CollectionTable(name = "school_fee_items", joinColumns = @JoinColumn(name = "school_fees_id"))
    private Set<SchoolFeeItem> feeItems;

}
