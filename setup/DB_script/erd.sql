DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'zti_project') THEN
    DROP TABLE IF EXISTS zti_project.user;
    DROP TABLE IF EXISTS zti_project.token;
    DROP SCHEMA zti_project CASCADE;
  END IF;
END $$;

CREATE SCHEMA zti_project;

CREATE TABLE zti_project.user (
  user_id SERIAL,
  CONSTRAINT user_pk PRIMARY KEY (user_id),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  flight_ids INTEGER[]
);

CREATE TABLE zti_project.token (
  user_id INTEGER NOT NULL,
  CONSTRAINT token_pk PRIMARY KEY (user_id),
  token VARCHAR(255)
);

SELECT * FROM zti_project.user LIMIT 100;

INSERT INTO zti_project.user (firstName, lastName, email, password, flight_ids)
VALUES ('John', 'Doe', 'johndoe@example.com', 'password123', '{1, 2}');

INSERT INTO zti_project.user (firstName, lastName, email, password, flight_ids)
VALUES ('Jane', 'Smith', 'janesmith@example.com', 'p@ssw0rd', '{3, 4}');

INSERT INTO zti_project.token (user_id, token)
VALUES (1, 'abcdefg123456789');

INSERT INTO zti_project.token (user_id, token)
VALUES (2, 'hijklmn987654321');
