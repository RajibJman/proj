{{
    config(
        tags=['staging']
    )
}}
 

WITH

datatype_conversion AS (
 
    SELECT

        *
    
    FROM {{source('Final_Project','events')}}
 
),

casted_datatypes AS (
    SELECT
        CAST(_ID AS VARCHAR) AS marks_id,
        TO_DATE(DATE, 'MM/DD/YYYY') AS date_value,
        TO_TIME(TIME) AS time_value,
        CAST(DETAILS AS VARCHAR) AS details
    FROM
        datatype_conversion 
)

SELECT * FROM casted_datatypes