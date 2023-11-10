
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--
-- Database Name: student_tracker

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "first_name" VARCHAR(50),
  "last_name" VARCHAR(50),
  "password" VARCHAR(1000) NOT NULL,
  "academic_assessment_coordinator" BOOLEAN DEFAULT false NOT NULL,
  "admin" BOOLEAN DEFAULT false NOT NULL,
  "literary_coach" BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS "students" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(20) NOT NULL,
  "last_name" VARCHAR(20) NOT NULL,
  "is_active" BOOLEAN DEFAULT true NOT NULL,
  "grade" INTEGER NOT NULL,
  "gender" VARCHAR(1),
  "dob" DATE NOT NULL,
  "address" VARCHAR(100) NOT NULL,
  "zip_code" INTEGER NOT NULL,
  "county" VARCHAR(20),
  "picture" VARCHAR(1000),
  "school" VARCHAR(30),
  "on_site" BOOLEAN DEFAULT true NOT NULL,
  "pretest_passed" BOOLEAN,
  "pretest_date" DATE
);

CREATE TABLE IF NOT EXISTS "gort" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
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
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "elementary_wist" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
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
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "user_students" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "student_id" INTEGER NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);

CREATE TABLE IF NOT EXISTS "younger_ctopp" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
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
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "secondary_wist" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
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
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "older_ctopp" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
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
  "alt_phonological_awareness" INTEGER,
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "ktea" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "examiner_id" INTEGER NOT NULL,
  "lwr_scaled_score" INTEGER,
  "lwr_percentile" INTEGER,
  "spelling_scaled_score" INTEGER,
  "spelling_percentile" INTEGER,
  FOREIGN KEY ("student_id") REFERENCES "students" ("id"),
  FOREIGN KEY ("examiner_id") REFERENCES "user" ("id")
);

CREATE TABLE IF NOT EXISTS "student_comments" (
  "id" SERIAL PRIMARY KEY,
  "student_id" INTEGER NOT NULL,
  "comments" VARCHAR(1000),
  FOREIGN KEY ("student_id") REFERENCES "students" ("id")
);