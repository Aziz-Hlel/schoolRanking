ALTER TABLE school_facilities ADD COLUMN has_transportation_services BOOLEAN;

UPDATE school_facilities SET has_transportation_services = false;

ALTER TABLE school_facilities ALTER COLUMN has_transportation_services SET NOT NULL;