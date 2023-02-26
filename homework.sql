/*
 1. Query name, last_name and city of employees who work from Seattle 
    and Toronto
 2. Query name, last_name, department name and job name of employees
 3. Query name, last_name and salary of employees who work from Oxford 
    and San Francisco
 4. Query a city with its country 
 */

1.
 -- @block
 SELECT e.first_name AS name,
  e.last_name,
  l.city
FROM employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id
  INNER JOIN locations AS l ON d.location_id = l.location_id
  WHERE City IN ('Seattle', 'Toronto')
  ORDER BY city;

2.
 -- @block
 SELECT e.first_name, 
 e.last_name, 
 d.department_name AS "department name", 
 j.job_title AS "job name"
 FROM employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id
  INNER JOIN jobs AS j ON e.job_id = j.job_id

3. 
-- @block
SELECT e.first_name AS name,
e.last_name,
e. salary 
FROM employees AS e
 INNER JOIN departments AS d ON e.department_id = d.department_id
 INNER JOIN locations AS l ON d.location_id = l.location_id
 WHERE City IN ('Oxford', 'San Francisco')
  
4.
-- @block
SELECT l.city,
c.country_name AS country
FROM locations AS l
 INNER JOIN countries AS c ON l.country_id = c.country_id
