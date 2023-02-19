USE hr;


-- @block
-- Find the sum of salaries of those employees who earn more than 10,000
SELECT COUNT(1)
FROM employees
WHERE salary > 10000;



-- @block
-- Find the average salary of those employees who earn less than 10,000
SELECT AVG(salary)
FROM employees
WHERE salary < 10000;


-- @block
-- Find departments that have employees earning more than 10,000.
-- As a result of the selection, two fields are formed (department_id and a field with values of 1 or 0)
SELECT department_id, 
       CASE WHEN MAX(salary) > 10000 THEN 1 ELSE 0 END AS upper_salaries
FROM employees
GROUP BY department_id
HAVING MAX(salary) > 10000;


-- @block
-- Find departments in which all employees earn more than 10,000.
-- As a result of the selection, two fields are formed (department_id and a field with values of 1 or 0)



-- @block
-- Sort employees by last name IN alphabetical order
SELECT * FROM employees
ORDER BY last_name ASC;


-- @block
-- Sort employees by salary - from highest salary to lowest
SELECT * FROM employees
ORDER BY salary DESC;


-- @block
-- Query employees working IN departments WITH id 60, 90 AND 110 sorted alphabetically by last name
SELECT * FROM employees
WHERE department_id IN (60, 90, 110)
ORDER BY last_name ASC;


-- @block
-- Query employees WITH job_id ST_CLERK sorted by salary - highest salary TO lowest salary
SELECT * FROM employees
WHERE job_id = 'ST_CLERK'
ORDER BY salary DESC;


-- @block
-- Query employees whose NAMES BEGIN WITH the letter D AND sort them alphabetically by last name
