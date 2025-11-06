CREATE TABLE innovative_teaching_methods (
    school_academics_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    FOREIGN KEY (school_academics_id) REFERENCES school_academics (id) ON DELETE CASCADE
);
