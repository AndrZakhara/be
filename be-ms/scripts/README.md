### DB

docker exec -it user_db mongosh -u root -p example --authenticationDatabase admin

docker exec -it product_db mongosh -u root -p example --authenticationDatabase admin

show dbs;
use user_db;
show collections;
db.users.find();
