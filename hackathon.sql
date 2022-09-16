alter user 'root'@'localhost' identified with mysql_native_password by 'Kam@13032003';

create database if not exists hackathon;
 
use hackathon;
create table if not exists employee(empname varchar(100), email varchar(100) primary key, emppassword varchar(500));

select* from hackathon.employee;

delete from hackathon.employee where empname="kamal";