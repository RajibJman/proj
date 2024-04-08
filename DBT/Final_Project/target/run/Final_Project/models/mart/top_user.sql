
  
    

        create or replace transient table FinalProject.Public_mart.top_user
         as
        (


WITH stg_registers AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_registers
),

stg_marks AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_marks
),

stg_modules AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_modules
),

module_user_marks AS (
    SELECT DISTINCT
        r.name AS user_name,
        m.module_name,
        ma.marks_value AS marks
    FROM
        stg_registers r
    JOIN
        stg_modules m ON r.modules = m.module_id
    JOIN
        stg_marks ma ON r.user_id = ma.userid AND m.module_id = ma.moduleid
    WHERE
        ma.marks_value > 80
)

SELECT
    user_name,
    module_name,
    marks
FROM
    module_user_marks
ORDER BY marks DESC
        );
      
  