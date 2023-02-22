USE hr;


CREATE DATABASE shop;


-- @block
-- commit example
DELETE FROM employees;


-- @block 
SELECT *
FROM employees;


-- @block
CREATE TABLE test (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(64),
  PRIMARY KEY (id)
);


-- @block
SELECT *
FROM test;


-- @block
INSERT INTO test (name)
VALUES ('mark'),
  ('alex'),
  ('antonio'),
  ('toma');


-- @block
DELETE FROM test
WHERE id IN (2, 3, 4);


-- @block
UPDATE test
SET name = 'misha'
WHERE id = 5;


-- @block
ALTER TABLE test AUTO_INCREMENT = 100;


-- @block
SELECT *
FROM test;


-- @block
ALTER TABLE test
ADD email varchar(255);


-- @block
UPDATE test
SET email = 'test@example.com';


-- @block
UPDATE test
SET email = 'alex@exam.com'
WHERE name = 'alex';


-- @block
ALTER TABLE test DROP COLUMN email;


-- @block
ALTER TABLE test
  RENAME COLUMN name TO first_name;


-- @block
USE hr;


UPDATE test
SET first_name = NULL
WHERE char_length(first_name) > 4;


ALTER TABLE test
MODIFY COLUMN first_name VARCHAR(4);


SELECT *
FROM test;