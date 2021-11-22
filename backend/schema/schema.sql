DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS hobby CASCADE;
DROP TABLE IF EXISTS friend_request CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

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

CREATE TABLE friend_request (
  id SERIAL PRIMARY KEY,
  sender_username VARCHAR(255) NOT NULL,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  friend_username VARCHAR(255) NOT NULL
);

CREATE TABLE hobby (
  id SERIAL PRIMARY KEY,
  hobby_name VARCHAR(255) NOT NULL,
  level_of_expertise VARCHAR(255) NOT NULL,
  my_spending_estimate VARCHAR(255) NOT NULL,
  amount_of_time_doing_hobby VARCHAR(255) NOT NULL,
  person_id INTEGER REFERENCES person(id) ON DELETE CASCADE
);



