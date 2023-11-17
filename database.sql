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

-- insert for roles:
INSERT INTO
  roles (role)
VALUES
  ('Academic Assessment Coordinator'),
  ('Dyslexia Specialist'),
  ('Literacy Coach Manager'),
  ('Lead Performing Agent'),
  ('Admin');

--dummy data
INSERT INTO
  "students" (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'John',
    'Doe',
    true,
    5,
    'M',
    '2011-05-15',
    '123 Main St',
    12345,
    'CountyName',
    'SchoolName',
    true,
    true,
    '2023-09-01'
  );

-- Student 1
INSERT INTO
  students (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    picture,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'John',
    'Smith',
    true,
    10,
    'M',
    '2005-04-15',
    '123 Main Street',
    12345,
    'Some County',
    '',
    'XYZ High School',
    true,
    true,
    '2023-01-10'
  );

-- Student 2
INSERT INTO
  students (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    picture,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'Jane',
    'Doe',
    true,
    11,
    'F',
    '2004-09-21',
    '456 Elm Street',
    54321,
    'Another County',
    '',
    'ABC High School',
    true,
    false,
    '2023-02-15'
  );

-- Student 3
INSERT INTO
  students (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    picture,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'Michael',
    'Johnson',
    true,
    9,
    'M',
    '2006-03-08',
    '789 Oak Avenue',
    98765,
    'Yet Another County',
    '',
    'DEF High School',
    true,
    true,
    '2023-03-20'
  );

-- Student 4
INSERT INTO
  students (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    picture,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'Emily',
    'Brown',
    true,
    12,
    'F',
    '2003-11-02',
    '101 Pine Road',
    45678,
    'County X',
    '',
    'GHI High School',
    true,
    true,
    '2023-04-05'
  );

-- Student 5
INSERT INTO
  students (
    first_name,
    last_name,
    is_active,
    grade,
    gender,
    dob,
    address,
    zip_code,
    county,
    picture,
    school,
    on_site,
    pretest_passed,
    pretest_date
  )
VALUES
  (
    'David',
    'Lee',
    true,
    8,
    'M',
    '2007-07-17',
    '222 Cedar Lane',
    87654,
    'County Y',
    '',
    'JKL Middle School',
    true,
    false,
    '2023-05-15'
  );