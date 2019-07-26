drop database if exists webmobile;
create database webmobile;
use webmobile;

drop table if exists posts;
create table posts (
	num int not null auto_increment primary key,
    author varchar(30) not null,
	title varchar(100) not null,
    body varchar(16000) not null,
    created_at timestamp not null
);

drop table if exists users;
create table users (
	umail varchar(30) not null primary key,
    upasswd varchar(64) not null,
    uauth int default 0 not null
);

drop table if exists portfolios;
create table portfolios (
	num int not null auto_increment primary key,
    author varchar(30) not null,
    title varchar(100) not null,
    body varchar(10000) not null,
    img varchar(300) not null,
	created_at timestamp not null
);


# posts data
insert into posts (num, author, title, body, created_at) values(0, "dev1@dev.com", "test", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev2@dev.com", "test2", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev3@dev.com", "test3", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev4@dev.com", "test4", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev5@dev.com", "test5", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev6@dev.com", "test6", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev7@dev.com", "test7", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev8@dev.com", "test8", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev9@dev.com", "test9", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev10@dev.com", "test10", "testset", timestamp(now()));

# users data
insert into users (umail, upasswd, uauth) values("test@test.com", "test", 0);
insert into users (umail, upasswd, uauth) values("dev1@dev.com", "dev1", 1);
insert into users (umail, upasswd, uauth) values("dev2@dev.com", "dev2", 1);
insert into users (umail, upasswd, uauth) values("dev3@dev.com", "dev3", 1);
insert into users (umail, upasswd, uauth) values("dev4@dev.com", "dev4", 1);
insert into users (umail, upasswd, uauth) values("dev5@dev.com", "dev5", 1);
insert into users (umail, upasswd, uauth) values("dev6@dev.com", "dev6", 1);
insert into users (umail, upasswd, uauth) values("dev7@dev.com", "dev7", 1);
insert into users (umail, upasswd, uauth) values("dev8@dev.com", "dev8", 1);
insert into users (umail, upasswd, uauth) values("dev9@dev.com", "dev9", 1);
insert into users (umail, upasswd, uauth) values("dev10@dev.com", "dev10", 1);
insert into users (umail, upasswd, uauth) values("admin@admin.com", "admin", 2);

# portfolios data
# posts data
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev1@dev.com", "test1", "testset1", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev2@dev.com", "test2", "testset2", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev3@dev.com", "test3", "testset3", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev4@dev.com", "test4", "testset4", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev5@dev.com", "test5", "testset5", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev6@dev.com", "test6", "testset6", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev7@dev.com", "test7", "testset7", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev8@dev.com", "test8", "testset8", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev9@dev.com", "test9", "testset9", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev10@dev.com", "test10", "testset10", "https://source.unsplash.com/random", timestamp(now()));
