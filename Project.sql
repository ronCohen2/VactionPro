
create database DataB;
use DataB;

-- user table

create table users(
id int auto_increment,
	first_name varchar(100),
	last_name varchar(100),
    user_name varchar(100) unique ,
    password varchar(250),
    admin  varchar(10),
    unique_id varchar(250),
primary key(id)
);

insert into users(first_name,last_name,user_name,password,admin,unique_id)
value(null,null,'Admin',"123123" ,"true",'75442486-0878-440c-9db1-a7006c25a39f');
	// admin 123123
    
select * from users ;
-- auth table 


-- vacation table 

create table vacation(
id int auto_increment,	
	title  varchar(100),
	location varchar(100),
    description varchar(500),
    img varchar(250),
    depart_data varchar (100),
    return_data varchar (100),
    unique_id varchar(250),
primary key(id)
);

insert into vacation 
(title,location,description,img,depart_data,return_data,unique_id)
values
('nice  vacaton','tel aviv ','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','http://longforsuccess.com/wp-content/uploads/2013/07/london-300x200.jpg','20/2/2019','24/3/2019','d48d32fa-60d6-4ac8-b82a-6423621e97f0'),
('vacaton','Eilat ','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','https://static.timesofisrael.com/www/uploads/2015/03/F140804MS22-1-e1425284894621.jpg','20/2/2019','24/3/2019','a78b5cc5-7a00-4f52-88db-370a09f4885c');

select * from vacation;

create table followVacation(
id int auto_increment,	
	vacation_id varchar(100),
	user_id varchar(100),
primary key(id)
);


select 
vacation.title,
vacation.location ,
vacation.description,
    vacation.img ,
    vacation.depart_data ,
    vacation.return_data ,
followVacation.vacation_id as unique_id,
        followVacation.user_id as user_id        
FROM vacation
INNER JOIN followVacation
ON vacation.unique_id = followVacation.vacation_id ;
-- WHERE unique_id = "1" ;

insert into followVacation
(c)
value
('1','wewe');

select * from followVacation;

select vacation_id from followVacation where user_id ;

