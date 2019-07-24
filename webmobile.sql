drop database if exists webmobile;
create database webmobile;
use webmobile;

drop table if exists posts;
create table posts (
	num int not null auto_increment primary key,
	title varchar(100) not null,
  body varchar(16000) not null,
  created_at timestamp not null
);

insert into posts (num, title, body, created_at) values(0, "test", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test2", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test3", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test4", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test5", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test6", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test7", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test8", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test9", "testset", timestamp(now()));
insert into posts (num, title, body, created_at) values(0, "test10", "testset", timestamp(now()));
