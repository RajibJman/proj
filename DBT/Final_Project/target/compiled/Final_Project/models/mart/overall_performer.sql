

-- model: stg_registers
-- description: Reference the stg_registers table from the specified source
WITH stg_registers AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_registers
),

-- model: stg_marks
-- description: Reference the stg_marks table from the specified source
stg_marks AS (
    SELECT
        *
    FROM FinalProject.Public_staging.stg_marks
),

-- model: user_total_marks
-- description: Calculates total marks and number of modules for top 5 users with highest total marks
user_total_marks AS (
    SELECT
        r.name AS user_name,
        SUM(ma.marks_value) AS total_marks,
        COUNT(ma.moduleid) AS num_modules
    FROM
        stg_registers r
    JOIN
        stg_marks ma ON r.user_id = ma.userid
    WHERE
        ma.marks_value > 0  -- Consider all marks (remove if specific filter is needed)
    GROUP BY
        r.name
    ORDER BY
        total_marks DESC
    LIMIT 5  -- Limit to top 5 users with highest total marks
)

-- model: top_users_average_marks
-- description: Calculates average marks per module for top users with highest total marks
SELECT
    user_name,
    ROUND(total_marks / num_modules, 2) AS average_marks
FROM
    user_total_marks
ORDER BY
    average_marks DESC