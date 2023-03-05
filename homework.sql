USE hr;


-- @block
-- Find employees names that has max salary in their department
SELECT first_name,
  last_name
FROM employees;


-- @block
SELECT department_id,
  MAX(salary) AS salary
FROM employees
GROUP BY department_id
ORDER BY salary DESC;


-- @block
SELECT first_name,
  last_name,
  department_id
FROM employees
WHERE salary IN (
    SELECT MAX(salary)
    FROM employees
    GROUP BY department_id
  );


-- @block
SELECT first_name,
  last_name, e.department_id, e.salary
FROM employees as e
  INNER JOIN (
    SELECT department_id,
      MAX(salary) AS salary
    FROM employees
    GROUP BY department_id
  ) as s ON e.department_id = s.department_id AND e.salary = s.salary;

-- @block
  SELECT first_name, last_name, e.department_id, e.salary
FROM employees as e
INNER JOIN (
  SELECT department_id, 
    MAX(salary) AS salary
  FROM employees
  GROUP BY department_id
) as s ON e.department_id = s.department_id AND e.salary = s.salary
WHERE e.department_id = 50;