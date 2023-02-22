/*
 1. Create `students` table with columns
 - name (required)
 - lastname (required)
 - avg_mark (0 to 5) ex. 3.5
 - sex (use varchar(64) here) (check to be `M` or `F`)
 2. Add five students
 3. Add field `id` as primary key and auto increment modifier
 4. Change `sex` type to char(1)
 5. Change label of a `name` column to `first_name`
 6. Create queries to find students which:
 - mark is more than 4
 - mark is outside of 3..4 range
 - name starts with `A`
 - mark equal 2.2, 3.1 or 4.7
 7. Create view that shows only men
 8. Create view that shows only women
 9. Find all unique marks in table
 10. Our school changes grade system to 0..10 range. Safely migrate old data and change constraints according to the new system rules.
 11. Expel students whose grades are worse that 4.0
 */