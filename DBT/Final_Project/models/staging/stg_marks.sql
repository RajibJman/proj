
{{
    config(
        tags=['staging']
    )
}}
 

WITH

datatype_conversion AS (
 
    SELECT

        *
    
    FROM {{source('Final_Project','marks')}}
 
),

casted_datatypes AS (
    
    SELECT
        CAST(_ID AS VARCHAR) AS marks_id,
        CAST(MODULEID AS VARCHAR) AS moduleid,
        CAST(USERID AS VARCHAR) AS userid,
        CAST(MARKS AS INT) AS marks_value  
    
    FROM datatype_conversion

)
 
SELECT * FROM casted_datatypes
