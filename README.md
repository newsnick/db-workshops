# Lesson 3

### Limit
```SQL
SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;
```

### Group by
- by several fields

### Having
Filter after `group by`

![sql query schema](https://jvns.ca/images/sql-queries.jpeg)

### Subqueries
- inside where (eq, in)
- ANY and ALL
- as an additional column

Task:
> Find the names of employees with the highest salary HR.EMPLOYEES

### Count
(again)
- count every non-null if pass column
- count(distinct column)
- count(*) == count(1)

### Union
Unite several queries into one list. Uses structured merging for columns (doesn't check names)

`union` - make result distinct

`union all` just concatenates results


## DML vs DDL

### Create table
```SQL
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

### Types
[Ref table](https://www.w3schools.com/mysql/mysql_datatypes.asp)

- VARCHAR(size)
- INTEGER

### Constraints (primary key, auto increment, default)
[Primary key ref](https://www.w3schools.com/mysql/mysql_primarykey.asp)

[Auto increment ref](https://www.w3schools.com/mysql/mysql_autoincrement.asp)

[Default ref](https://www.w3schools.com/mysql/mysql_default.asp)

### Insert into
```SQL
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```
### Update <table> set
```SQL
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
### Delete
```SQL
DELETE FROM table_name WHERE condition;
```
### Commit
```SQL
COMMIT;
```


### Truncate and Drop
```SQL
TRUNCATE TABLE table_name;
DROP TABLE [IF EXISTS] table_name;
```

### Alter table
[Ref](https://www.w3schools.com/mysql/mysql_alter.asp)

```SQL
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```