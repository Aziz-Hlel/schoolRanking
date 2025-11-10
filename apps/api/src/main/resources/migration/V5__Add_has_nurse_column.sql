ALTER TABLE school_facilities
ADD COLUMN has_nurse BOOLEAN;

UPDATE school_facilities
SET
    has_nurse = FALSE;

ALTER TABLE school_facilities
ALTER COLUMN has_nurse
SET
    NOT NULL;
