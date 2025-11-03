-- Step 1: Add column as nullable temporarily
ALTER TABLE school_academics
ADD COLUMN has_special_needs_support BOOLEAN;

-- Step 2: Set existing records to false
UPDATE school_academics
SET
    has_special_needs_support = FALSE
WHERE
    has_special_needs_support IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE school_academics
ALTER COLUMN has_special_needs_support
SET
    NOT NULL;
