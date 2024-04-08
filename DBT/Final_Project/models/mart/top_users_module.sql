{{ config(
    tags=['mart']
)}}

with ranked_users as (
  select
   distinct r.name as user_name,
    m.module_name,
    ma.marks_value,
    dense_rank() over (partition by m.module_id order by ma.marks_value desc) as user_rank
  from
    {{ ref('stg_registers') }} r
  join
    {{ ref('stg_modules') }} m
    on r.modules = m.module_id
  join
    {{ ref('stg_marks') }} ma
    on r.user_id = ma.userid
    and m.module_id = ma.moduleid
)

select
  user_name,
  module_name,
  marks_value
from
  ranked_users
where
  user_rank <= 5
