CREATE TABLE IF NOT EXISTS school_fees (
    id UUID PRIMARY KEY REFERENCES schools (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tuition_fees (
    school_fees_id UUID NOT NULL REFERENCES school_fees (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL,
    PRIMARY KEY (school_fees_id, title)
);

CREATE TABLE IF NOT EXISTS additional_fees (
    school_fees_id UUID NOT NULL REFERENCES school_fees (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL,
    PRIMARY KEY (school_fees_id, title)
);
