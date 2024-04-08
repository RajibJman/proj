
  
    

        create or replace transient table FinalProject.Public_mart.module_status
         as
        (


-- model: stg_modules
-- description: Reference the stg_modules table from the specified source
WITH stg_modules AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_modules
)

-- model: count_module_status
-- description: Counts modules by their status
SELECT
    module_status,
    COUNT(distinct module_id) AS status_count
FROM
    stg_modules
GROUP BY
    module_status
        );
      
  