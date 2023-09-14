### School management server with professional way.

# endPoint and direction

## create user : /api/v1/users/create-user

expected body : {"user":{"role":"student"}}

## create semester : /api/v1/academic-semesters/create-semester

expected body:{
"title":"Autumn",
"year":2024,
"code":"01",
"startMonth":"April",
"endMonth":"May"
}

## get semester : /api/v1/academic-semesters?page=1&limit=3&sortBy=code&sortOrder=desc

you can filter, short and implement pagination.
