{{
    config(
        tags=['staging']
    )
}}
 

WITH

datatype_conversion AS (
 
    SELECT

        *
    
    FROM {{source('Final_Project','modules')}}
 
),


casted_datatypes AS (
    SELECT
        CAST(_ID AS VARCHAR) AS module_id,
        CAST(MODULENAME AS VARCHAR) AS module_name,
        TO_DATE(STARTDATE, 'MM/DD/YYYY') AS start_date,
        TO_DATE(ENDDATE, 'MM/DD/YYYY') AS end_date,
        CAST(MODULESTATUS AS VARCHAR) AS module_status,
        CAST(QUIZID AS VARCHAR) AS quiz_id,
        CAST(TRAINER AS VARCHAR) AS trainer
    FROM
        datatype_conversion
)



SELECT * from casted_datatypes
