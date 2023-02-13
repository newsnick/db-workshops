-- @block
-- 1. Find all employees who work in department with id `90`
SELECT first_name,
  last_name,
  department_id
FROM employees
WHERE department_id IN (90);


-- @block
-- 2. Find all employees who earn more than `5000`
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE salary > 5000;


-- @block
-- 3. Find all employees whose surnames starts with `L`
SELECT first_name,
  last_name
FROM employees
WHERE last_name LIKE 'L%';


-- @block
-- 4. Find all departments that location_id equals `1700`
SELECT location_id, department_id
FROM departments
WHERE location_id = (1700);


-- @block
-- 5. Find all towns with country_id equals `US`
SELECT country_id, state_province, city
FROM locations
WHERE country_id = ("US");


-- @block
-- 6. Print salary of employee
-- name: `Lex`
-- surname: `De Haan`
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE first_name = "Lex" AND last_name = "De Haan"


-- @block
-- 7. Find all employees whose job_id equals `FI_ACCOUNT` and they earn less than `8000`
SELECT first_name,
  last_name,
  salary, job_id
FROM employees
WHERE job_id = "FI_ACCOUNT" AND salary < 8000


-- @block
-- 8. Find all employees whose surnames in the middle of the word contain combinations of `kk` or `ll`
SELECT first_name,
  last_name
FROM employees
WHERE last_name LIKE '_%ll%_' OR last_name LIKE '_%kk%_';


-- @block
-- 9. Find employees with commission_pct NULL
SELECT first_name,
  last_name,
  commission_pct,
  job_id
FROM employees
WHERE commission_pct IS NULL;


-- @block
-- 10. Find all employees except those who work in departments `80` and `110`
SELECT first_name,
  last_name,
  department_id
FROM employees
WHERE department_id NOT IN (80, 110);


-- @block
-- 11. Find all employees who earns from 5000 to 7000 (including ends)
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE salary BETWEEN 5000 AND 7000;