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
  image BYTEA,
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

ALTER CURRENT USER SET PASSWORD FROM 'UVMi5zeQL7aacE5PKFRxjd5b4Oo79nyTu40sza6O5hE' TO '12345678';

MATCH(a) DETACH DELETE a;

WITH [
  ['USA', 'Atlanta', 'https://lp-cms-production.imgix.net/2021-03/500pxRF_77415821.jpg?auto=format&w=1440&h=810&fit=crop&q=75'],
  ['USA', 'Chicago', 'https://example.com/chicago.jpg'],
  ['USA', 'Dallas', 'https://example.com/dallas.jpg'],
  ['Mexico', 'Mexico City', 'https://example.com/mexico_city.jpg'],
  ['Columbia', 'Bogota', 'https://example.com/bogota.jpg'],
  ['Brazil', 'Rio de Janeiro', 'https://example.com/rio_de_janeiro.jpg'],
  ['Spain', 'Madrid', 'https://example.com/madrid.jpg'],
  ['England', 'London', 'https://example.com/london.jpg'],
  ['Netherlands', 'Rotterdam', 'https://example.com/rotterdam.jpg'],
  ['Italy', 'Rome', 'https://example.com/rome.jpg'],
  ['France', 'Paris', 'https://example.com/paris.jpg'],
  ['Germany', 'Berlin', 'https://example.com/berlin.jpg'],
  ['Poland', 'Warsaw', 'https://example.com/warsaw.jpg'],
  ['Greece', 'Athens', 'https://example.com/athens.jpg'],
  ['China', 'Beijing', 'https://example.com/beijing.jpg'],
  ['China', 'Hong Kong', 'https://example.com/hong_kong.jpg'],
  ['China', 'Shanghai', 'https://example.com/shanghai.jpg'],
  ['South Korea', 'Seoul', 'https://example.com/seoul.jpg'],
  ['Japan', 'Tokyo', 'https://example.com/tokyo.jpg'],
  ['Singapore', 'Singapore', 'https://example.com/singapore.jpg']
] AS nested
UNWIND nested AS row
MERGE (a:Airport {country: row[0], city: row[1], image: row[2]})


WITH[  
  ['USA', 'Atlanta', 'USA', 'Dallas', 800, '2023-05-14', 150, '5h 40m', 'Delta Airlines', 'Economy', 120],
  ['USA', 'Chicago', 'USA', 'Dallas', 1000, '2023-05-15', 160, '3h 20m', 'American Airlines', 'Business', 80],
  ['USA', 'Dallas', 'Mexico', 'Mexico City', 1300, '2023-05-16', 220, '6h 15m', 'Southwest Airlines', 'Economy', 200],
  ['Mexico', 'Mexico City', 'Columbia', 'Bogota', 1500, '2023-05-17', 230, '4h 50m', 'Avianca', 'Business', 100],
  ['Columbia', 'Bogota', 'Brazil', 'Rio de Janeiro', 1800, '2023-05-18', 240, '7h 30m', 'LATAM Airlines', 'Economy', 150],
  ['Brazil', 'Rio de Janeiro', 'USA', 'Chicago', 2000, '2023-05-19', 500, '8h 15m', 'United Airlines', 'Business', 250],
  ['Spain', 'Madrid', 'France', 'Paris', 1100, '2023-05-20', 110, '2h 40m', 'Iberia', 'Economy', 90],
  ['England', 'London', 'France', 'Paris', 900, '2023-05-21', 120, '3h 55m', 'British Airways', 'Business', 70],
  ['Netherlands', 'Rotterdam', 'England', 'London', 400, '2023-05-22', 130, '1h 10m', 'KLM Royal Dutch Airlines', 'Economy', 110],
  ['Italy', 'Rome', 'Netherlands', 'Rotterdam', 1100, '2023-05-23', 210, '6h 45m', 'Alitalia', 'Business', 120],
  ['England', 'London', 'Germany', 'Berlin', 900, '2023-05-24', 220, '2h 20m', 'Lufthansa', 'Economy', 80],
  ['Poland', 'Warsaw', 'Germany', 'Berlin', 1000, '2023-05-25', 230, '4h 30m', 'LOT Polish Airlines', 'Business', 150],
  ['Poland', 'Warsaw', 'Greece', 'Athens', 1500, '2023-05-26', 240, '5h 55m', 'Aegean Airlines', 'Economy', 100],
  ['China', 'Beijing', 'China', 'Hong Kong', 2000, '2023-05-27', 250, '9h 20m', 'Air China', 'Business', 180],
  ['China', 'Beijing', 'China', 'Shanghai', 1200, '2023-05-28', 260, '3h 45m', 'China Eastern Airlines', 'Economy', 200],
  ['China', 'Shanghai', 'South Korea', 'Seoul', 800, '2023-05-29', 270, '2h 55m', 'Korean Air', 'Business', 120],
  ['South Korea', 'Seoul', 'Japan', 'Tokyo', 900, '2023-05-30', 280, '4h 10m', 'Asiana Airlines', 'Economy', 150],
  ['Japan', 'Tokyo', 'Singapore', 'Singapore', 1500, '2023-05-31', 290, '7h 25m', 'Singapore Airlines', 'Business', 200],
  ['China', 'Beijing', 'Singapore', 'Singapore', 3000, '2023-06-01', 300, '10h 35m', 'Cathay Pacific', 'Economy', 250],
  ['USA', 'Chicago', 'China', 'Shanghai', 9000, '2023-06-02', 1000, '13h 45m', 'United Airlines', 'Business', 300],
  ['USA', 'Atlanta', 'Poland', 'Warsaw', 7500, '2023-06-03', 600, '12h 55m', 'LOT Polish Airlines', 'Economy', 180],
  ['Japan', 'Tokyo', 'France', 'Paris', 11000, '2023-06-04', 1200, '14h 20m', 'Air France', 'Business', 350]
] AS nested
UNWIND nested AS row
MERGE (a:Airport {country: row[0], city: row[1]})
MERGE (b:Airport {country: row[2], city: row[3]})
MERGE (a)-[r_in:CONNECTION {distance: row[4], date: row[5], price: row[6], duration: row[7], airlines: row[8], class: row[9], free_seats: row[10]}]->(b)
MERGE (b)-[r_out:CONNECTION {distance: row[4], date: row[5], price: row[6], duration: row[7], airlines: row[8], class: row[9], free_seats: row[10]}]->(a)

MATCH (n) RETURN n LIMIT 25;
