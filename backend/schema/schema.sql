DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS hobby CASCADE;
DROP TABLE IF EXISTS text_message CASCADE;

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  person_email VARCHAR(255) NOT NULL,
  person_password VARCHAR(255) NOT NULL,
  password_confirm VARCHAR(255) NOT NULL,
  person_gender VARCHAR(255) NOT NULL,
  person_address VARCHAR(255) NOT NULL,
  person_bio VARCHAR(255),
  date_of_membership TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE hobby (
  id SERIAL PRIMARY KEY,
  hobby_name VARCHAR(255) NOT NULL,
  level_of_expertise VARCHAR(255) NOT NULL,
  my_spending_estimate VARCHAR(255) NOT NULL,
  amount_of_time_doing_hobby VARCHAR(255) NOT NULL,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE text_message (
  id SERIAL PRIMARY KEY,
  text_message VARCHAR(255),
  sender_username VARCHAR(255) NOT NULL, 
  sender_id VARCHAR(255) NOT NULL
);