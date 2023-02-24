USE hr;


-- @block
SELECT e.first_name,
  e.last_name,
  j.job_title
FROM employees AS e
  INNER JOIN jobs AS j ON e.job_id = j.job_id;


-- @block
SELECT e.first_name,
  e.last_name,
  d.department_name
FROM employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id;


-- @block
SELECT e.first_name,
  e.last_name,
  d.department_name
FROM employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id
  AND d.department_name IN ("IT", "Accounting", "Administration");


-- @block
SELECT e1.first_name,
  e1.last_name,
  e2.first_name AS manager_first_name,
  e2.last_name AS manager_last_name
FROM employees AS e1
  INNER JOIN employees AS e2 ON e1.employee_id = e2.manager_id;


-- @block
SELECT e1.first_name,
  e1.last_name,
  e1.salary,
  e2.first_name AS manager_first_name,
  e2.last_name AS manager_last_name,
  e2.salary AS manager_salary
FROM employees AS e2
  INNER JOIN employees AS e1 ON e2.employee_id = e1.manager_id
WHERE e1.salary > e2.salary;


-- @block
SELECT e.first_name,
  e.last_name,
  l.city
FROM employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id
  INNER JOIN locations AS l ON d.location_id = l.location_id;


-- @block
-- print out depart. names in which managers earn more than 10000
SELECT d.department_name,
  e.first_name,
  e.last_name,
  e.salary
FROM departments AS d
  INNER JOIN employees AS e ON d.manager_id = e.employee_id
  AND e.salary > 10000;


-- @block
SELECT d.department_name,
  e.salary
FROM employees AS e
  INNER JOIN departments AS d ON e.employee_id = d.manager_id
WHERE e.salary > 10000;