-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--
-- Database Name: student_tracker
CREATE TABLE
  IF NOT EXISTS "coaches" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR,
    "last_name" VARCHAR
  );

CREATE TABLE
  IF NOT EXISTS "roles" ("id" SERIAL PRIMARY KEY, "role" VARCHAR(100));

CREATE TABLE
  IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "password" VARCHAR(1000) NOT NULL,
    "role_id" INTEGER REFERENCES "roles" ("id")
  );

INSERT INTO roles (role) VALUES 
('Deactivated'),
('Academic Assessment Coordinator'),
('Dyslexia Specialist'),
('Literacy Coach Manager'),
('Lead Performing Agent'),
('Admin');

CREATE TABLE
 IF NOT EXISTS "students" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(20) NOT NULL,
  "last_name" VARCHAR(20) NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "grade" INTEGER NOT NULL,
  "gender" VARCHAR(1),
  "dob" DATE NOT NULL,
  "city" VARCHAR(20),
  "state" VARCHAR(50),
  "picture" VARCHAR(1000),
  "school" VARCHAR(30),
  "on_site" BOOLEAN NOT NULL DEFAULT true,
  "barton_c" BOOLEAN,
  "barton_c_date" DATE,
  "coach_id" INTEGER REFERENCES "coaches" ("id"),
  "start_date" DATE NOT NULL
 );

CREATE TABLE
  IF NOT EXISTS "student_comments" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "comments" VARCHAR(1000)
  );

CREATE TABLE
  IF NOT EXISTS "gort" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "sum_scaled_score" INTEGER,
    "oral_reading_percentile_rank" INTEGER,
    "oral_reading_index" INTEGER,
    "rate_raw_total" INTEGER,
    "accuracy_raw_total" INTEGER,
    "fluency_raw_total" INTEGER,
    "comprehension_raw_total" INTEGER,
    "rate_percentile_rank" INTEGER,
    "accuracy_percentile_rank" INTEGER,
    "fluency_percentile_rank" INTEGER,
    "comprehension_percentile_rank" INTEGER,
    "rate_scaled_score" INTEGER,
    "accuracy_scaled_score" INTEGER,
    "fluency_scaled_score" INTEGER,
    "comprehension_scaled_score" INTEGER
  );

CREATE TABLE
  IF NOT EXISTS "elementary_wist" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "read_regular_words" INTEGER,
    "read_irregular_words" INTEGER,
    "word_identification" INTEGER,
    "word_identification_percentile" INTEGER,
    "word_identification_standard_score" INTEGER,
    "spell_regular_words" INTEGER,
    "spell_irregular_words" INTEGER,
    "spelling" INTEGER,
    "spelling_percentile" INTEGER,
    "spelling_standard_score" INTEGER,
    "fundamental_literacy" INTEGER,
    "fundamental_literacy_percentile" INTEGER,
    "fundamental_literacy_standard_score" INTEGER,
    "pseudo_words" INTEGER,
    "letter_sounds" INTEGER,
    "sound_symbol_knowledge" INTEGER,
    "sound_symbol_knowledge_percentile" INTEGER,
    "sound_symbol_knowledge_standard_score" INTEGER
  );

CREATE TABLE
  IF NOT EXISTS "younger_ctopp" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "elison_scaled_score" INTEGER,
    "blending_words_scaled_score" INTEGER,
    "sound_matching_scaled_score" INTEGER,
    "memory_for_digits_scaled_score" INTEGER,
    "nonword_repetition_scaled_score" INTEGER,
    "rapid_digit_naming_scaled_score" INTEGER,
    "rapid_letter_naming_scaled_score" INTEGER,
    "rapid_color_naming_scaled_score" INTEGER,
    "rapid_object_naming" INTEGER,
    "blending_nonwords_scaled_score" INTEGER,
    "phonological_awareness_composite" INTEGER,
    "phonological_memory_composite" INTEGER,
    "rapid_symbolic_naming_composite" INTEGER,
    "rapid_non_symbolic_naming_composite" INTEGER
  );

CREATE TABLE
  IF NOT EXISTS "secondary_wist" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "read_regular_words" INTEGER,
    "read_irregular_words" INTEGER,
    "word_identification" INTEGER,
    "word_identification_percentile" INTEGER,
    "word_identification_standard_score" INTEGER,
    "spell_regular_words" INTEGER,
    "spell_irregular_words" INTEGER,
    "spelling" INTEGER,
    "spelling_percentile" INTEGER,
    "spelling_standard_score" INTEGER,
    "fundamental_literacy" INTEGER,
    "fundamental_literacy_percentile" INTEGER,
    "fundamental_literacy_standard_score" INTEGER,
    "pseudo_words" INTEGER,
    "letter_sounds" INTEGER,
    "sound_symbol_knowledge" INTEGER,
    "sound_symbol_knowledge_percentile" INTEGER,
    "sound_symbol_knowledge_standard_score" INTEGER
  );

CREATE TABLE IF NOT EXISTS "older_ctopp" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER REFERENCES "students" ("id"),
  "date" DATE NOT NULL,
  "examiner_id" INTEGER REFERENCES "user" ("id"),
  "elison_scaled_score" INTEGER,
  "blending_words_scaled_score" INTEGER,
  "phoneme_isolation_scaled_score" INTEGER,
  "memory_for_digits_scaled_score" INTEGER,
  "nonword_repetition_scaled_score" INTEGER,
  "rapid_digit_naming_scaled_score" INTEGER,
  "rapid_letter_naming_scaled_score" INTEGER,
  "blending_nonwords_scaled_score" INTEGER,
  "segmenting_nonwords_scaled_score" INTEGER,
  "phonological_awareness_composite" INTEGER,
  "phonological_memory_composite" INTEGER,
  "rapid_symbolic_naming_composite" INTEGER,
  "alt_phonological_awareness_composite" INTEGER
);

CREATE TABLE
  IF NOT EXISTS "ktea" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "lwr_scaled_score" INTEGER,
    "lwr_percentile" INTEGER,
    "spelling_scaled_score" INTEGER,
    "spelling_percentile" INTEGER
  );

-- TEST STUDENTS:
INSERT INTO "students" ("first_name", "last_name", "is_active", "grade", "gender", "dob", "city", "state", "school", "on_site", "barton_c", "barton_c_date", "coach_id", "start_date")
VALUES
  ('John', 'Doe', true, 10, 'M', DATE '2005-05-15', 'New York', 'NY', 'High School 1', true, true, '2022-01-15', 1, '2022-01-01'),
  ('Jane', 'Smith', true, 11, 'F', DATE '2004-08-21', 'Los Angeles', 'CA', 'High School 2', true, false, NULL, 2, '2022-02-01'),
  ('Mike', 'Johnson', true, 9, 'M', DATE '2006-03-10', 'Chicago', 'IL', 'High School 3', false, true, '2022-03-15', 3, '2022-03-01'),
  ('Emily', 'Brown', true, 12, 'F', DATE '2003-11-30', 'Houston', 'TX', 'High School 4', true, false, NULL, 4, '2022-04-01'),
  ('David', 'Lee', true, 10, 'M', DATE '2005-07-18', 'San Francisco', 'CA', 'High School 5', true, true, '2022-05-15', 5, '2022-05-01'),
  ('Sarah', 'Taylor', true, 11, 'F', DATE '2004-09-25', 'Boston', 'MA', 'High School 6', false, false, NULL, 6, '2022-06-01'),
  ('Michael', 'Davis', true, 9, 'M', DATE '2006-02-05', 'Miami', 'FL', 'High School 7', true, true, '2022-07-15', 7, '2022-07-01'),
  ('Olivia', 'Wilson', true, 12, 'F', DATE '2003-10-12', 'Dallas', 'TX', 'High School 8', false, false, NULL, 8, '2022-08-01'),
  ('James', 'Anderson', true, 10, 'M', DATE '2005-06-20', 'Philadelphia', 'PA', 'High School 9', true, true, '2022-09-15', 9, '2022-09-01'),
  ('Emma', 'Martinez', true, 11, 'F', DATE '2004-07-14', 'Phoenix', 'AZ', 'High School 10', false, true, '2022-10-15', 10, '2022-10-01'),
  ('William', 'Garcia', true, 9, 'M', DATE '2006-01-08', 'Seattle', 'WA', 'High School 11', true, false, NULL, 11, '2022-11-01'),
  ('Ava', 'Hernandez', true, 12, 'F', DATE '2003-09-03', 'Denver', 'CO', 'High School 12', false, true, '2022-12-15', 12, '2022-12-01'),
  ('Liam', 'Lopez', true, 10, 'M', DATE '2005-04-09', 'Atlanta', 'GA', 'High School 13', true, false, NULL, 13, '2023-01-01'),
  ('Mia', 'Ramirez', true, 11, 'F', DATE '2004-12-17', 'Detroit', 'MI', 'High School 14', false, true, '2023-02-15', 14, '2023-02-01'),
  ('Benjamin', 'Turner', true, 9, 'M', DATE '2006-08-05', 'Minneapolis', 'MN', 'High School 15', true, true, '2023-03-15', 15, '2023-03-01'),
  ('Sophia', 'Adams', true, 12, 'F', DATE '2003-07-27', 'Portland', 'OR', 'High School 16', false, false, NULL, 16, '2023-04-01');
