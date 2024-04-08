{{ config(
    tags=['mart']
)}}

WITH stg_modules AS (
    SELECT
        *
    FROM {{ref("stg_modules")}}
),

module_trainer_count AS (
    SELECT
        module_id,
        module_name,
        COUNT(DISTINCT trainer) AS trainer_count
    FROM
        stg_modules
    GROUP BY
        module_id,
        module_name
),

final_output AS (
    SELECT
        module_id,
        module_name,
        trainer_count
    FROM
        module_trainer_count
    ORDER BY
        trainer_count DESC
)

SELECT
    *
FROM
    final_output
