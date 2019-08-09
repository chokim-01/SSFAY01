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

drop table if exists devicetokens;
create table devicetokens (
	num int not null auto_increment primary key,
    umail varchar(30) not null,
	devicetoken varchar(155) not null unique,
    uauth int not null
);


# posts data
insert into posts (num, author, title, body, created_at) values(0, "dev1@dev.com", "test", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev2@dev.com", "test2", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev3@dev.com", "test3", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev4@dev.com", "test4", "testset", timestamp(now()));
insert into posts (num, author, title, body, created_at) values(0, "dev5@dev.com", "test5", "testset", timestamp(now()));


# users data
insert into users (umail, upasswd, uauth) values("test1@dev.com", "31a3922b4880237055673d29fc37bbac8c99db8d87f3724e03cfba049795b4d9", 0);
insert into users (umail, upasswd, uauth) values("test2@dev.com", "ed6c4f51dfea376f0fc5c0aab466d21cddedee25c789b244d8256060c683928c", 0);
insert into users (umail, upasswd, uauth) values("test3@dev.com", "c0946621befe212e1fd9e56725e680cf800ce4938ea78eec171ac2f843edcae6", 0);
insert into users (umail, upasswd, uauth) values("test4@dev.com", "9421d71799570847aa690677c5fc4b75882785c7bd7e11dcfb1e79d62f583709", 0);
insert into users (umail, upasswd, uauth) values("test5@dev.com", "dd0bc5fb0ec0dc5f2ea34b62481d09789f719cae3698f10d8be54caeaee508de", 0);

insert into users (umail, upasswd, uauth) values("dev1@dev.com", "84f664f746d4272035bfb4a067cb2f3864b940e8ccf7c0d3c9f10f28afd95bcb", 1);
insert into users (umail, upasswd, uauth) values("dev2@dev.com", "f500fe0970e146fb19757d72901b465b33be5c6a2b2b355c8b79196939e3ce28", 1);
insert into users (umail, upasswd, uauth) values("dev3@dev.com", "0f40aadfdb5bc1e01cd9b80cb4e462b242052096e03e0022cf6b7c4ea93e68bb", 1);
insert into users (umail, upasswd, uauth) values("dev4@dev.com", "31d9c7af92edd5281937e716b4c1fb1139bc03a5e423ae87fdd858bf0a3724c4", 1);
insert into users (umail, upasswd, uauth) values("dev5@dev.com", "be2622d4c0d974259eaed5217e0f686db2af6b220145dd5bbb1627957a3046b0", 1);

insert into users (umail, upasswd, uauth) values("admin@admin.com", "51b66b5e8e00a1519ad36dad7b3d4fb1d86e4fc04dc6c945eb2ec508de0f36e3", 2);

# portfolios data
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev1@dev.com", "test1", "testset1", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev2@dev.com", "test2", "testset2", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev2@dev.com", "test2", "testset2", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev2@dev.com", "test2", "testset2", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev3@dev.com", "test3", "testset3", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev4@dev.com", "test4", "testset4", "https://source.unsplash.com/random", timestamp(now()));
insert into portfolios (num, author, title, body, img, created_at) values(0, "dev5@dev.com", "test5", "testset5", "https://source.unsplash.com/random", timestamp(now()));
select * from users;

create event if not exists delete_devicetokens
ON SCHEDULE EVERY 1 DAY STARTS current_timestamp()
do delete from databasename.devicetokens where date(ts) <= date(subdate(now(),interval 1 DAY));
