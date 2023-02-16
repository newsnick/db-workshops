USE hr;


-- @block
SELECT first_name,
  CONCAT_WS(' ', first_name, last_name) AS value
FROM employees;


-- @block
SELECT first_name,
  INSERT('qwerty', 4, 0, '$$$') AS value
FROM employees;


-- @block
SELECT first_name,
  LENGTH(first_name) AS value
FROM employees;


-- @block
SELECT TRIM('    qwe   ') AS value;


-- @block
SELECT LOCATE('q', '    qwe   ') AS value;


-- @block
SELECT REPLACE('SQL Tutorial', 'SQL', 'JS');


-- Aggregation
-- @block
SELECT COUNT(1)
FROM employees
WHERE salary > 5000;


-- @block
SELECT SUM(salary * 0.25)
FROM employees;


-- @block
SELECT AVG(salary)
FROM employees
WHERE salary > 5000;


-- @block
SELECT MAX(salary),
  MIN(salary)
FROM employees;