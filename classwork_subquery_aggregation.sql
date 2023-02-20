USE hr;


-- @block
-- limit
SELECT first_name,
  last_name,
  salary
FROM employees
ORDER BY salary DESC
LIMIT 5;


-- @block
-- group by several fields
SELECT job_id,
  department_id,
  sum(salary)
FROM employees
GROUP BY job_id,
  department_id;


-- @block
-- having
SELECT ROUND(salary / 5000) * 5000 AS salary_group,
  sum(salary)
FROM employees
GROUP BY salary_group
HAVING salary_group > 5000;


-- @block
-- Find the first and last name of the employee with the highest salary
SELECT first_name,
  last_name
FROM employees
WHERE salary = (
    SELECT max(salary)
    FROM employees
  );


-- @block
-- Find employees whose salary is less than the average salary for the company
SELECT first_name,
  last_name
FROM employees
WHERE salary < (
    SELECT avg(salary)
    FROM employees
  );


-- @block
-- Find the average salary in the department with id 90
SELECT avg(salary)
FROM employees
WHERE department_id = 90;


-- @block
-- Find the number of employees from the department with id 60 who earn more than the average salary for the company
SELECT COUNT(*)
FROM employees
WHERE department_id = 60
  AND salary > (
    SELECT avg(salary)
    FROM employees
  );


-- @block
-- additional column
SELECT employee_id,
  123,
  (
    SELECT avg(salary)
    FROM employees
  ) AS average
FROM employees;


-- @block
-- from subquery
SELECT *
FROM (
    SELECT DISTINCT manager_id
    FROM employees
  ) AS managers
WHERE manager_id IS NOT NULL;


-- @block
-- count usage
SELECT COUNT(*),
  COUNT(manager_id),
  COUNT(DISTINCT manager_id)
FROM employees;


-- @block
-- union
SELECT first_name,
  last_name,
  salary
FROM employees
WHERE salary > 15000
UNION ALL
SELECT first_name,
  last_name,
  NULL AS salary
FROM employees
WHERE salary < 2500;