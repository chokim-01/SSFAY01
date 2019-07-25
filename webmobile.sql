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

drop table if exists users;
create table users (
	uemail varchar(30) not null,
    upasswd varchar(64) not null,
    uauth int default 0 not null
);

drop table if exists portfoilos;
create table portfolios (
	num int not null auto_increment primary key,
    title varchar(100) not null,
    body varchar(16000) not null,
    img varchar(1000) not null,
	created_at timestamp not null
);


# posts data
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

# users data
insert into users (umail, upasswd, uauth) values("test@test.com", "test", 0);
insert into users (umail, upasswd, uauth) values("dev@dev.com", "dev", 1);
insert into users (umail, upasswd, uauth) values("admin@admin.com", "admin", 2);

# portfolios data
# posts data
insert into portfolios (num, title, body, img, created_at) values(0, "test1", "testset1", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test2", "testset2", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test3", "testset3", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test4", "testset4", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test5", "testset5", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test6", "testset6", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test7", "testset7", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test8", "testset8", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test9", "testset9", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, title, body, img, created_at) values(0, "test10", "testset10", "https://source.unsplash.com/random", timestamp(now()));
