USE hr;


-- @block
-- *
SELECT first_name,
  last_name
FROM employees
WHERE first_name = 'John';


-- @block
-- 1. Find all employees with `job_id` equals `IT_PROG`
SELECT first_name,
  last_name,
  job_id
FROM employees
WHERE job_id = 'IT_PROG';


-- @block
-- 2. Find all employees with salary more than `10000`
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE salary > 10000;


-- @block
-- 3. Find all employees with salary between 10 000 and 20 000 (including ends)
-- Another approach
-- WHERE salary >= 10000 AND salary <= 20000;
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE salary BETWEEN 10000 AND 20000;


-- @block
-- 4. Find all employees that are not from `60`, `30` and `100` departments
SELECT first_name,
  last_name,
  department_id
FROM employees
WHERE department_id NOT IN (60, 30, 100);


-- @block
-- 5. Find all employees whose names doesn't contain `ll` in the middle
SELECT first_name,
  last_name
FROM employees
WHERE first_name NOT LIKE '_%ll%_';


-- @block
-- 6. Find all employees with names ended with `a`
SELECT first_name,
  last_name
FROM employees
WHERE first_name LIKE '%a';


-- @block
SELECT first_name,
  last_name,
  commission_pct,
  job_id
FROM employees
WHERE commission_pct IS NOT NULL;

-- @block
SELECT first_name AS firstName
FROM hr.employees as e
WHERE e.first_name = 'John';