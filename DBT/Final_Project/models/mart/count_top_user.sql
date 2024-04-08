{{ config(
    tags=['mart']
)}}


-- model: stg_registers
-- description: Reference the stg_registers table from the specified source
WITH stg_registers AS (
    SELECT
        *
    FROM {{ ref('stg_registers') }}
),

-- model: stg_modules
-- description: Reference the stg_modules table from the specified source
stg_modules AS (
    SELECT
        *
    FROM {{ ref('stg_modules') }}
),

-- model: stg_marks
-- description: Reference the stg_marks table from the specified source
stg_marks AS (
    SELECT
        *
    FROM {{ ref('stg_marks') }}
),

-- model: module_user_marks
-- description: Calculates the count of distinct users per module with marks > 80
module_user_marks AS (
    SELECT
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

-- model: module_users_count
-- description: Calculates the count of distinct users per module with marks > 80
SELECT
    module_name,
    COUNT(DISTINCT user_name) AS users_count
FROM
    module_user_marks
GROUP BY
    module_name

ORDER BY users_count DESC