\c abibas;

DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_likes;

CREATE TABLE shoes (
  id serial primary key,
  shoe_id varchar(10),
  title varchar(60),
  images varchar(250),
  price smallint,
  href varchar(250),
  related_products varchar(10) ARRAY[12]
);

CREATE TABLE users (
  id serial primary key,
  users_name varchar(40)
);

CREATE TABLE user_likes (
  id serial primary key,
  users_id int references users(id) on delete cascade,
  shoes_id int references shoes(id) on delete cascade
);


\copy users(users_name) from '/Users/TinaXING/Downloads/data/users.csv' delimiter ',' csv;
\copy shoes(shoe_id, title, images, price, href, related_products) from '/Users/TinaXING/Downloads/data/shoes.csv' delimiter ',' csv header;
\copy user_likes(users_id, shoes_id) from '/Users/TinaXING/Downloads/data/userlikes.csv' delimiter ',' csv header;