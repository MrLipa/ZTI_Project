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



---------------------------------------------------------------------------------------------------------------------------------------------------------------------



MATCH(a) DETACH DELETE a;
WITH[  
  ['USA','Atlanta','USA','Dallas',800, '2023-05-14', 150],
  ['USA','Chicago','USA','Dallas',1000, '2023-05-15', 160],
  ['USA','Dallas','Mexico','Mexico City',1300, '2023-05-16', 220],
  ['Mexico','Mexico City','Columbia','Bogota',1500, '2023-05-17', 230],
  ['Columbia','Bogota','Brazil','Rio de Janerio',1800, '2023-05-18', 240],
  ['Brazil','Rio de Janerio','USA','Chicago',2000, '2023-05-19', 500],

  ['Spain','Madrid','France','Paris',1100, '2023-05-20', 110],
  ['England','London','France','Paris',900, '2023-05-21', 120],
  ['Netherlands','Rotterdam','England','London',400, '2023-05-22', 130],
  ['Italy','Rome','Netherlands','Rotterdam',1100, '2023-05-23', 210],
  ['England','London','Germany','Berlin',900, '2023-05-24', 220],
  ['Poland','Warsaw','Germany','Berlin',1000, '2023-05-25', 230],
  ['Poland','Warsaw','Greece','Athens',1500, '2023-05-26', 240],

  ['China','Pekin','China','Hong-kong',2000, '2023-05-27', 250],
  ['China','Pekin','China','Shanghai',1200, '2023-05-28', 260],
  ['China','Shanghai','South Korea','Seul',800, '2023-05-29', 270],
  ['South Korea','Seul','Japan','Tokyo',900, '2023-05-30', 280],
  ['Japan','Tokyo','Singapore','Singapore',1500, '2023-05-31', 290],
  ['China','Pekin','Singapore','Singapore',3000, '2023-06-01', 300],

  ['USA','Chicago','China','Shanghai',9000, '2023-06-02', 1000],
  ['USA','Atlanta','Poland','Warsaw',7500, '2023-06-03', 600],
  ['Japan','Tokyo','France','Paris',11000, '2023-06-04', 1200]
] AS nested
UNWIND nested AS row
MERGE (a:Airport {country: row[0], city: row[1]})
MERGE (b:Airport {country: row[2], city: row[3]})
MERGE (a)-[r_in:CONNECTION {distance: row[4], date: row[5], price: row[6]}]->(b)
MERGE (b)-[r_out:CONNECTION {distance: row[4], date: row[5], price: row[6]}]->(a)

MATCH (n) RETURN n LIMIT 25;