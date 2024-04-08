{{
    config(
        tags=['staging']
    )
}}
 

WITH

datatype_conversion AS (
 
    SELECT

        *
    
    FROM {{source('Final_Project','registers')}}
 
),


casted_datatypes AS (
    SELECT
        CAST(_ID AS VARCHAR) AS user_id,
        CAST(NAME AS VARCHAR) AS name,
        CAST(EMAIL AS VARCHAR) AS email,
        CAST(PASSWORD AS VARCHAR) AS password,
        CAST(ROLE AS VARCHAR) AS role,
        CASE CHECKRESET WHEN 'true' THEN TRUE ELSE FALSE END AS check_reset,
        CAST(MODULES AS VARCHAR) AS modules
    FROM
        datatype_conversion
)


SELECT * from casted_datatypes