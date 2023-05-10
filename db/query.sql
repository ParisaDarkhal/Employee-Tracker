-- these queries are not functional. I just put them here to be able to test them easily


select e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department, concat(m.first_name, ' ', m.last_name) as manager from employee as e 
join role as r on e.role_id=r.id
join department as d on  r.department_id=d.id
left join employee as m on e.manager_id=m.id;

select r.id, r.title, r.salary, d.name as department from role as r
join department as d where r.department_id=d.id;

select department.id, department.name from department;