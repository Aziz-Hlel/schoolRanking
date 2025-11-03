ALTER TABLE school_facilities
ADD COLUMN has_nutritionist BOOLEAN;

UPDATE school_facilities
SET
    has_nutritionist = FALSE;

ALTER TABLE school_facilities
ALTER COLUMN has_nutritionist
SET
    NOT NULL;
