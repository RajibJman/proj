
  
    

        create or replace transient table FinalProject.Public_mart.Avg_module_marks
         as
        (


WITH module_avg_marks AS (
    SELECT
        m.module_id,
        m.module_name,
        AVG(ma.marks_value) AS avg_marks
    FROM
        FinalProject.Public_staging.stg_modules m
    JOIN
        FinalProject.Public_staging.stg_marks ma ON m.module_id = ma.moduleid
    GROUP BY
        m.module_id,
        m.module_name
)


SELECT
    module_id,
    module_name,
    avg_marks
FROM
    module_avg_marks
        );
      
  