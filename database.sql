-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Database Name: student_tracker
-- coaches need is_active
CREATE TABLE
  IF NOT EXISTS "coaches" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "is_active" BOOLEAN NOT NULL DEFAULT true
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

INSERT INTO
  roles (role)
VALUES
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
    "start_date" DATE NOT NULL,
    "intake_grade" VARCHAR(10)
  );

CREATE TABLE
  IF NOT EXISTS "student_comments" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "comments" VARCHAR(1000),
    "name" VARCHAR(200),
    "date" DATE
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
    "comprehension_scaled_score" INTEGER,
    "grade" INTEGER
  );
ALTER TABLE "gort" ADD rate_descriptor CHAR(1);
ALTER TABLE "gort" ADD accuracy_descriptor CHAR(1);
ALTER TABLE "gort" ADD fluency_descriptor CHAR(1);
ALTER TABLE "gort" ADD comprehension_descriptor CHAR(1);

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
    "sound_symbol_knowledge_standard_score" INTEGER,
    "grade" INTEGER
  );

ALTER TABLE "elementary_wist" ADD read_regular_words_descriptor CHAR(1);
ALTER TABLE "elementary_wist" ADD read_irregular_words_descriptor CHAR(1);
ALTER TABLE "elementary_wist" ADD spell_regular_words_descriptor CHAR(1);
ALTER TABLE "elementary_wist" ADD spell_irregular_words_descriptor CHAR(1);
ALTER TABLE "elementary_wist" ADD pseudo_words_descriptor CHAR(1);
ALTER TABLE "elementary_wist" ADD letter_sounds_descriptor CHAR(1);

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
    "phonological_awareness_percentile" INTEGER,
    "phonological_memory_composite" INTEGER,
    "phonological_memory_percentile" INTEGER,
    "rapid_symbolic_naming_composite" INTEGER,
    "rapid_symbolic_naming_percentile" INTEGER,
    "rapid_non_symbolic_naming_composite" INTEGER,
    "rapid_non_symbolic_naming_percentile" INTEGER,
    "grade" INTEGER
  );

ALTER TABLE "younger_ctopp" ADD phonological_awareness_descriptor CHAR(1);
ALTER TABLE "younger_ctopp" ADD phonological_memory_descriptor CHAR(1);
ALTER TABLE "younger_ctopp" ADD rapid_symbolic_naming_descriptor CHAR(1);
ALTER TABLE "younger_ctopp" ADD rapid_non_symbolic_naming_descriptor CHAR(1);

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
    "sound_symbol_knowledge_standard_score" INTEGER,
    "grade" INTEGER
  );

ALTER TABLE "secondary_wist" ADD read_regular_words_descriptor CHAR(1);
ALTER TABLE "secondary_wist" ADD read_irregular_words_descriptor CHAR(1);
ALTER TABLE "secondary_wist" ADD spell_regular_words_descriptor CHAR(1);
ALTER TABLE "secondary_wist" ADD spell_irregular_words_descriptor CHAR(1);
ALTER TABLE "secondary_wist" ADD pseudo_words_descriptor CHAR(1);
ALTER TABLE "secondary_wist" ADD letter_sounds_descriptor CHAR(1);

CREATE TABLE
  IF NOT EXISTS "older_ctopp" (
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
    "phonological_awareness_percentile" INTEGER,
    "phonological_memory_composite" INTEGER,
    "phonological_memory_percentile" INTEGER,
    "rapid_symbolic_naming_composite" INTEGER,
    "rapid_symbolic_naming_percentile" INTEGER,
    "alt_phonological_awareness_composite" INTEGER,
    "alt_phonological_awareness_percentile" INTEGER,
    "grade" INTEGER
  );

ALTER TABLE "older_ctopp" ADD phonological_awareness_descriptor CHAR(1);
ALTER TABLE "older_ctopp" ADD phonological_memory_descriptor CHAR(1);
ALTER TABLE "older_ctopp" ADD rapid_symbolic_naming_descriptor CHAR(1);
ALTER TABLE "older_ctopp" ADD alt_phonological_awareness_descriptor CHAR(1);


CREATE TABLE
  IF NOT EXISTS "ktea" (
    "id" SERIAL PRIMARY KEY,
    "student_id" INTEGER REFERENCES "students" ("id"),
    "date" DATE NOT NULL,
    "examiner_id" INTEGER REFERENCES "user" ("id"),
    "lwr_scaled_score" INTEGER,
    "lwr_percentile" INTEGER,
    "spelling_scaled_score" INTEGER,
    "spelling_percentile" INTEGER,
    "grade" INTEGER
  );

CREATE TABLE "cron" ("last_updated" DATE);
  
Insert test coach records for the students
INSERT INTO
  "coaches" ("first_name", "last_name", "is_active")
VALUES
  ('Emily', 'Johnson', true),
  ('Michael', 'Smith', true),
  ('Sarah', 'Miller', true),
  ('James', 'Davis', true),
  ('Jennifer', 'Anderson', true),
  ('Robert', 'Wilson', true),
  ('Jessica', 'Taylor', true),
  ('William', 'Moore', false),
  ('Ashley', 'Brown', true),
  ('Brian', 'Jones', true),
  ('Nicole', 'Garcia', false),
  ('Joshua', 'Martin', true),
  ('Amanda', 'Thompson', true),
  ('Christopher', 'White', true),
  ('Heather', 'Harris', true),
  ('Matthew', 'Clark', true);
  

INSERT INTO
  "students" (
    "first_name",
    "last_name",
    "is_active",
    "grade",
    "gender",
    "dob",
    "city",
    "state",
    "school",
    "on_site",
    "barton_c",
    "barton_c_date",
    "coach_id",
    "start_date"
  )
VALUES
  (
    'John',
    'Doe',
    true,
    10,
    'M',
    DATE '2005-05-15',
    'New York',
    'NY',
    'High School 1',
    true,
    true,
    '2022-01-15',
    1,
    '2022-01-01'
  ),
  (
    'Jane',
    'Smith',
    true,
    11,
    'F',
    DATE '2004-08-21',
    'Los Angeles',
    'CA',
    'High School 2',
    true,
    false,
    NULL,
    2,
    '2022-02-01'
  ),
  (
    'Mike',
    'Johnson',
    true,
    9,
    'M',
    DATE '2006-03-10',
    'Chicago',
    'IL',
    'High School 3',
    false,
    true,
    '2022-03-15',
    3,
    '2022-03-01'
  ),
  (
    'Emily',
    'Brown',
    true,
    12,
    'F',
    DATE '2003-11-30',
    'Houston',
    'TX',
    'High School 4',
    true,
    false,
    NULL,
    4,
    '2022-04-01'
  ),
  (
    'David',
    'Lee',
    true,
    10,
    'M',
    DATE '2005-07-18',
    'San Francisco',
    'CA',
    'High School 5',
    true,
    true,
    '2022-05-15',
    5,
    '2022-05-01'
  ),
  (
    'Sarah',
    'Taylor',
    true,
    11,
    'F',
    DATE '2004-09-25',
    'Boston',
    'MA',
    'High School 6',
    false,
    false,
    NULL,
    6,
    '2022-06-01'
  ),
  (
    'Michael',
    'Davis',
    true,
    9,
    'M',
    DATE '2006-02-05',
    'Miami',
    'FL',
    'High School 7',
    true,
    true,
    '2022-07-15',
    7,
    '2022-07-01'
  ),
  (
    'Olivia',
    'Wilson',
    true,
    12,
    'F',
    DATE '2003-10-12',
    'Dallas',
    'TX',
    'High School 8',
    false,
    false,
    NULL,
    8,
    '2022-08-01'
  ),
  (
    'James',
    'Anderson',
    true,
    10,
    'M',
    DATE '2005-06-20',
    'Philadelphia',
    'PA',
    'High School 9',
    true,
    true,
    '2022-09-15',
    9,
    '2022-09-01'
  ),
  (
    'Emma',
    'Martinez',
    true,
    11,
    'F',
    DATE '2004-07-14',
    'Phoenix',
    'AZ',
    'High School 10',
    false,
    true,
    '2022-10-15',
    10,
    '2022-10-01'
  ),
  (
    'William',
    'Garcia',
    true,
    9,
    'M',
    DATE '2006-01-08',
    'Seattle',
    'WA',
    'High School 11',
    true,
    false,
    NULL,
    11,
    '2022-11-01'
  ),
  (
    'Ava',
    'Hernandez',
    true,
    12,
    'F',
    DATE '2003-09-03',
    'Denver',
    'CO',
    'High School 12',
    false,
    true,
    '2022-12-15',
    12,
    '2022-12-01'
  ),
  (
    'Liam',
    'Lopez',
    true,
    10,
    'M',
    DATE '2005-04-09',
    'Atlanta',
    'GA',
    'High School 13',
    true,
    false,
    NULL,
    13,
    '2023-01-01'
  ),
  (
    'Mia',
    'Ramirez',
    true,
    11,
    'F',
    DATE '2004-12-17',
    'Detroit',
    'MI',
    'High School 14',
    false,
    true,
    '2023-02-15',
    14,
    '2023-02-01'
  ),
  (
    'Benjamin',
    'Turner',
    true,
    9,
    'M',
    DATE '2006-08-05',
    'Minneapolis',
    'MN',
    'High School 15',
    true,
    true,
    '2023-03-15',
    15,
    '2023-03-01'
  ),
  (
    'Sophia',
    'Adams',
    true,
    12,
    'F',
    DATE '2003-07-27',
    'Portland',
    'OR',
    'High School 16',
    false,
    false,
    NULL,
    16,
    '2023-04-01'
  );

  
-- User ID 1
INSERT INTO "younger_ctopp" ("student_id", "date", "examiner_id", "elison_scaled_score", "blending_words_scaled_score", "sound_matching_scaled_score", "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", "rapid_color_naming_scaled_score", "rapid_object_naming", "blending_nonwords_scaled_score", "phonological_awareness_composite", "phonological_awareness_percentile", "phonological_memory_composite", "phonological_memory_percentile", "rapid_symbolic_naming_composite", "rapid_symbolic_naming_percentile", "rapid_non_symbolic_naming_composite", "rapid_non_symbolic_naming_percentile")
VALUES
  (1, '2022-01-10', 1, 80, 75, 90, 85, 95, 70, 85, 90, 100, 80, 90, 75, 85, 70, 95, 80, 90, 70),
  (1, '2022-02-15', 1, 85, 70, 88, 80, 96, 68, 87, 92, 98, 78, 88, 72, 82, 68, 94, 82, 88, 68),
  (1, '2022-03-20', 1, 78, 68, 86, 82, 94, 72, 84, 88, 96, 74, 86, 70, 80, 72, 92, 78, 86, 72);

-- User ID 2
INSERT INTO "younger_ctopp" ("student_id", "date", "examiner_id", "elison_scaled_score", "blending_words_scaled_score", "sound_matching_scaled_score", "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", "rapid_color_naming_scaled_score", "rapid_object_naming", "blending_nonwords_scaled_score", "phonological_awareness_composite", "phonological_awareness_percentile", "phonological_memory_composite", "phonological_memory_percentile", "rapid_symbolic_naming_composite", "rapid_symbolic_naming_percentile", "rapid_non_symbolic_naming_composite", "rapid_non_symbolic_naming_percentile")
VALUES
  (2, '2022-01-10', 2, 82, 78, 92, 88, 97, 73, 88, 86, 98, 83, 92, 78, 87, 73, 96, 82, 92, 73),
  (2, '2022-02-15', 2, 88, 72, 90, 86, 98, 70, 86, 90, 96, 80, 90, 74, 84, 70, 94, 88, 90, 70),
  (2, '2022-03-20', 2, 80, 70, 88, 84, 96, 76, 82, 84, 94, 76, 88, 72, 82, 76, 92, 80, 88, 76);

-- User ID 1
INSERT INTO "gort" ("student_id", "date", "examiner_id", "sum_scaled_score", "oral_reading_percentile_rank", "oral_reading_index", "rate_raw_total", "accuracy_raw_total", "fluency_raw_total", "comprehension_raw_total", "rate_percentile_rank", "accuracy_percentile_rank", "fluency_percentile_rank", "comprehension_percentile_rank", "rate_scaled_score", "accuracy_scaled_score", "fluency_scaled_score", "comprehension_scaled_score")
VALUES
  (1, '2022-01-10', 1, 190, 85, 95, 45, 50, 55, 40, 80, 85, 90, 75, 85, 90, 95, 80),
  (1, '2022-02-15', 1, 195, 88, 96, 47, 52, 57, 42, 84, 88, 92, 78, 88, 92, 96, 84),
  (1, '2022-03-20', 1, 200, 90, 98, 50, 55, 60, 45, 88, 90, 94, 80, 90, 94, 98, 88);

-- User ID 2
INSERT INTO "gort" ("student_id", "date", "examiner_id", "sum_scaled_score", "oral_reading_percentile_rank", "oral_reading_index", "rate_raw_total", "accuracy_raw_total", "fluency_raw_total", "comprehension_raw_total", "rate_percentile_rank", "accuracy_percentile_rank", "fluency_percentile_rank", "comprehension_percentile_rank", "rate_scaled_score", "accuracy_scaled_score", "fluency_scaled_score", "comprehension_scaled_score")
VALUES
  (2, '2022-01-10', 2, 185, 82, 92, 43, 48, 53, 38, 78, 82, 88, 73, 82, 88, 92, 78),
  (2, '2022-02-15', 2, 190, 84, 94, 45, 50, 55, 40, 82, 84, 90, 75, 84, 90, 94, 82),
  (2, '2022-03-20', 2, 195, 86, 96, 47, 52, 57, 42, 84, 86, 92, 78, 86, 92, 96, 84);

-- Student ID 1
INSERT INTO "older_ctopp" ("student_id", "date", "examiner_id", "elison_scaled_score", "blending_words_scaled_score", "phoneme_isolation_scaled_score", "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", "blending_nonwords_scaled_score", "segmenting_nonwords_scaled_score", "phonological_awareness_composite", "phonological_awareness_percentile", "phonological_memory_composite", "phonological_memory_percentile", "rapid_symbolic_naming_composite", "rapid_symbolic_naming_percentile", "alt_phonological_awareness_composite", "alt_phonological_awareness_percentile")
VALUES
  (1, '2022-01-10', 1, 85, 78, 90, 86, 94, 70, 80, 75, 85, 88, 90, 75, 85, 90, 70, 85, 88),
  (1, '2022-02-15', 1, 88, 80, 92, 88, 96, 72, 82, 78, 88, 90, 92, 78, 88, 92, 72, 88, 90),
  (1, '2022-03-20', 1, 80, 72, 88, 84, 94, 74, 80, 70, 80, 86, 88, 70, 80, 86, 74, 80, 86);
  -- Student ID 1
INSERT INTO "secondary_wist" ("student_id", "date", "examiner_id", "read_regular_words", "read_irregular_words", "word_identification", "word_identification_percentile", "word_identification_standard_score", "spell_regular_words", "spell_irregular_words", "spelling", "spelling_percentile", "spelling_standard_score", "fundamental_literacy", "fundamental_literacy_percentile", "fundamental_literacy_standard_score", "pseudo_words", "letter_sounds", "sound_symbol_knowledge", "sound_symbol_knowledge_percentile", "sound_symbol_knowledge_standard_score")
VALUES
  (1, '2022-01-10', 1, 85, 78, 90, 85, 88, 70, 80, 75, 85, 88, 90, 75, 85, 90, 70, 85, 88, 90),
  (1, '2022-02-15', 1, 88, 80, 92, 88, 90, 72, 82, 78, 88, 90, 92, 78, 88, 92, 72, 88, 90, 92),
  (1, '2022-03-20', 1, 80, 72, 88, 84, 86, 74, 80, 70, 80, 86, 88, 70, 80, 86, 74, 80, 86, 88);
  -- Student ID 1
INSERT INTO "ktea" ("student_id", "date", "examiner_id", "lwr_scaled_score", "lwr_percentile", "spelling_scaled_score", "spelling_percentile")
VALUES
  (1, '2022-01-10', 1, 85, 78, 90, 85),
  (1, '2022-02-15', 1, 88, 80, 92, 88),
  (1, '2022-03-20', 1, 80, 72, 88, 84);


-- Student ID 2
INSERT INTO "older_ctopp" ("student_id", "date", "examiner_id", "elison_scaled_score", "blending_words_scaled_score", "phoneme_isolation_scaled_score", "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", "blending_nonwords_scaled_score", "segmenting_nonwords_scaled_score", "phonological_awareness_composite", "phonological_awareness_percentile", "phonological_memory_composite", "phonological_memory_percentile", "rapid_symbolic_naming_composite", "rapid_symbolic_naming_percentile", "alt_phonological_awareness_composite", "alt_phonological_awareness_percentile")
VALUES
  (2, '2022-01-10', 2, 82, 75, 88, 84, 92, 68, 78, 72, 82, 85, 88, 72, 82, 88, 68, 82, 85),
  (2, '2022-02-15', 2, 85, 78, 90, 86, 94, 70, 80, 75, 85, 88, 90, 75, 85, 90, 70, 85, 88),
  (2, '2022-03-20', 2, 78, 72, 86, 82, 90, 74, 78, 68, 78, 84, 86, 68, 78, 86, 74, 78, 84);


-- Student ID 1
INSERT INTO "elementary_wist" ("student_id", "date", "examiner_id", "read_regular_words", "read_irregular_words", "word_identification", "word_identification_percentile", "word_identification_standard_score", "spell_regular_words", "spell_irregular_words", "spelling", "spelling_percentile", "spelling_standard_score", "fundamental_literacy", "fundamental_literacy_percentile", "fundamental_literacy_standard_score", "pseudo_words", "letter_sounds", "sound_symbol_knowledge", "sound_symbol_knowledge_percentile", "sound_symbol_knowledge_standard_score")
VALUES
  (1, '2022-01-10', 1, 85, 78, 90, 85, 88, 70, 80, 75, 85, 88, 90, 75, 85, 90, 70, 85, 88, 90),
  (1, '2022-02-15', 1, 88, 80, 92, 88, 90, 72, 82, 78, 88, 90, 92, 78, 88, 92, 72, 88, 90, 92),
  (1, '2022-03-20', 1, 80, 72, 88, 84, 86, 74, 80, 70, 80, 86, 88, 70, 80, 86, 74, 80, 86, 88);
  -- Student ID 2
INSERT INTO "elementary_wist" ("student_id", "date", "examiner_id", "read_regular_words", "read_irregular_words", "word_identification", "word_identification_percentile", "word_identification_standard_score", "spell_regular_words", "spell_irregular_words", "spelling", "spelling_percentile", "spelling_standard_score", "fundamental_literacy", "fundamental_literacy_percentile", "fundamental_literacy_standard_score", "pseudo_words", "letter_sounds", "sound_symbol_knowledge", "sound_symbol_knowledge_percentile", "sound_symbol_knowledge_standard_score")
VALUES
  (2, '2022-01-10', 2, 82, 75, 88, 85, 88, 68, 78, 72, 82, 85, 88, 72, 82, 88, 68, 82, 85, 88),
  (2, '2022-02-15', 2, 85, 78, 90, 86, 90, 70, 80, 75, 85, 88, 90, 75, 85, 90, 70, 85, 88, 90),
  (2, '2022-03-20', 2, 78, 72, 86, 82, 88, 74, 78, 68, 78, 84, 86, 68, 78, 86, 74, 78, 84, 86);
