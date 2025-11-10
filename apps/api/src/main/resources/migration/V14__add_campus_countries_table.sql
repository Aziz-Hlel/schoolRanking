CREATE TABLE school_campus_countries (
    school_id UUID NOT NULL REFERENCES schools (id) ON DELETE CASCADE,
    country VARCHAR(100) NOT NULL,
    PRIMARY KEY (school_id, country)
);
