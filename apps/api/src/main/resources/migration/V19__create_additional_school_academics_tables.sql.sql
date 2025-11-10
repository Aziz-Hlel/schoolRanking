CREATE TABLE additional_school_accreditations (
    school_academics_id UUID NOT NULL,
    accreditation VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, accreditation),
    FOREIGN KEY (school_academics_id) REFERENCES school_academics (id) ON DELETE CASCADE
);

CREATE TABLE additional_school_curriculums (
    school_academics_id UUID NOT NULL,
    curriculum VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, curriculum),
    FOREIGN KEY (school_academics_id) REFERENCES school_academics (id) ON DELETE CASCADE
);
