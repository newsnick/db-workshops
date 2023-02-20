USE hr;


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