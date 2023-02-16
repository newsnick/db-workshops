USE hr;


-- @block
-- Create a SALARY_GROUP field that equals
-- `1` IF employee 's salary is more than 10000
-- `0` if the employee' s salary IS less than 10000
SELECT CONCAT_WS(' ', first_name, last_name) AS Name,
  (
    CASE
      WHEN salary > 10000 THEN 1
      WHEN salary <= 10000 THEN 0
    END
  ) AS SALARY_GROUP
FROM employees
ORDER BY SALARY_GROUP;


/*
 SELECT COUNT(CustomerID),
 Country
 FROM Customers
 GROUP BY Country;
 */
-- @block
-- Calculate amount of records in groups created in previous query.
SELECT COUNT(1),
  (
    CASE
      WHEN salary > 10000 THEN 1
      WHEN salary <= 10000 THEN 0
    END
  ) AS SALARY_GROUP
FROM employees
GROUP BY SALARY_GROUP;


-- @block
SELECT SUM(salary),
  (
    CASE
      WHEN salary > 10000 THEN 1
      WHEN salary <= 10000 THEN 0
    END
  ) AS SALARY_GROUP
FROM employees
GROUP BY SALARY_GROUP;


-- @block
SELECT SUM(salary),
  (
    CASE
      WHEN salary > 10000 THEN 2
      /* It will not work, because of ex. order */
      -- WHEN salary > 11000 THEN -1
      WHEN salary <= 10000
      AND salary > 4000 THEN 1
      ELSE 0
    END
  ) AS SALARY_GROUP
FROM employees
GROUP BY SALARY_GROUP;


-- @block
-- Sort employees by their salary
SELECT first_name,
  salary
FROM employees
ORDER BY salary DESC;


-- @block
-- Find all available `job_id` in table
SELECT DISTINCT job_id
FROM employees;


-- @block
-- Find all `job_id` of jobs that don't have `COMMISSION_PCT` or stated salary is less then 3000
SELECT DISTINCT job_id
FROM employees
WHERE commission_pct IS NULL
  OR salary < 3000;