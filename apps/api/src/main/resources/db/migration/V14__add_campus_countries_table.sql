


CREATE TABLE IF NOT EXISTS school_campus_countries (
    school_id UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    country VARCHAR(100) NOT NULL,
    PRIMARY KEY (school_id, country)
);
