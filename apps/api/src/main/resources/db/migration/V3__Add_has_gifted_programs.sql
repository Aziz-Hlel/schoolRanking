

-- Step 1: Add column as nullable temporarily
ALTER TABLE school_academics ADD COLUMN has_gifted_programs BOOLEAN;

-- Step 2: Set existing records to false
UPDATE school_academics SET has_gifted_programs = false WHERE has_gifted_programs IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE school_academics ALTER COLUMN has_gifted_programs SET NOT NULL;
