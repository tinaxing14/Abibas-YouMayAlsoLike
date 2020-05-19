Setup
-----
1. run ```npm install```
2. update config files with mysql user/pass
  - ```echo '[YOUR DB USER]' > /seed/mysql.user```
  - ```echo '[YOUR DB PASS]' > /seed/mysql.pass```
  - update server/db/mysql_config.js

Seed Data
---------
1. run ```npm run seed```

Start server
------------
1. run ```npm start```

Start with docker
-----------------
1. run ```npm run build:docker```
