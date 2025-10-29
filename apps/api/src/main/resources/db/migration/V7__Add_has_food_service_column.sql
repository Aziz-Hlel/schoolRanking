

ALTER TABLE school_facilities ADD COLUMN has_food_service BOOLEAN;

UPDATE school_facilities SET has_food_service = false;

ALTER TABLE school_facilities ALTER COLUMN has_food_service SET NOT NULL;
