-- ============================================================
--  Flyway Migration: V1__baseline.sql
--  Description: Initial baseline schema and seed data
--  Database: PostgreSQL
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SCHOOLS
-- ============================================================
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    year_established INTEGER NOT NULL,
    type SMALLINT NOT NULL,
    website VARCHAR(255),
    last_form_step INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE school_campus_countries (
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    country VARCHAR(255),
    PRIMARY KEY (school_id, country)
);

-- ============================================================
-- USER_SCHOOLS (many-to-many bridge)
-- ============================================================
CREATE TABLE user_schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    UNIQUE (user_id, school_id)
);

-- ============================================================
-- SCHOOL_ACADEMICS
-- ============================================================
CREATE TABLE school_academics (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    languages_of_instruction INTEGER NOT NULL,
    accreditation_docs_links VARCHAR(255),
    has_gifted_programs BOOLEAN NOT NULL,
    has_special_needs_support BOOLEAN NOT NULL
);

CREATE TABLE school_accreditations (
    school_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    accreditation VARCHAR(50) NOT NULL,
    PRIMARY KEY (school_id, accreditation)
);

CREATE TABLE additional_school_accreditations (
    school_academics_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    accreditation VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, accreditation)
);

CREATE TABLE school_levels (
    school_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL,
    PRIMARY KEY (school_id, level)
);

CREATE TABLE school_curriculums (
    school_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    curriculum VARCHAR(50) NOT NULL,
    PRIMARY KEY (school_id, curriculum)
);

CREATE TABLE additional_school_curriculums (
    school_academics_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    curriculum VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, curriculum)
);

CREATE TABLE extra_languages_taught (
    school_academics_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    language VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_academics_id, language)
);

CREATE TABLE innovative_teaching_methods (
    school_academics_id UUID NOT NULL REFERENCES school_academics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (school_academics_id, title)
);

-- ============================================================
-- SCHOOL_FACILITIES
-- ============================================================
CREATE TABLE school_facilities (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    csr_activities TEXT,
    safety_compliance BOOLEAN NOT NULL,
    ai_integration BOOLEAN NOT NULL,
    ai_integration_description TEXT,
    technology_readiness VARCHAR(50),
    awards_and_recognitions VARCHAR(255),
    has_nurse BOOLEAN NOT NULL,
    has_psychologist BOOLEAN NOT NULL,
    has_food_service BOOLEAN NOT NULL,
    has_nutritionist BOOLEAN NOT NULL,
    has_transportation_services BOOLEAN NOT NULL,
    transportation_policies TEXT
);

CREATE TABLE facilities (
    id UUID NOT NULL REFERENCES school_facilities(id) ON DELETE CASCADE,
    facility VARCHAR(50) NOT NULL,
    PRIMARY KEY (id, facility)
);

CREATE TABLE accessibility_features (
    id UUID NOT NULL REFERENCES school_facilities(id) ON DELETE CASCADE,
    accessibility_feature VARCHAR(50) NOT NULL,
    PRIMARY KEY (id, accessibility_feature)
);

CREATE TABLE sustainability_practices (
    id UUID NOT NULL REFERENCES school_facilities(id) ON DELETE CASCADE,
    sustainability_practice VARCHAR(50) NOT NULL,
    PRIMARY KEY (id, sustainability_practice)
);

CREATE TABLE university_destinations (
    id UUID NOT NULL REFERENCES school_facilities(id) ON DELETE CASCADE,
    university_destination VARCHAR(255) NOT NULL,
    PRIMARY KEY (id, university_destination)
);

CREATE TABLE industry_partnerships (
    id UUID NOT NULL REFERENCES school_facilities(id) ON DELETE CASCADE,
    industry_partnership VARCHAR(255) NOT NULL,
    PRIMARY KEY (id, industry_partnership)
);

-- ============================================================
-- SCHOOL_FEES
-- ============================================================
CREATE TABLE school_fees (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE
);

CREATE TABLE tuition_fees (
    school_fees_id UUID NOT NULL REFERENCES school_fees(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(19,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (school_fees_id, title)
);

CREATE TABLE additional_fees (
    school_fees_id UUID NOT NULL REFERENCES school_fees(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(19,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (school_fees_id, title)
);

-- ============================================================
-- SCHOOL_MEDIA
-- ============================================================
CREATE TABLE school_media (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    bqa_report_link VARCHAR(255),
    brochure_link VARCHAR(255),
    gallery_link VARCHAR(255),
    video_tour_link VARCHAR(255)
);

-- ============================================================
-- SCHOOL_STAFF
-- ============================================================
CREATE TABLE school_staff (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    leadership_team VARCHAR(255),
    leadership_profile_link VARCHAR(255),
    staff_size_estimate INTEGER NOT NULL,
    teacher_qualifications VARCHAR(255),
    professional_development VARCHAR(255),
    last_inspection_date DATE
);

CREATE TABLE school_staff_nationalities (
    school_staff_id UUID NOT NULL REFERENCES school_staff(id) ON DELETE CASCADE,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_staff_id, country)
);

CREATE TABLE school_staff_languages (
    school_staff_id UUID NOT NULL REFERENCES school_staff(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    PRIMARY KEY (school_staff_id, language)
);

-- ============================================================
-- SCHOOL_STUDENTS
-- ============================================================
CREATE TABLE school_students (
    id UUID PRIMARY KEY REFERENCES schools(id) ON DELETE CASCADE,
    total_students INTEGER,
    has_parents_committee BOOLEAN NOT NULL
);

CREATE TABLE school_student_nationalities (
    school_students_id UUID NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
    nationality VARCHAR(255) NOT NULL,
    PRIMARY KEY (school_students_id, nationality)
);

CREATE TABLE school_extracurricular_activities (
    school_students_id UUID NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (school_students_id, name)
);

CREATE TABLE school_average_students_per_classroom (
    school_students_id UUID NOT NULL REFERENCES school_students(id) ON DELETE CASCADE,
    grade VARCHAR(255) NOT NULL,
    number_of_students INTEGER NOT NULL,
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (school_students_id, grade)
);

-- ============================================================
-- SEED SUPER ADMINS
-- ============================================================
INSERT INTO users (id, first_name, last_name, email, password, role, created_at, updated_at)
VALUES
    (gen_random_uuid(), 'Ahmed', 'Jdidi', 'ajedidi@technoshark.org', '$2a$10$yiJ10eTCJi/tWKC7TRWPdOAtw3Llh/YR0MgdNbvceHlIiDZUk5.iK', 'SUPER_ADMIN', NOW(), NOW()),
    (gen_random_uuid(), 'Aziz', 'Hlel', 'm.aziz.hlel@gmail.com', '$2a$10$5rT3DqDUSe3LlJcTFqL4ReDSqWTrC3UE1K.PiyLVWcpyff8HfIaCG', 'SUPER_ADMIN', NOW(), NOW()),
    (gen_random_uuid(), 'Abdalmuttaleb', 'Admin', 'abdalmuttaleb@technoshark.org', '$2a$10$zJ4PHBRJGdcKvu2k7sMtKe4Jc7qw/3IW/9zDmaok4wfBRbqsCNDby', 'SUPER_ADMIN', NOW(), NOW());
