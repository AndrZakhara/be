docker exec -it mongo_monolith_com mongosh -u root -p example --authenticationDatabase admin

show dbs

use shop_monolith

db.users.find().pretty()

db.orders.find({ user: ObjectId('68a7693e2458fe0e31fed0f8') }).pretty()
