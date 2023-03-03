USE uni;


-- @block
SELECT *
FROM Students;


-- @block
SELECT *
FROM Courses;

-- @block
SELECT * 
FROM StudentsToCourses;

-- @block
DELETE FROM Students
WHERE id = 1;

-- @block
DELETE FROM Courses
WHERE id = 2;

-- @block
UPDATE Students SET id = 33 WHERE id = 5;