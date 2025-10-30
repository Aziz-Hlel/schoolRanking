


CREATE TABLE extra_languages_taught (
    school_academics_id UUID NOT NULL,
    language VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, language),
    CONSTRAINT fk_extra_languages_taught_school_academics
        FOREIGN KEY (school_academics_id)
        REFERENCES school_academics(id)
        ON DELETE CASCADE

)

