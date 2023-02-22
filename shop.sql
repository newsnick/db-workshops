/*
 1. Create table goods (id, title, quantity)
 2. Add several rows
 3. Add field `price` (integer) with default value 0
 4. Check table content
 5. Change the type of `price` to numeric(8, 2)
 -- clear the field before changing the type
 6. Add prices to goods table
 7. Rename the field to item_price
 8. Write a query to calculate sum of total possible profit from all goods
 */
-- @block
CREATE DATABASE IF NOT EXISTS shop;


-- @block
USE shop;


-- @block
DROP TABLE IF EXISTS goods;


CREATE TABLE goods (
  id integer AUTO_INCREMENT,
  title varchar(255),
  quantity integer,
  PRIMARY KEY (id)
);


-- @block
INSERT INTO goods (title, quantity)
VALUES ('apple', 152),
  ('banana', 789),
  ('kiwi', 55),
  ('table', 17);


-- @block
ALTER TABLE goods
ADD COLUMN price integer DEFAULT 0;


-- @block
SELECT *
FROM goods;


-- @block
UPDATE goods
SET price = NULL;


-- @block
ALTER TABLE goods
MODIFY COLUMN price numeric(8, 2);


-- @block
UPDATE goods
SET price = 100.22
WHERE id = 1;


UPDATE goods
SET price = 120.44
WHERE id = 2;


UPDATE goods
SET price = 55
WHERE id = 3;


UPDATE goods
SET price = 899
WHERE id = 4;


-- @block
UPDATE goods
SET price = (
    CASE
      WHEN id = 1 THEN 100.58
      WHEN id = 2 THEN 120
      WHEN id = 3 THEN 55.47
      WHEN id = 4 THEN 899.99
    END
  );


-- @block
ALTER TABLE goods
  RENAME COLUMN price TO item_price;


-- @block
SELECT SUM(item_price * quantity)
FROM goods;