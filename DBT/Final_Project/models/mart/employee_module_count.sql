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

-- model: users_by_module_count
-- description: Calculates count of users by number of modules they are enrolled in
users_by_module_count AS (
    SELECT
        name,
        COUNT(modules) AS num_modules
    FROM
        stg_registers
    GROUP BY
        name
)

-- model: count_users_by_module_count
-- description: Counts users by the number of modules they are enrolled in
SELECT
    num_modules,
    COUNT(*) AS count_users
FROM
    users_by_module_count
GROUP BY
    num_modules
ORDER BY
    num_modules
