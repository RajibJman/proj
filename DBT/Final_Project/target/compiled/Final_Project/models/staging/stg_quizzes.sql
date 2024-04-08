
 

WITH

datatype_conversion AS (
 
    SELECT

        *
    
    FROM FinalProject.public.quizzes
 
),

casted_datatypes AS (
    SELECT
        CAST(_ID AS VARCHAR) AS topic_id,
        CAST(TOPIC AS VARCHAR) AS topic_name,
        QUESTIONS AS questions
    FROM
        datatype_conversion
)


SELECT * from casted_datatypes