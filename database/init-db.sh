#!/bin/bash
mongod --fork --logpath /var/log/mongodb.log --bind_ip_all

sleep 5

mongo moto-academy --eval 'db.createCollection("motorola-phones")'
mongoimport --db moto-academy --collection motorola-phones --file /docker-entrypoint-initdb.d/motorola_phones_data.json --jsonArray

mongod --bind_ip_all
