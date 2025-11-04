CREATE TABLE school_students (
    id UUID PRIMARY KEY,
    total_students INT,
    FOREIGN KEY (id) REFERENCES schools (id) ON DELETE CASCADE
);

CREATE TABLE school_student_nationalities (
    school_students_id UUID NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    FOREIGN KEY (school_students_id) REFERENCES school_students (id) ON DELETE CASCADE
);

CREATE TABLE school_extracurricular_activities (
    school_students_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (school_students_id) REFERENCES school_students (id) ON DELETE CASCADE
);

CREATE TABLE school_average_students_per_classroom (
    school_students_id UUID NOT NULL,
    grade VARCHAR(255) NOT NULL,
    number_of_students INT NOT NULL,
    estimate_type VARCHAR(50), -- can be 'MORE_THAN', 'LESS_THAN', 'ALMOST' or NULL
    FOREIGN KEY (school_students_id) REFERENCES school_students (id) ON DELETE CASCADE
);
