-- Step 1: Add column as nullable temporarily
ALTER TABLE schools
ADD COLUMN description TEXT;

-- Step 2: Set existing records to empty string
UPDATE schools
SET
    description = ''
WHERE
    description IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE schools
ALTER COLUMN description
SET
    NOT NULL;
