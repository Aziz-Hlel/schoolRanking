ALTER TABLE school_facilities
ADD COLUMN has_psychologist BOOLEAN;

UPDATE school_facilities
SET
    has_psychologist = FALSE;

ALTER TABLE school_facilities
ALTER COLUMN has_psychologist
SET
    NOT NULL;
